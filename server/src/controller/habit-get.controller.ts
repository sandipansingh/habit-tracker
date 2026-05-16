import type { Response, Request } from "express";
import { get_data } from "../services/habit-get.services";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { AppError } from "../utils/app-error.js";

export async function Get_Req(
  req: AuthRequest,
  res: Response,
  next: (error?: unknown) => void,
): Promise<void> {
  try {
    if (!req.userId) {
      throw new AppError("Authentication required", 401);
    }

    const habits = await get_data(req.userId);

    res.status(200).json({
      success: true,
      data: habits,
    });
  } catch (error) {
    next(error);
  }
}
