import Joi, { CustomHelpers, Extension } from 'joi';
import mongoose from 'mongoose';

export const objectIdValidation: Extension = {
 type: "objectId",
 base: Joi.string(),
 messages: {
   "objectId.invalid": "Invalid ObjectId format",
 },
 validate(objId: string, { error }: CustomHelpers) {
   if (!mongoose.Types.ObjectId.isValid(objId)) {
     return { value: objId, errors: error("objectId.invalid") };
   }
   return;
 },
};