import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { DealService } from "./deal.service";

const createDeal = catchAsync(async (req, res) => {
  const result = await DealService.createDeal(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Deal created successfully",
    data: result,
  });
});

const getDeals = catchAsync(async (req, res) => {
  const result = await DealService.getDeals(req.query as Record<string, unknown>);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Deals retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getDealById = catchAsync(async (req, res) => {
  const result = await DealService.getDealById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Deal retrieved successfully",
    data: result,
  });
});

const updateDeal = catchAsync(async (req, res) => {
  const result = await DealService.updateDeal(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Deal updated successfully",
    data: result,
  });
});

const deleteDeal = catchAsync(async (req, res) => {
  const result = await DealService.deleteDeal(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: null,
  });
});

const createInvoice = catchAsync(async (req, res) => {
  const result = await DealService.createInvoice(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: "Xero invoice created", data: result });
});

const markInvoiced = catchAsync(async (req, res) => {
  const result = await DealService.markInvoiced(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: "Marked invoiced", data: result });
});

const markPaid = catchAsync(async (req, res) => {
  const result = await DealService.markPaid(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: "Marked paid", data: result });
});

const sendRemittance = catchAsync(async (req, res) => {
  const result = await DealService.sendRemittance(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: "Remittance sent", data: result });
});

const markTalentPaid = catchAsync(async (req, res) => {
  const result = await DealService.markTalentPaid(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: "Talent marked paid", data: result });
});

export const DealController = {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  createInvoice,
  markInvoiced,
  markPaid,
  sendRemittance,
  markTalentPaid,
};
