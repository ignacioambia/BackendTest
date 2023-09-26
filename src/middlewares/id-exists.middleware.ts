import { Request, Response, NextFunction } from "express";
import { Model, Types } from "mongoose";

/**
 * Checks if an id sent over req.params exists in the DB
 * @param model a mongoose model to search params id
 */
export function idExists<T = any>(model: Model<T>, ignoreDeleted: boolean = false ){
 return async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  try{
   const { id } = req.params;
   const query: any = {_id: new Types.ObjectId(id)};
   if(ignoreDeleted) query.deleted = false;
   const elementFound = await model.findOne(query);
   if(!elementFound){
    return res.status(400).json({error: `"${id}" not found in "${model.modelName}".`});
   }

   req.element = elementFound;
   next();
  }catch(error){

  }
 };

}
