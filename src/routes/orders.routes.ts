import { Order } from "./../types/Order";
import express from "express";
import * as Validation from "../validations/request-validations/orders.validation";
import * as Controller from "../controllers/orders.controller";
import { verifyRequest } from "../middlewares/verify-request.middleware";
import { idExists } from "../middlewares/id-exists.middleware";
import { OrderModel } from "../models/order.model";

const router = express.Router();

router.get("/", Controller.getAllOrders);

router.get(
  "/:id",
  verifyRequest(Validation.getSingleOrder),
  idExists(OrderModel, true),
  Controller.getSingleOrder
);

router.post(
  "/",
  verifyRequest(Validation.newOrder),
  Controller.routeExists,
  Controller.createOrder
);

router.put("/:id",
  verifyRequest(Validation.editTruck),
  idExists(OrderModel, true),
  Controller.canAlterOrder,
  Controller.routeExists,
  Controller.editOrder
);

router.put(
  "/assign_truck/:id",
  verifyRequest(Validation.assignTruck),
  idExists(OrderModel, true),
  Controller.assignTruck
)

router.put(
  "/start/:id",
  verifyRequest(Validation.getSingleOrder),
  idExists(OrderModel, true),
  Controller.canStartOrder,
  Controller.startOrder
);

router.put(
  "/end/:id",
  verifyRequest(Validation.getSingleOrder),
  idExists(OrderModel, true),
  Controller.canEndOrder,
  Controller.endOrder
);

router.delete(
  "/:id",
  verifyRequest(Validation.getSingleOrder),
  idExists(OrderModel, true),
  Controller.canAlterOrder,
  Controller.deleteOrder
)

export default router;
