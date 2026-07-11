import { CollectiveDeal } from "./collectiveDeal.model";
import { ICollectiveDeal } from "./collectiveDeal.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";
import { createXeroInvoice } from "../../helper/xero";

const POPULATE = { path: "owner", select: "name email role" };

const createDeal = async (payload: Partial<ICollectiveDeal>) => {
  const deal = await CollectiveDeal.create(payload);
  return deal.populate(POPULATE);
};

const getDeals = async (query: Record<string, unknown>) => {
  const builder = new QueryBuilder(CollectiveDeal.find({ isDeleted: false }), query)
    .search(["company", "dealName", "contactName"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await builder.modelQuery.populate(POPULATE);
  const meta = await builder.countTotal();
  return { data, meta };
};

const getDealById = async (id: string) => {
  const deal = await CollectiveDeal.findOne({ _id: id, isDeleted: false }).populate(POPULATE);
  if (!deal) throw new AppError(404, "Collective deal not found");
  return deal;
};

const updateDeal = async (id: string, payload: Partial<ICollectiveDeal>) => {
  const deal = await CollectiveDeal.findOne({ _id: id, isDeleted: false });
  if (!deal) throw new AppError(404, "Collective deal not found");
  const updated = await CollectiveDeal.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate(POPULATE);
  return updated;
};

const deleteDeal = async (id: string) => {
  const deal = await CollectiveDeal.findOne({ _id: id, isDeleted: false });
  if (!deal) throw new AppError(404, "Collective deal not found");
  deal.isDeleted = true;
  await deal.save();
  return { message: "Collective deal deleted successfully" };
};

const createInvoice = async (id: string) => {
  const deal = await CollectiveDeal.findOne({ _id: id, isDeleted: false });
  if (!deal) throw new AppError(404, "Collective deal not found");
  const result = await createXeroInvoice({
    contactName: deal.company,
    description: deal.dealName || "Collective sales deal",
    amount: Number(deal.amount || 0),
    reference: deal.contactName,
  });
  deal.xeroInvoiceId = result.invoiceId;
  deal.xeroStatus = result.status;
  deal.xeroOrg = "Cowshed Collective Sales";
  await deal.save();
  return deal.populate(POPULATE);
};

const markInvoiced = async (id: string) => {
  const deal = await CollectiveDeal.findOne({ _id: id, isDeleted: false });
  if (!deal) throw new AppError(404, "Collective deal not found");
  deal.stage = "Invoiced";
  deal.xeroStatus = "Invoiced in Collective Xero";
  await deal.save();
  return deal.populate(POPULATE);
};

const markPaid = async (id: string) => {
  const deal = await CollectiveDeal.findOne({ _id: id, isDeleted: false });
  if (!deal) throw new AppError(404, "Collective deal not found");
  deal.stage = "Paid";
  deal.xeroStatus = "Paid / reconciled in Collective Xero";
  await deal.save();
  return deal.populate(POPULATE);
};

export const CollectiveDealService = {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  createInvoice,
  markInvoiced,
  markPaid,
};
