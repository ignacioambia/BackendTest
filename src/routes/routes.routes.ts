import express from "express";
import { verifyRequest } from "../middlewares/verify-request.middleware";
import * as Validation from "../validations/request-validations/routes.validation";
import * as Controller from "../controllers/routes.controller";
import { idExists } from "../middlewares/id-exists.middleware";
import { RouteModel } from "../models/route.model";

const router = express.Router();

router.get("/", Controller.getAllRoutes);

router.get(
  "/:id",
  verifyRequest(Validation.getSingleRoute),
  idExists(RouteModel),
  Controller.getSpecificRoute
);

router.get(
  '/coordinates/:id',
  verifyRequest(Validation.getSingleRoute),
  idExists(RouteModel),
  Controller.getCoordinates

)

router.get(
  '/distance/:id',
  verifyRequest(Validation.getSingleRoute),
  idExists(RouteModel),
  Controller.getRouteDistance
)

router.post(
  "/",
  verifyRequest(Validation.newRoute),
  Controller.routeAlreadyExists,
  Controller.checkRouteRules,
  Controller.verifyPoints,
  Controller.createRoute
);

router.put(
  "/:id",
  verifyRequest(Validation.editRoute),
  idExists(RouteModel),
  Controller.routeAlreadyExists,
  Controller.checkRouteRules,
  Controller.verifyPoints,
  Controller.editRoute
);

router.delete(
  "/:id",
  verifyRequest(Validation.deleteRoute),
  idExists(RouteModel),
  Controller.deleteRoute
);

export default router;
