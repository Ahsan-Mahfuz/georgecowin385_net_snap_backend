import { Schema, model } from "mongoose";
import { IDeal } from "./deal.interface";
import { DEAL_STATUSES } from "../../utilities/enum";

const dealSchema = new Schema<IDeal>(
  {
    manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
    talentName: { type: String, required: true, trim: true },
    status: { type: String, enum: DEAL_STATUSES, default: "Pipeline" },
    campaignName: { type: String, default: "" },
    company: { type: String, default: "" },
    stage: { type: String, default: "" },
    // 12 monthly values (Jan–Dec) — drives P&L, cashflow, leaderboard.
    monthValues: { type: [Number], default: () => new Array(12).fill(0) },
    costRate: { type: Number, default: 80 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Deal = model<IDeal>("Deal", dealSchema);
