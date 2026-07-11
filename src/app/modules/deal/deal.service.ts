import { Deal } from "./deal.model";
import { IDeal } from "./deal.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";
import { createXeroInvoice } from "../../helper/xero";

const POPULATE = { path: "manager", select: "name email role" };

const dealAmount = (deal: IDeal) => (deal.monthValues || []).reduce((t, v) => t + Number(v || 0), 0);

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

// Create a draft invoice in Xero (or simulated) for this deal.
const createInvoice = async (id: string) => {
  const deal = await Deal.findOne({ _id: id, isDeleted: false });
  if (!deal) throw new AppError(404, "Deal not found");
  const result = await createXeroInvoice({
    contactName: deal.company || deal.talentName,
    description: `${deal.talentName} — ${deal.campaignName || "Campaign"}`,
    amount: dealAmount(deal),
    currency: deal.currency,
    reference: deal.poNumber,
  });
  deal.xeroInvoiceId = result.invoiceId;
  deal.xeroStatus = result.status;
  deal.financeStatus = "Draft in Xero";
  deal.invoiceDate = new Date().toISOString().slice(0, 10);
  await deal.save();
  return deal.populate(POPULATE);
};

const markInvoiced = async (id: string) => {
  const deal = await Deal.findOne({ _id: id, isDeleted: false });
  if (!deal) throw new AppError(404, "Deal not found");
  deal.financeStatus = "Invoiced in Xero";
  deal.stage = "Invoiced";
  await deal.save();
  return deal.populate(POPULATE);
};

const markPaid = async (id: string) => {
  const deal = await Deal.findOne({ _id: id, isDeleted: false });
  if (!deal) throw new AppError(404, "Deal not found");
  deal.financeStatus = "Paid";
  deal.stage = "Paid";
  deal.status = "Confirmed";
  await deal.save();
  return deal.populate(POPULATE);
};

// Send the talent their remittance (payment advice) for a paid deal.
const sendRemittance = async (id: string) => {
  const deal = await Deal.findOne({ _id: id, isDeleted: false });
  if (!deal) throw new AppError(404, "Deal not found");
  deal.remittanceStatus = "Sent";
  deal.remittanceSentAt = new Date().toISOString().slice(0, 10);
  await deal.save();
  return deal.populate(POPULATE);
};

// Mark the talent as actually paid (remittance settled).
const markTalentPaid = async (id: string) => {
  const deal = await Deal.findOne({ _id: id, isDeleted: false });
  if (!deal) throw new AppError(404, "Deal not found");
  deal.remittanceStatus = "Paid";
  deal.remittancePaidAt = new Date().toISOString().slice(0, 10);
  if (!deal.remittanceSentAt) deal.remittanceSentAt = deal.remittancePaidAt;
  await deal.save();
  return deal.populate(POPULATE);
};

export const DealService = {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  createInvoice,
  markInvoiced,
  markPaid,
  sendRemittance,
  markTalentPaid,
};
