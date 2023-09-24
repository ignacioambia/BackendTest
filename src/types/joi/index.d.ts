import Joi, { StringSchema } from "joi";

/**
 * Extra functionalities for Joi
 */
interface ExtendedJoi{
 /**
  * Verifies if received object is a valid string
  */
 objectId<TSchema = any>(): StringSchema<TSchema>
}

declare module 'joi'{
 interface Root extends ExtendedJoi{}
 interface StringSchema extends ExtendedJoi{}
}