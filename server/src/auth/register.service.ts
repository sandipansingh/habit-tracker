import bcrypt from "bcrypt";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { AppError } from "../utils/app-error.js";
import type { AuthInput } from "../validation/zod_validation.js";

const SALT_ROUNDS = 12;

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

export const registerUser = async ({ email, password }: AuthInput) => {
  try {
    const hashedPassword = await hashPassword(password);
    const normalizedEmail = email.trim().toLowerCase();

    const [user] = await db
      .insert(users)
      .values({
        email: normalizedEmail,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        createdAt: users.createdAt,
      });

    return user;
  } catch (error) {
    if (isDuplicateEmailError(error)) {
      throw new AppError("Email already exists", 409);
    }

    throw error;
  }
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};
