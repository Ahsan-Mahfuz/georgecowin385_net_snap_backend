import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { ExpenseService } from "./expense.service";

const create = catchAsync(async (req, res) => {
  const result = await ExpenseService.create(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Expense created", data: result });
});

const getAll = catchAsync(async (req, res) => {
  const result = await ExpenseService.getAll(req.query as Record<string, unknown>);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Expenses retrieved",
    meta: result.meta,
    data: result.data,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await ExpenseService.update(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: "Expense updated", data: result });
});

const remove = catchAsync(async (req, res) => {
  const result = await ExpenseService.remove(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: result.message, data: null });
});

export const ExpenseController = { create, getAll, update, remove };
