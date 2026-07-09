import { Document } from "mongoose";

export interface ISettings extends Document {
  // 12 monthly revenue targets for the Creators P&L.
  targets: number[];
  // Keyed by manager userId → monthly salary / commission percent.
  managerSalaries: Record<string, number>;
  commissionRates: Record<string, number>;
  // Production role → day rate (Producer / DOP / Editor).
  productionRates: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}
