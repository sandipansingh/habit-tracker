import { db } from "../db/index";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import { config } from "../config/index.js";
import { AppError } from "../utils/app-error.js";
import type { AuthInput } from "../validation/zod_validation.js";

export const generateToken = (id: string) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as SignOptions["expiresIn"],
  });
};

export const verifyToken = (token: string): { id: string } => {
  try {
    return jwt.verify(token, config.jwtSecret) as { id: string };
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
};

export const loginUser = async ({ email, password }: AuthInput) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await db.select().from(users).where(eq(users.email, normalizedEmail));

  if (!user.length) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user[0].password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user[0].id);

  return {
    user: {
      id: user[0].id,
      email: user[0].email,
    },
    token,
  };
};
