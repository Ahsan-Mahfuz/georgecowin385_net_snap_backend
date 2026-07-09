import { Schema, model } from "mongoose";
import { ITalent } from "./talent.interface";

const talentSchema = new Schema<ITalent>(
  {
    name: { type: String, required: true, trim: true },
    manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Talent = model<ITalent>("Talent", talentSchema);
