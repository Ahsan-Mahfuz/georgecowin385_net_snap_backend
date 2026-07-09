import { Document } from "mongoose";

export interface IOverhead extends Document {
  label: string;
  values: number[]; // 12 monthly values
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
