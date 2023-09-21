import { Schema } from "mongoose";

export interface Route {
 from: Schema.Types.ObjectId,
 to: string
}