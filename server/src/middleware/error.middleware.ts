import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error.js";

const isDuplicateEmailError = (error: unknown): boolean => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const maybeError = error as {
    code?: string;
    cause?: { code?: string; constraint_name?: string };
    constraint_name?: string;
    message?: string;
  };

  return (
    maybeError.code === "23505" ||
    maybeError.cause?.code === "23505" ||
    maybeError.constraint_name === "users_email_unique" ||
    maybeError.cause?.constraint_name === "users_email_unique" ||
    maybeError.message?.includes("users_email_unique") === true
  );
};

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        message: "Validation failed",
        details: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        ...(error.details ? { details: error.details } : {}),
      },
    });
    return;
  }

  if (isDuplicateEmailError(error)) {
    res.status(409).json({
      success: false,
      error: {
        message: "Email already exists",
      },
    });
    return;
  }

  console.error("Unhandled server error", error);

  res.status(500).json({
    success: false,
    error: {
      message: "Internal server error",
    },
  });
};
