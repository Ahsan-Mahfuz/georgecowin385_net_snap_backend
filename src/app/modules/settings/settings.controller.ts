import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { SettingsService } from "./settings.service";

const getSettings = catchAsync(async (_req, res) => {
  const result = await SettingsService.getSettings();
  sendResponse(res, { statusCode: 200, success: true, message: "Settings retrieved", data: result });
});

const updateSettings = catchAsync(async (req, res) => {
  const result = await SettingsService.updateSettings(req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Settings updated", data: result });
});

export const SettingsController = { getSettings, updateSettings };
