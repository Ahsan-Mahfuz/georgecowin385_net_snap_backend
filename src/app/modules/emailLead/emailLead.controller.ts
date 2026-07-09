import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { EmailLeadService } from "./emailLead.service";

const create = catchAsync(async (req, res) => {
  const result = await EmailLeadService.create(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Email lead created", data: result });
});

const getAll = catchAsync(async (req, res) => {
  const result = await EmailLeadService.getAll(req.query as Record<string, unknown>);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Email leads retrieved",
    meta: result.meta,
    data: result.data,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await EmailLeadService.update(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Email lead updated", data: result });
});

const remove = catchAsync(async (req, res) => {
  const result = await EmailLeadService.remove(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: result.message, data: null });
});

export const EmailLeadController = { create, getAll, update, remove };
