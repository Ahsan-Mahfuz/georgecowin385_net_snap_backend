import { Document, Types } from "mongoose";

export interface ITalent extends Document {
  name: string;
  manager: Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
