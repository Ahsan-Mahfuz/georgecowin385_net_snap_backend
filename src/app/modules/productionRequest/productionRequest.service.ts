import { ProductionRequest } from "./productionRequest.model";
import { IProductionRequest } from "./productionRequest.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";

const POPULATE = [
  { path: "manager", select: "name email role" },
  { path: "submittedBy", select: "name email role" },
];

const create = async (payload: Partial<IProductionRequest>, submittedBy: string) => {
  const total =
    payload.total ??
    (payload.items || []).reduce(
      (t, i) => t + Number(i.rate || 0) * Math.max(1, Number(i.days || 1)),
      0,
    );
  const doc = await ProductionRequest.create({
    ...payload,
    submittedBy,
    total,
    status: "pending",
  });
  return doc.populate(POPULATE);
};

const getAll = async (query: Record<string, unknown>) => {
  const builder = new QueryBuilder(ProductionRequest.find({ isDeleted: false }), query)
    .search(["talentName", "videoBrief"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await builder.modelQuery.populate(POPULATE);
  const meta = await builder.countTotal();
  return { data, meta };
};

// Production team / admin update status (schedule, complete, reject) or add a note.
const update = async (id: string, payload: Partial<IProductionRequest>) => {
  const doc = await ProductionRequest.findOne({ _id: id, isDeleted: false });
  if (!doc) throw new AppError(404, "Production request not found");
  return ProductionRequest.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate(POPULATE);
};

const remove = async (id: string) => {
  const doc = await ProductionRequest.findOne({ _id: id, isDeleted: false });
  if (!doc) throw new AppError(404, "Production request not found");
  doc.isDeleted = true;
  await doc.save();
  return { message: "Production request deleted successfully" };
};

export const ProductionRequestService = { create, getAll, update, remove };
