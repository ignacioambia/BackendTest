import Joi from "joi";
import { objectIdValidation } from "./object-id.joi-validation";

export const CustomJoi: Joi.Root = Joi.extend(
  objectIdValidation
);
