import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { ApprovalService } from "./approval.service";

const create = catchAsync(async (req, res) => {
  const result = await ApprovalService.create(req.body, req.user.userId);
  sendResponse(res, { statusCode: 201, success: true, message: "Submitted for approval", data: result });
});

const getAll = catchAsync(async (req, res) => {
  const result = await ApprovalService.getAll(req.query as Record<string, unknown>, req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Approvals retrieved",
    meta: result.meta,
    data: result.data,
  });
});

const approve = catchAsync(async (req, res) => {
  const result = await ApprovalService.approve(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: "Approved", data: result });
});

const reject = catchAsync(async (req, res) => {
  const result = await ApprovalService.reject(req.params.id, req.body.rejectionReason);
  sendResponse(res, { statusCode: 200, success: true, message: "Rejected", data: result });
});

export const ApprovalController = { create, getAll, approve, reject };
