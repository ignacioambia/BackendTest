import { Order, OrderStatus } from './../types/Order';
import { Request, Response, NextFunction } from "express";
import { RouteModel } from "../models/route.model";
import { OrderModel } from "../models/order.model";
import { getRouteAggregation } from "./routes.controller";
import { Types, Document } from "mongoose";
import { TruckModel } from "../models/truck.model";

export function getOrderDetails(id?: string) {
  const orderQuery: any = {};
  if (id) orderQuery._id = new Types.ObjectId(id);
  console.log("Order query is: ", orderQuery);
  return OrderModel.aggregate([
    {
      $match: orderQuery,
    },
    {
      $lookup: {
        from: "routes",
        localField: "route",
        foreignField: "_id",
        as: "route",
        pipeline: getRouteAggregation({}),
      },
    },
    {
      $unwind: {
        path: "$route",
        preserveNullAndEmptyArrays: true
      },
    },
    {
      $lookup: {
        from: 'trucks',
        localField: 'truck',
        foreignField:"_id",
        as:"truck",
      }
    },
    {
      $unwind: {
        path: "$truck",
        preserveNullAndEmptyArrays: true
      },
    },
    {
      $project: {
        route: 1,
        description: 1,
        status: 1,
        type: 1,
        truck: 1
      },
    },
  ]);
}

export async function getAllOrders(req: Request, res: Response) {
  try {
    const allOrders = await getOrderDetails();
    return res.json(allOrders);
  } catch (e) {
    return res.status(500).json({ error: "Error fetching all orders.", e });
  }
}

/**
 * Returns route details of an order
 */
export async function getSingleOrder(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const [route] = await getOrderDetails(req.params.id);
    return res.json(route);
  } catch (e) {
    return res
      .status(500)
      .json({ error: `An error ocurred getting order "${req.params.id}".` });
  }
}

export async function createOrder(req: Request<{}, {}, Order>, res: Response) {
  try {
    const { route, description, type } = req.body;
    const order = new OrderModel({
      route,
      description,
      type,
      status: 0,
    });
    const saved = await order.save();
    res.json(saved);
  } catch (e) {
    res.json(e);
  }
}

export async function routeExists(
  req: Request<{}, {}, Order>,
  res: Response,
  next: NextFunction
) {
  try {
    const { route } = req.body;
    const routeExists = await RouteModel.findById(route);
    if (route && !routeExists) {
      return res.status(400).json({ error: `Route "${route}" not found.` });
    }
    next();
  } catch (e) {
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function assignTruck(
  req: Request<{ id: string }, {}, { id_truck: string }>,
  res: Response
) {
  const { id_truck } = req.body;
  const truck = await TruckModel.findById(id_truck);
  if (!truck)
    return res.status(400).json({ error: `Truck "${id_truck}" not found.` });
  const order = req.element as Document & Order;
  order.truck = new Types.ObjectId(id_truck);
  await order.save();
  res.json(req.element);
}

export async function editOrder(req: Request<{id: string}>, res: Response){
  try{
    const order: any = req.element as Document & Order; 
    const changedInputs = Object.keys(req.body) as (keyof Order)[];
    
    changedInputs.forEach((key: keyof Order) => {
      if(key == 'route')
        order[key] = new Types.ObjectId(req.body[key]);
      order[key] = req.body[key];
    });

    await order.save();
    const [updatedOrder] = await getOrderDetails(order.id);
    return res.json(updatedOrder)
  }catch(e){
    return res.status(500).json({error: 'Error fetching orders', e});
  }

}

export async function canStartOrder(req: Request<{id: string}>, res: Response, next: NextFunction){
  const order = req.element as Document & Order;
  if(order.status === OrderStatus.Finished){
    return res.status(400).json({error : "Order already finished."});
  }

  if(!order.truck){
    return res.status(400).json({error: "First assign a truck."});
  }
  next();
}

export async function startOrder(req: Request<{id: string}>, res: Response){
  const order = req.element as Document & Order;
  order.status = OrderStatus.InProgress;
  await order.save();
  return res.json({message: "Order is now in progress."});
}

export async function canEndOrder(req: Request<{id: string}>, res: Response, next: NextFunction){
  const order = req.element as Document & Order;
  if(order.status === OrderStatus.Created){
    return res.status(400).json({error : "In order to end an order you must start it first."});
  }
  next();
}

export async function endOrder(req: Request<{id: string}>, res: Response){
  const order = req.element as Document & Order;
  order.status = OrderStatus.Finished;
  await order.save();
  return res.json({message: 'Order finished'});
}
