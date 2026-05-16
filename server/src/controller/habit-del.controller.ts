import type { Response, Request } from "express";
import { deleting_habitById } from "../services/habit-del.service";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { AppError } from "../utils/app-error.js";

export async function delete_habits(
  req: AuthRequest,
  res: Response,
  next: (error?: unknown) => void,
): Promise<void> {
  try {
    if (!req.userId) {
      throw new AppError("Authentication required", 401);
    }

    const id = Number(req.params.id);
    await deleting_habitById(req.userId, id);

    res.status(200).json({
      success: true,
      message: "Habit deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
