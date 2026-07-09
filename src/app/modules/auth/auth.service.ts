import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";
import { ITokenPayload, ISignupPayload, ILoginPayload } from "./auth.interface";

const signToken = (payload: ITokenPayload): string => {
  return jwt.sign(payload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  } as SignOptions);
};

// Strip sensitive fields and shape the user the way the frontend expects.
const sanitize = (user: IUser) => {
  const obj = user.toObject();
  delete obj.password;
  return {
    id: String(obj._id),
    name: obj.name,
    email: obj.email,
    role: obj.role,
    portal: obj.portal,
    status: obj.status,
  };
};

// New accounts always start as `pending` — an admin must approve before login.
const signUp = async (payload: ISignupPayload) => {
  const existing = await User.findOne({ email: payload.email, isDeleted: false });
  if (existing) throw new AppError(400, "An account with that email already exists");

  const user = await User.create({ ...payload, status: "pending" });
  return sanitize(user);
};

const signIn = async (payload: ILoginPayload) => {
  const user = await User.findOne({ email: payload.email, isDeleted: false }).select("+password");
  if (!user) throw new AppError(401, "Email or password is incorrect");

  if (payload.portal && user.portal !== payload.portal) {
    throw new AppError(403, "That account belongs to the other portal");
  }

  const isMatch = await user.matchPassword(payload.password);
  if (!isMatch) throw new AppError(401, "Email or password is incorrect");

  if (user.status === "pending") {
    throw new AppError(403, "Your account is waiting for an admin to approve it");
  }
  if (user.status === "disabled") {
    throw new AppError(403, "This account has been disabled. Contact an admin.");
  }

  const token = signToken({
    userId: String(user._id),
    role: user.role,
    portal: user.portal,
    email: user.email,
  });

  return { token, user: sanitize(user) };
};

const getMe = async (userId: string) => {
  const user = await User.findOne({ _id: userId, isDeleted: false });
  if (!user) throw new AppError(404, "User not found");
  return sanitize(user);
};

const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new AppError(404, "User not found");

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) throw new AppError(400, "Current password is incorrect");

  user.password = newPassword;
  await user.save();
  return { message: "Password updated successfully" };
};

export const AuthService = { signUp, signIn, getMe, changePassword };
