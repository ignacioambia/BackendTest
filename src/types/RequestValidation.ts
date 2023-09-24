import { ObjectSchema } from "joi"

export interface RequestValidation {
 payload?: ObjectSchema,
 params?: ObjectSchema,
}

