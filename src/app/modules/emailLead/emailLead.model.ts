import { Schema, model } from "mongoose";
import { IEmailLead, LEAD_CATEGORIES } from "./emailLead.interface";

const emailLeadSchema = new Schema<IEmailLead>(
  {
    manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
    from: { type: String, default: "" },
    subject: { type: String, default: "" },
    receivedAt: { type: Date, default: Date.now },
    category: { type: String, enum: LEAD_CATEGORIES, required: true },
    talentName: { type: String, default: "" },
    company: { type: String, default: "" },
    campaignName: { type: String, default: "" },
    amount: { type: Number, default: 0 },
    monthIndex: { type: Number, default: 0 },
    paymentTerm: { type: String, default: "30" },
    contactEmail: { type: String, default: "" },
    eventDate: { type: String, default: "" },
    actionPoint: { type: String, default: "" },
    body: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const EmailLead = model<IEmailLead>("EmailLead", emailLeadSchema);
