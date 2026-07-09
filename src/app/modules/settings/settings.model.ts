import { Schema, model } from "mongoose";
import { ISettings } from "./settings.interface";

// A single global settings document. Values default empty — no dummy data.
const settingsSchema = new Schema<ISettings>(
  {
    targets: { type: [Number], default: () => new Array(12).fill(0) },
    managerSalaries: { type: Schema.Types.Mixed, default: {} },
    commissionRates: { type: Schema.Types.Mixed, default: {} },
    productionRates: { type: Schema.Types.Mixed, default: { Producer: 0, DOP: 0, Editor: 0 } },
  },
  { timestamps: true },
);

export const Settings = model<ISettings>("Settings", settingsSchema);
