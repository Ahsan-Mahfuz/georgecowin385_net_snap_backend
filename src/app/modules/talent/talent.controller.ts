import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { TalentService } from "./talent.service";

const create = catchAsync(async (req, res) => {
  const result = await TalentService.create(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Talent created", data: result });
});

const getAll = catchAsync(async (req, res) => {
  const result = await TalentService.getAll(req.query as Record<string, unknown>);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Talents retrieved",
    meta: result.meta,
    data: result.data,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await TalentService.update(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Talent updated", data: result });
});

const remove = catchAsync(async (req, res) => {
  const result = await TalentService.remove(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: result.message, data: null });
});

export const TalentController = { create, getAll, update, remove };
