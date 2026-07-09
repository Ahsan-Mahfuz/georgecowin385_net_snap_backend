import { Schema, model } from "mongoose";
import { ICollectiveDeal } from "./collectiveDeal.interface";

const collectiveDealSchema = new Schema<ICollectiveDeal>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: String, required: true, trim: true },
    dealName: { type: String, required: true, trim: true },
    contactName: { type: String, default: "" },
    emailContact: { type: String, default: "" },
    stage: { type: String, default: "Conversation" },
    amount: { type: Number, default: 0 },
    paymentTerm: { type: String, default: "30" },
    customPaymentDays: { type: Number, default: 0 },
    monthValues: { type: [Number], default: () => new Array(12).fill(0) },
    // Simulated Xero (accounting) integration fields.
    xeroOrg: { type: String, default: "Cowshed Collective Sales" },
    xeroInvoiceId: { type: String, default: "" },
    xeroStatus: { type: String, default: "" },
    notes: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const CollectiveDeal = model<ICollectiveDeal>("CollectiveDeal", collectiveDealSchema);
