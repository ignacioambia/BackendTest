import { Schema } from "mongoose";

export interface Route {
 from: Schema.Types.ObjectId,
 to: Schema.Types.ObjectId,
 deleted?: boolean
}