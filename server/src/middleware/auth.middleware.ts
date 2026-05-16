import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../auth/login.service.js";
import { AppError } from "../utils/app-error.js";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication required", 401);
    }

    const token = authHeader.substring(7);

    if (!token) {
      throw new AppError("Authentication token is missing", 401);
    }

    const decoded = verifyToken(token);
    req.userId = decoded.id;

    next();
  } catch (error) {
    next(
      error instanceof AppError
        ? error
        : new AppError("Invalid or expired authentication token", 401),
    );
  }
};
