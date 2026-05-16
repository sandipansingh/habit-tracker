import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"),
});

export const habitFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Habit name must be at least 3 characters")
    .max(80, "Habit name must be at most 80 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be at most 200 characters"),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;
export type HabitFormValues = z.infer<typeof habitFormSchema>;
