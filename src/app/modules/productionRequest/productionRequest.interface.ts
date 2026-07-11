import { Document, Types } from "mongoose";
import { TProductionRequestStatus } from "../../utilities/enum";

// One production line item requested (e.g. "Videographer" × 2 days at a rate).
export interface IProductionItem {
  name: string;
  days: number;
  rate: number;
}

export interface IProductionRequest extends Document {
  manager: Types.ObjectId; // talent manager the request is for
  submittedBy: Types.ObjectId; // who created the request
  talentName: string;
  shootDate: string; // ISO yyyy-mm-dd
  videoBrief: string;
  items: IProductionItem[];
  total: number;
  status: TProductionRequestStatus;
  note?: string; // production team note / rejection reason
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
