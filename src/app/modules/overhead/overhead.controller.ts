import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { OverheadService } from "./overhead.service";

const create = catchAsync(async (req, res) => {
  const result = await OverheadService.create(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Overhead created", data: result });
});

const getAll = catchAsync(async (req, res) => {
  const result = await OverheadService.getAll(req.query as Record<string, unknown>);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Overheads retrieved",
    meta: result.meta,
    data: result.data,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await OverheadService.update(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Overhead updated", data: result });
});

const remove = catchAsync(async (req, res) => {
  const result = await OverheadService.remove(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: result.message, data: null });
});

export const OverheadController = { create, getAll, update, remove };
