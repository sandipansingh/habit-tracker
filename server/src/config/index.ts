import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .optional()
    .default("development"),
  PORT: z.coerce.number().int().positive().optional().default(3000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters long"),
  JWT_EXPIRES_IN: z.string().min(1).optional().default("7d"),
  CLIENT_URL: z.string().url("CLIENT_URL must be a valid URL"),
  ALLOWED_ORIGINS: z.string().optional(),
  TRUST_PROXY: z
    .union([z.literal("true"), z.literal("false"), z.string()])
    .optional()
    .default("false"),
  AUTH_RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .default(15 * 60 * 1000),
  AUTH_RATE_LIMIT_MAX: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .default(10),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const issues = parsedEnv.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  throw new Error(`Invalid server environment configuration. ${issues}`);
}

const env = parsedEnv.data;

const allowedOrigins = env.ALLOWED_ORIGINS
  ? env.ALLOWED_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : [env.CLIENT_URL];

export const config = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  jwtSecret: env.JWT_SECRET,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
  clientUrl: env.CLIENT_URL,
  allowedOrigins,
  trustProxy:
    env.TRUST_PROXY === "true"
      ? true
      : Number.isInteger(Number(env.TRUST_PROXY))
        ? Number(env.TRUST_PROXY)
        : false,
  authRateLimitWindowMs: env.AUTH_RATE_LIMIT_WINDOW_MS,
  authRateLimitMax: env.AUTH_RATE_LIMIT_MAX,
} as const;
