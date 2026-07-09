import { z } from "zod";
import { EXPENSE_KINDS } from "./expense.interface";

export const createExpenseSchema = z.object({
  kind: z.enum(EXPENSE_KINDS).optional(),
  label: z.string().trim().min(1, "Label is required"),
  manager: z.string().optional(),
  talentName: z.string().optional(),
  amount: z.number().optional(),
  monthIndex: z.number().optional(),
  note: z.string().optional(),
});

export const updateExpenseSchema = createExpenseSchema.partial();
