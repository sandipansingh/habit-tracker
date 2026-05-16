import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { Habits } from "../db/schema";
import { AppError } from "../utils/app-error.js";

export const deleting_habitById = async (
  userId: string,
  habitId: number,
): Promise<boolean> => {
  const deleted = await db
    .delete(Habits)
    .where(and(eq(Habits.id, habitId), eq(Habits.userId, userId)))
    .returning();

  if (deleted.length === 0) {
    throw new AppError("Habit not found", 404);
  }

  return true;
};
