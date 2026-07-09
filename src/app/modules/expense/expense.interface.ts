import { Document, Types } from "mongoose";

export type TExpenseKind = "general" | "talent";

export interface IExpense extends Document {
  kind: TExpenseKind;
  label: string;
  manager?: Types.ObjectId;
  talentName?: string;
  amount: number;
  monthIndex: number;
  note?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const EXPENSE_KINDS = ["general", "talent"] as const;
