import { Document, Types } from "mongoose";
import { TDealStatus } from "../../utilities/enum";

export interface IDeal extends Document {
  manager: Types.ObjectId;
  talentName: string;
  status: TDealStatus;
  campaignName: string;
  company?: string;
  stage?: string;
  monthValues: number[];
  costRate: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
