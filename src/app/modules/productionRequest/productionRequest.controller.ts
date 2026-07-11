import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { ProductionRequestService } from "./productionRequest.service";

const create = catchAsync(async (req, res) => {
  const result = await ProductionRequestService.create(req.body, req.user.userId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Production request submitted",
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await ProductionRequestService.getAll(req.query as Record<string, unknown>);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Production requests retrieved",
    meta: result.meta,
    data: result.data,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await ProductionRequestService.update(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Production request updated", data: result });
});

const remove = catchAsync(async (req, res) => {
  const result = await ProductionRequestService.remove(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: result.message, data: null });
});

export const ProductionRequestController = { create, getAll, update, remove };
