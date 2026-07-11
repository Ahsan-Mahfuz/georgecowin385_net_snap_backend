import { Document, Types } from "mongoose";
import { TDealStatus } from "../../utilities/enum";

export interface IDeal extends Document {
  manager: Types.ObjectId;
  talentName: string;
  status: TDealStatus;
  campaignName: string;
  company?: string;
  stage?: string;
  monthValues: number[];
  costRate: number;

  // CRM / cashflow / invoicing fields
  contactEmail?: string;
  paymentTerm: string; // "upfront" | "30" | "45" | "60" | "90" | "custom"
  customPaymentDays: number;
  signedMonthIndex: number; // 0-11, when the deal became live/signed
  currency: "GBP" | "USD";
  poNumber?: string;

  // Xero invoicing
  xeroOrg: string;
  xeroInvoiceId: string;
  xeroStatus: string;
  invoiceDate?: string;
  financeStatus: string; // "" | "Draft in Xero" | "Invoiced in Xero" | "Paid"

  // Talent remittance (paying the talent their share after the brand pays)
  remittanceStatus: string; // "" | "Sent" | "Paid"
  remittanceSentAt?: string;
  remittancePaidAt?: string;

  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
