import { Document, Types } from "mongoose";

export type TLeadCategory = "Deal" | "PR" | "Event";

export interface IEmailLead extends Document {
  manager: Types.ObjectId;
  from: string;
  subject: string;
  receivedAt: Date;
  category: TLeadCategory;
  talentName: string;
  company: string;
  campaignName: string;
  amount: number;
  monthIndex: number;
  paymentTerm: string;
  contactEmail: string;
  eventDate?: string;
  actionPoint: string;
  body: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const LEAD_CATEGORIES = ["Deal", "PR", "Event"] as const;
