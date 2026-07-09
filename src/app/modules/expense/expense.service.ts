import { Expense } from "./expense.model";
import { IExpense } from "./expense.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";

const POPULATE = { path: "manager", select: "name email role" };

const create = async (payload: Partial<IExpense>) => {
  const doc = await Expense.create(payload);
  return doc.populate(POPULATE);
};

const getAll = async (query: Record<string, unknown>) => {
  const builder = new QueryBuilder(Expense.find({ isDeleted: false }), query)
    .search(["label", "talentName", "note"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await builder.modelQuery.populate(POPULATE);
  const meta = await builder.countTotal();
  return { data, meta };
};

const update = async (id: string, payload: Partial<IExpense>) => {
  const doc = await Expense.findOne({ _id: id, isDeleted: false });
  if (!doc) throw new AppError(404, "Expense not found");
  return Expense.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).populate(POPULATE);
};

const remove = async (id: string) => {
  const doc = await Expense.findOne({ _id: id, isDeleted: false });
  if (!doc) throw new AppError(404, "Expense not found");
  doc.isDeleted = true;
  await doc.save();
  return { message: "Expense deleted successfully" };
};

export const ExpenseService = { create, getAll, update, remove };
