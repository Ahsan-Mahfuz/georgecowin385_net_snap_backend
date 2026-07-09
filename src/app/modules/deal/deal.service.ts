import { Deal } from "./deal.model";
import { IDeal } from "./deal.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";

const POPULATE = { path: "manager", select: "name email role" };

const createDeal = async (payload: Partial<IDeal>) => {
  const deal = await Deal.create(payload);
  return deal.populate(POPULATE);
};

const getDeals = async (query: Record<string, unknown>) => {
  const builder = new QueryBuilder(Deal.find({ isDeleted: false }), query)
    .search(["talentName", "campaignName", "company"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await builder.modelQuery.populate(POPULATE);
  const meta = await builder.countTotal();
  return { data, meta };
};

const getDealById = async (id: string) => {
  const deal = await Deal.findOne({ _id: id, isDeleted: false }).populate(POPULATE);
  if (!deal) throw new AppError(404, "Deal not found");
  return deal;
};

const updateDeal = async (id: string, payload: Partial<IDeal>) => {
  const deal = await Deal.findOne({ _id: id, isDeleted: false });
  if (!deal) throw new AppError(404, "Deal not found");
  const updated = await Deal.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate(POPULATE);
  return updated;
};

const deleteDeal = async (id: string) => {
  const deal = await Deal.findOne({ _id: id, isDeleted: false });
  if (!deal) throw new AppError(404, "Deal not found");
  deal.isDeleted = true;
  await deal.save();
  return { message: "Deal deleted successfully" };
};

export const DealService = { createDeal, getDeals, getDealById, updateDeal, deleteDeal };
