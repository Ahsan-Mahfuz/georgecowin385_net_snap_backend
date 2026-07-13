import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { IUser } from "./user.interface";
import { ROLES, PORTALS, ACCOUNT_STATUSES } from "../../utilities/enum";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    role: { type: String, enum: ROLES, required: true },
    portal: { type: String, enum: PORTALS, required: true },
    status: { type: String, enum: ACCOUNT_STATUSES, default: "pending" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Expose the `id` virtual (hex string of _id) in JSON responses. The frontend
// reads `user.id` everywhere; without this it only receives `_id` and every
// per-user action (role change, salary keying, etc.) breaks. `_id` is kept too.
userSchema.set("toJSON", { virtuals: true });

// Hash password whenever it is set/changed. Runs on .save() only — so any
// password change must go through user.save(), never findByIdAndUpdate.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
  next();
});

userSchema.methods.matchPassword = async function (plain: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(plain, this.password);
};

export const User = model<IUser>("User", userSchema);
