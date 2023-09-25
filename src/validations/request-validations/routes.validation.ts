import { RequestValidation } from "../../types/RequestValidation";
import { CustomJoi } from "../joi-extensions";

export const routeSchema = CustomJoi.object({
 from: CustomJoi.objectId().required(),
 to: CustomJoi.objectId().required()
});

export const singleRouteParams = CustomJoi.object({
 id: CustomJoi.objectId().required()
});

export const editRoute: RequestValidation = {
 payload: routeSchema,
 params: singleRouteParams
}

export const newRoute: RequestValidation = {
 payload: routeSchema
};

export const getSingleRoute: RequestValidation = {
 params: singleRouteParams
}

export const deleteRoute: RequestValidation = {
 params: singleRouteParams
}
