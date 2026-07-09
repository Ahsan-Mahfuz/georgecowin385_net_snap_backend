import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { CollectiveDealService } from "./collectiveDeal.service";

const createDeal = catchAsync(async (req, res) => {
  const result = await CollectiveDealService.createDeal(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Collective deal created successfully",
    data: result,
  });
});

const getDeals = catchAsync(async (req, res) => {
  const result = await CollectiveDealService.getDeals(req.query as Record<string, unknown>);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Collective deals retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getDealById = catchAsync(async (req, res) => {
  const result = await CollectiveDealService.getDealById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Collective deal retrieved successfully",
    data: result,
  });
});

const updateDeal = catchAsync(async (req, res) => {
  const result = await CollectiveDealService.updateDeal(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Collective deal updated successfully",
    data: result,
  });
});

const deleteDeal = catchAsync(async (req, res) => {
  const result = await CollectiveDealService.deleteDeal(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: null,
  });
});

export const CollectiveDealController = {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
};
