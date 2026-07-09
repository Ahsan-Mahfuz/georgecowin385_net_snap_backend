import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { AuthService } from "./auth.service";

const signUp = catchAsync(async (req, res) => {
  const result = await AuthService.signUp(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Account created — waiting for admin approval",
    data: result,
  });
});

const signIn = catchAsync(async (req, res) => {
  const result = await AuthService.signIn(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Signed in successfully",
    token: result.token,
    data: result.user,
  });
});

const getMe = catchAsync(async (req, res) => {
  const result = await AuthService.getMe(req.user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrieved",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthService.changePassword(
    req.user.userId,
    req.body.currentPassword,
    req.body.newPassword,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: null,
  });
});

export const AuthController = { signUp, signIn, getMe, changePassword };
