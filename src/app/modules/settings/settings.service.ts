import { Settings } from "./settings.model";
import { ISettings } from "./settings.interface";

// There is exactly one settings document. Create it (empty) on first read.
const getSettings = async () => {
  let doc = await Settings.findOne();
  if (!doc) doc = await Settings.create({});
  return doc;
};

const updateSettings = async (payload: Partial<ISettings>) => {
  const current = await getSettings();
  const merged = {
    ...(payload.targets ? { targets: payload.targets } : {}),
    ...(payload.managerSalaries
      ? { managerSalaries: { ...current.managerSalaries, ...payload.managerSalaries } }
      : {}),
    ...(payload.commissionRates
      ? { commissionRates: { ...current.commissionRates, ...payload.commissionRates } }
      : {}),
    ...(payload.productionRates
      ? { productionRates: { ...current.productionRates, ...payload.productionRates } }
      : {}),
  };
  return Settings.findByIdAndUpdate(current._id, merged, { new: true, runValidators: true });
};

export const SettingsService = { getSettings, updateSettings };
