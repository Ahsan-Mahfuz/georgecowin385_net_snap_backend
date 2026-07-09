import { Schema, model } from "mongoose";
import { IExpense, EXPENSE_KINDS } from "./expense.interface";

const expenseSchema = new Schema<IExpense>(
  {
    kind: { type: String, enum: EXPENSE_KINDS, default: "general" },
    label: { type: String, required: true, trim: true },
    manager: { type: Schema.Types.ObjectId, ref: "User" },
    talentName: { type: String, default: "" },
    amount: { type: Number, default: 0 },
    monthIndex: { type: Number, default: 0 },
    note: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Expense = model<IExpense>("Expense", expenseSchema);
