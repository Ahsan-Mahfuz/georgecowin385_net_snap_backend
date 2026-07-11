import { z } from "zod";
import { APPROVAL_KINDS } from "./approval.interface";

export const createApprovalSchema = z.object({
  kind: z.enum(APPROVAL_KINDS),
  title: z.string().trim().min(1, "Title is required"),
  amount: z.number().optional(),
  monthIndex: z.number().optional(),
  approver: z.string().optional(),
  manager: z.string().optional(),
  note: z.string().optional(),
});

export const rejectApprovalSchema = z.object({
  rejectionReason: z.string().optional(),
});
