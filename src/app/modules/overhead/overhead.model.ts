import { Schema, model } from "mongoose";
import { IOverhead } from "./overhead.interface";

const overheadSchema = new Schema<IOverhead>(
  {
    label: { type: String, required: true, trim: true },
    values: { type: [Number], default: () => new Array(12).fill(0) },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Overhead = model<IOverhead>("Overhead", overheadSchema);
