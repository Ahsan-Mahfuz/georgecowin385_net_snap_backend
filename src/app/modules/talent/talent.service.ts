import { Talent } from "./talent.model";
import { ITalent } from "./talent.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";

const POPULATE = { path: "manager", select: "name email role" };

const create = async (payload: Partial<ITalent>) => {
  const doc = await Talent.create(payload);
  return doc.populate(POPULATE);
};

const getAll = async (query: Record<string, unknown>) => {
  const builder = new QueryBuilder(Talent.find({ isDeleted: false }), query)
    .search(["name"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await builder.modelQuery.populate(POPULATE);
  const meta = await builder.countTotal();
  return { data, meta };
};

const update = async (id: string, payload: Partial<ITalent>) => {
  const doc = await Talent.findOne({ _id: id, isDeleted: false });
  if (!doc) throw new AppError(404, "Talent not found");
  return Talent.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).populate(POPULATE);
};

const remove = async (id: string) => {
  const doc = await Talent.findOne({ _id: id, isDeleted: false });
  if (!doc) throw new AppError(404, "Talent not found");
  doc.isDeleted = true;
  await doc.save();
  return { message: "Talent deleted successfully" };
};

export const TalentService = { create, getAll, update, remove };
