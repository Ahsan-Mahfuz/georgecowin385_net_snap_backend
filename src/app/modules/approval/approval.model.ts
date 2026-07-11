import { Schema, model } from "mongoose";
import { IApproval, APPROVAL_KINDS, APPROVAL_STATUSES } from "./approval.interface";

const approvalSchema = new Schema<IApproval>(
  {
    kind: { type: String, enum: APPROVAL_KINDS, required: true },
    title: { type: String, required: true, trim: true },
    amount: { type: Number, default: 0 },
    monthIndex: { type: Number, default: 0 },
    submittedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    approver: { type: Schema.Types.ObjectId, ref: "User" },
    manager: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: APPROVAL_STATUSES, default: "pending" },
    rejectionReason: { type: String, default: "" },
    note: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Approval = model<IApproval>("Approval", approvalSchema);
