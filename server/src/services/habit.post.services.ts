import { db } from "../db";
import { Habits } from "../db/schema";
import { and, eq } from "drizzle-orm";
import type { HabitInput } from "../validation/zod_validation.js";
import { AppError } from "../utils/app-error.js";

export const habits_insert_db = async (userId: string, inData: HabitInput) => {
  const existing = await db
    .select({ id: Habits.id })
    .from(Habits)
    .where(and(eq(Habits.userId, userId), eq(Habits.name, inData.name)));

  if (existing.length > 0) {
    throw new AppError("Habit with this name already exists", 409);
  }

  const [result] = await db
    .insert(Habits)
    .values({
      userId,
      name: inData.name,
      description: inData.description,
    })
    .returning({
      id: Habits.id,
      name: Habits.name,
      description: Habits.description,
      createdAt: Habits.createdAt,
    });

  if (!result) {
    throw new AppError("Failed to create habit", 500);
  }

  return result;
};
