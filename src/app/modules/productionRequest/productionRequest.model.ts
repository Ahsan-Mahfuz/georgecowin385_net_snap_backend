import { Schema, model } from "mongoose";
import { IProductionRequest } from "./productionRequest.interface";
import { PRODUCTION_REQUEST_STATUSES } from "../../utilities/enum";

const itemSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    days: { type: Number, default: 1 },
    rate: { type: Number, default: 0 },
  },
  { _id: false },
);

const productionRequestSchema = new Schema<IProductionRequest>(
  {
    manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
    submittedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    talentName: { type: String, required: true, trim: true },
    shootDate: { type: String, default: "" },
    videoBrief: { type: String, default: "" },
    items: { type: [itemSchema], default: [] },
    total: { type: Number, default: 0 },
    status: { type: String, enum: PRODUCTION_REQUEST_STATUSES, default: "pending" },
    note: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const ProductionRequest = model<IProductionRequest>(
  "ProductionRequest",
  productionRequestSchema,
);
