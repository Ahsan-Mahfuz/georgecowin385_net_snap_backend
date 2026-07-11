import { Document, Types } from "mongoose";

export type TApprovalKind = "deal" | "expense";
export type TApprovalStatus = "pending" | "approved" | "rejected";

export interface IApproval extends Document {
  kind: TApprovalKind;
  title: string;
  amount: number;
  monthIndex: number;
  submittedBy: Types.ObjectId;
  approver?: Types.ObjectId; // who should approve; empty → any admin
  manager?: Types.ObjectId; // the manager the item belongs to
  status: TApprovalStatus;
  rejectionReason: string;
  note: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const APPROVAL_KINDS = ["deal", "expense"] as const;
export const APPROVAL_STATUSES = ["pending", "approved", "rejected"] as const;
