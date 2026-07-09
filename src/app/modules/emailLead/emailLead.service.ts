import { EmailLead } from "./emailLead.model";
import { IEmailLead } from "./emailLead.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";

const POPULATE = { path: "manager", select: "name email role" };

const create = async (payload: Partial<IEmailLead>) => {
  const doc = await EmailLead.create(payload);
  return doc.populate(POPULATE);
};

const getAll = async (query: Record<string, unknown>) => {
  const builder = new QueryBuilder(EmailLead.find({ isDeleted: false }), query)
    .search(["subject", "company", "talentName", "from"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await builder.modelQuery.populate(POPULATE);
  const meta = await builder.countTotal();
  return { data, meta };
};

const update = async (id: string, payload: Partial<IEmailLead>) => {
  const doc = await EmailLead.findOne({ _id: id, isDeleted: false });
  if (!doc) throw new AppError(404, "Email lead not found");
  return EmailLead.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).populate(POPULATE);
};

const remove = async (id: string) => {
  const doc = await EmailLead.findOne({ _id: id, isDeleted: false });
  if (!doc) throw new AppError(404, "Email lead not found");
  doc.isDeleted = true;
  await doc.save();
  return { message: "Email lead deleted successfully" };
};

export const EmailLeadService = { create, getAll, update, remove };
