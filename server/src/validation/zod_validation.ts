import { z } from "zod";

const trimmedString = z.string().trim();

export const authBaseSchema = z.object({
  email: trimmedString.email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"),
});

export const authRegisterSchema = authBaseSchema;
export const authLoginSchema = authBaseSchema;

export const habitSchema = z.object({
  name: trimmedString.min(3, "Name must be at least 3 characters").max(
    80,
    "Name must be less than 80 characters",
  ),
  description: trimmedString
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be less than 200 characters"),
});

export const habitIdParamsSchema = z.object({
  id: z.coerce.number().int().positive("Habit ID must be a positive integer"),
});

export type AuthInput = z.infer<typeof authBaseSchema>;
export type HabitInput = z.infer<typeof habitSchema>;
