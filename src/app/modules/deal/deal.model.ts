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
    stage: { type: String, default: "Conversation" },
    // 12 monthly values (Jan–Dec) — drives P&L, cashflow, leaderboard.
    monthValues: { type: [Number], default: () => new Array(12).fill(0) },
    costRate: { type: Number, default: 80 },

    // CRM / cashflow / invoicing
    contactEmail: { type: String, default: "" },
    paymentTerm: { type: String, default: "30" },
    customPaymentDays: { type: Number, default: 0 },
    signedMonthIndex: { type: Number, default: 0 },
    currency: { type: String, enum: ["GBP", "USD"], default: "GBP" },
    poNumber: { type: String, default: "" },

    // Xero invoicing
    xeroOrg: { type: String, default: "Cowshed Creators" },
    xeroInvoiceId: { type: String, default: "" },
    xeroStatus: { type: String, default: "" },
    invoiceDate: { type: String, default: "" },
    financeStatus: { type: String, default: "" },

    // Talent remittance
    remittanceStatus: { type: String, default: "" },
    remittanceSentAt: { type: String, default: "" },
    remittancePaidAt: { type: String, default: "" },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Deal = model<IDeal>("Deal", dealSchema);
