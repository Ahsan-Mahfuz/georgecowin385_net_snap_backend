import { User } from "./user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";
import { TRole, TAccountStatus } from "../../utilities/enum";

// Active team members for a portal — any logged-in user may read this (needed for
// manager/owner dropdowns across the app). Returns only active, non-deleted users.
const getTeam = async (portal?: string) => {
  const filter: Record<string, unknown> = { isDeleted: false, status: "active" };
  if (portal) filter.portal = portal;
  return User.find(filter).select("name email role portal status").sort("name");
};

// Paginated, filterable directory. Filters by portal / status / role via the
// query string; searches name + email. Never returns soft-deleted users.
const getUsers = async (query: Record<string, unknown>) => {
  const builder = new QueryBuilder(User.find({ isDeleted: false }), query)
    .search(["name", "email"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await builder.modelQuery;
  const meta = await builder.countTotal();
  return { data, meta };
};

const approveUser = async (id: string, role: TRole) => {
  const user = await User.findOne({ _id: id, isDeleted: false });
  if (!user) throw new AppError(404, "User not found");
  user.status = "active";
  user.role = role;
  await user.save();
  return user;
};

// Rejecting a signup removes the record entirely (not a soft delete) so the email
// frees up and the person can register again later.
const rejectUser = async (id: string) => {
  const user = await User.findOne({ _id: id, isDeleted: false });
  if (!user) throw new AppError(404, "User not found");
  await User.findByIdAndDelete(id);
  return { message: "User request rejected" };
};

const setStatus = async (id: string, status: TAccountStatus) => {
  const user = await User.findOne({ _id: id, isDeleted: false });
  if (!user) throw new AppError(404, "User not found");
  user.status = status;
  await user.save();
  return user;
};

const setRole = async (id: string, role: TRole) => {
  const user = await User.findOne({ _id: id, isDeleted: false });
  if (!user) throw new AppError(404, "User not found");
  user.role = role;
  await user.save();
  return user;
};

export const UserService = { getTeam, getUsers, approveUser, rejectUser, setStatus, setRole };
