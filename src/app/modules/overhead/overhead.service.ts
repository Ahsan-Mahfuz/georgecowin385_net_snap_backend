import { Overhead } from "./overhead.model";
import { IOverhead } from "./overhead.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";

const create = async (payload: Partial<IOverhead>) => Overhead.create(payload);

const getAll = async (query: Record<string, unknown>) => {
  const builder = new QueryBuilder(Overhead.find({ isDeleted: false }), query)
    .search(["label"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await builder.modelQuery;
  const meta = await builder.countTotal();
  return { data, meta };
};

const update = async (id: string, payload: Partial<IOverhead>) => {
  const doc = await Overhead.findOne({ _id: id, isDeleted: false });
  if (!doc) throw new AppError(404, "Overhead not found");
  return Overhead.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
};

const remove = async (id: string) => {
  const doc = await Overhead.findOne({ _id: id, isDeleted: false });
  if (!doc) throw new AppError(404, "Overhead not found");
  doc.isDeleted = true;
  await doc.save();
  return { message: "Overhead deleted successfully" };
};

export const OverheadService = { create, getAll, update, remove };
