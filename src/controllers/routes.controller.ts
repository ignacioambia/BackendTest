import { NextFunction, Request, Response } from "express";
import { Route } from "../types/Route";
import { PointModel } from "../models/point.model";
import { RouteModel } from "../models/route.model";
import { FilterQuery, Types } from "mongoose";

/**
 * Returns routes with it's corresponding details
 * @param filterQuery object that contains the fileter criteria to get orders
 * @returns 
 */
export async function getRoutesDetails(filterQuery: FilterQuery<Route> = {}) {
  const searchActiveOrders = {deleted: false};

  return RouteModel.aggregate([
    {
      $match: {...filterQuery, ...searchActiveOrders},
    },
    {
      $lookup: {
        from: "points",
        localField: "from",
        foreignField: "_id",
        as: "from",
      },
    },
    {
      $unwind: "$from",
    },
    {
      $lookup: {
        from: "points",
        localField: "to",
        foreignField: "_id",
        as: "to",
      },
    },
    {
      $unwind: "$to",
    },
    {
      $project: {
        from: 1,
        to: 1
      }
    }
  ]);
}

/**
 * Throws an error if route is already found in DB.
 */
export async function routeAlreadyExists(
  req: Request<{id?: string}, {}, Route>,
  res: Response,
  next: NextFunction
) {
  const { from, to } = req.body;
  const routeExists = await RouteModel.findOne({ from, to, deleted: false });
  if(routeExists?._id == req.params.id && req.params.id){
    return res.status(400).json({
      error: "Route didn't change."
    })
  }
  if (routeExists)
    return res.status(400).json({
      error: `Route from "${from}" to "${to}" already exists.`,
      route: routeExists
    });
  next();
}

/**
 * Makes sure origin and destination are not the same
 */
export async function checkRouteRules(
  req: Request<{}, {}, Route>,
  res: Response,
  next: NextFunction
) {
  const { from, to } = req.body;
  if (from == to)
    return res
      .status(400)
      .json({ error: "Origin & destination must be different." });
  next();
}

/**
 * Used to send all routes to the user
 */
export async function getAllRoutes(req: Request, res: Response) {
  try {
    const allRoutes = await getRoutesDetails();
    return res.json(allRoutes);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching all routes" });
  }
}

/**
 * Returns route details of an order
 */
export async function getSpecificRoute(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const [route] = await getRoutesDetails({
      _id: new Types.ObjectId(req.params.id),
    });
    return res.status(200).json(route);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `An error ocurred getting route "${req.params.id}".` });
  }
}

/**
 * Checks if points exist in DB
 */
export async function verifyPoints(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const { from, to } = req.body;

  //checking if "from" point exists
  const fromPoint = await PointModel.findById(from);
  if (!fromPoint)
    return res.status(400).json({ error: `Point id "${from}" not found.` });

  //checking if "to" point exists
  const toPoint = await PointModel.findById(to);
  if (!toPoint)
    return res.status(400).json({ error: `Point id "${to}" not found.` });

  next();
}
/**
 * Saves a new route in DB
 */
export async function createRoute(req: Request<{}, {}, Route>, res: Response) {
  try {
    const { from, to } = req.body;

    //save new route
    const route = await new RouteModel({ from, to });
    await route.save();
    const [savedRoute] = await getRoutesDetails({_id: route._id})
    res.json(savedRoute);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error ocurred creating the new route." });
  }
}
/**
 * Edits an existing route
 */
export async function editRoute(req: Request<{ id: string }, {}, Route>, res: Response) {
  try {
    const { from, to } = req.body;
    const route = await RouteModel.findById(req.params.id);

    if(!route)
      throw new Error('Route not found');

    route.from = from;
    route.to = to;

    const updatedRoute = await route.save();
    return res.status(200).json(await getRoutesDetails({_id: updatedRoute._id}));

  } catch (error) {}
}

/**
 * Delete route
 */
export async function deleteRoute(req: Request<{id: string}>, res: Response) {
  const { id } = req.params;
  const route = await RouteModel.findById(id);

  if(!route)
    throw new Error('Route not found');

  route.deleted = true;

  await route.save();

  return res.json({message: `Route "${id}" deleted.`})

}
