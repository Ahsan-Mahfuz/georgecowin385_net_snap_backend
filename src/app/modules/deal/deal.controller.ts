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

export const DealController = { createDeal, getDeals, getDealById, updateDeal, deleteDeal };
