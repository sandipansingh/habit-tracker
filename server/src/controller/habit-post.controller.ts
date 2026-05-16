import type { Response, Request } from "express";
import { habits_insert_db } from "../services/habit.post.services";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { AppError } from "../utils/app-error.js";

export default async function createHabits(
  req: AuthRequest,
  res: Response,
  next: (error?: unknown) => void,
): Promise<void> {
  try {
    if (!req.userId) {
      throw new AppError("Authentication required", 401);
    }

    const habit = await habits_insert_db(req.userId, req.body);

    res.status(201).json({
      success: true,
      message: "Habit created successfully",
      data: habit,
    });
  } catch (error) {
    next(error);
  }
}
