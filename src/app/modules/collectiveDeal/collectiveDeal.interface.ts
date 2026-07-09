import { Document, Types } from "mongoose";

export interface ICollectiveDeal extends Document {
  owner: Types.ObjectId;
  company: string;
  dealName: string;
  contactName?: string;
  emailContact?: string;
  stage: string;
  amount: number;
  paymentTerm: string;
  customPaymentDays: number;
  monthValues: number[];
  xeroOrg: string;
  xeroInvoiceId: string;
  xeroStatus: string;
  notes: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
