import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { UserService } from "./user.service";

const getTeam = catchAsync(async (req, res) => {
  const result = await UserService.getTeam(req.query.portal as string | undefined);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Team retrieved successfully",
    data: result,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const result = await UserService.getUsers(req.query as Record<string, unknown>);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const approveUser = catchAsync(async (req, res) => {
  const result = await UserService.approveUser(req.params.id, req.body.role);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User approved",
    data: result,
  });
});

const rejectUser = catchAsync(async (req, res) => {
  const result = await UserService.rejectUser(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: null,
  });
});

const setStatus = catchAsync(async (req, res) => {
  const result = await UserService.setStatus(req.params.id, req.body.status);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User status updated",
    data: result,
  });
});

const setRole = catchAsync(async (req, res) => {
  const result = await UserService.setRole(req.params.id, req.body.role);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User role updated",
    data: result,
  });
});

export const UserController = { getTeam, getUsers, approveUser, rejectUser, setStatus, setRole };
