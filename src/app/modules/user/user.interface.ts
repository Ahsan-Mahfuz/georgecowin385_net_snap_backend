import { Document, Model } from "mongoose";
import { TRole, TPortal, TAccountStatus } from "../../utilities/enum";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: TRole;
  portal: TPortal;
  status: TAccountStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(plain: string): Promise<boolean>;
}

export type IUserModel = Model<IUser>;
