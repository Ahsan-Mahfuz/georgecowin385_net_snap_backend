import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "../error/appError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  let message = err.message || "Internal Server Error";
  let errorMessages = [{ path: "", message }];

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    errorMessages = Object.values(err.errors).map((el: any) => ({
      path: el.path,
      message: el.message,
    }));
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Cast Error";
    errorMessages = [{ path: err.path, message: "Invalid ID format" }];
  } else if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate Entry";
    const field = Object.keys(err.keyValue || {})[0] || "";
    errorMessages = [{ path: field, message: `${field} already exists` }];
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errorMessages = err.errors.map((error: any) => ({
      path: error.path.join("."),
      message: error.message,
    }));
    // Surface the first field message so the frontend can show something useful.
    message = errorMessages[0]?.message || message;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorMessages,
  });
};

export default errorMiddleware;
