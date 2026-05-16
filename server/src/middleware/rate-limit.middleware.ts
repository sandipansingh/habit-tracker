import { rateLimit } from "express-rate-limit";
import { config } from "../config/index.js";

export const authRateLimit = rateLimit({
  windowMs: config.authRateLimitWindowMs,
  limit: config.authRateLimitMax,
  identifier: "auth",
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (req, res) => {
    const rateLimitState = req as typeof req & {
      rateLimit?: {
        resetTime?: Date;
      };
    };

    const retryAfter =
      rateLimitState.rateLimit?.resetTime instanceof Date
        ? Math.max(
            1,
            Math.ceil((rateLimitState.rateLimit.resetTime.getTime() - Date.now()) / 1000),
          )
        : Math.ceil(config.authRateLimitWindowMs / 1000);

    res.status(429).json({
      success: false,
      error: {
        message: "Too many authentication attempts. Please try again later.",
        details: {
          retryAfterSeconds: retryAfter,
        },
      },
    });
  },
});
