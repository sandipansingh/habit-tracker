import { eq } from "drizzle-orm";
import { db } from "../db";
import { Habits } from "../db/schema";

export const get_data = async (userId: string) => {
  return db
    .select({
      id: Habits.id,
      name: Habits.name,
      description: Habits.description,
      createdAt: Habits.createdAt,
    })
    .from(Habits)
    .where(eq(Habits.userId, userId));
};
