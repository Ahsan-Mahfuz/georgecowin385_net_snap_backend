import { Approval } from "./approval.model";
import { IApproval } from "./approval.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";
import { ITokenPayload } from "../../interfaces";
import { ADMIN_ROLES } from "../../utilities/enum";

const POPULATE = [
  { path: "submittedBy", select: "name email role" },
  { path: "approver", select: "name email role" },
  { path: "manager", select: "name email role" },
];

const create = async (payload: Partial<IApproval>, submittedBy: string) => {
  const doc = await Approval.create({ ...payload, submittedBy, status: "pending" });
  return doc.populate(POPULATE);
};

// Admin/operations see everything; anyone else sees items they submitted or must approve.
const getAll = async (query: Record<string, unknown>, user: ITokenPayload) => {
  const base: Record<string, unknown> = { isDeleted: false };
  if (!ADMIN_ROLES.includes(user.role)) {
    base.$or = [{ submittedBy: user.userId }, { approver: user.userId }];
  }
  const builder = new QueryBuilder(Approval.find(base), query)
    .search(["title"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await builder.modelQuery.populate(POPULATE);
  const meta = await builder.countTotal();
  return { data, meta };
};

const approve = async (id: string) => {
  const doc = await Approval.findOne({ _id: id, isDeleted: false });
  if (!doc) throw new AppError(404, "Approval request not found");
  doc.status = "approved";
  await doc.save();
  return doc.populate(POPULATE);
};

const reject = async (id: string, reason: string) => {
  const doc = await Approval.findOne({ _id: id, isDeleted: false });
  if (!doc) throw new AppError(404, "Approval request not found");
  doc.status = "rejected";
  doc.rejectionReason = reason || "";
  await doc.save();
  return doc.populate(POPULATE);
};

export const ApprovalService = { create, getAll, approve, reject };
