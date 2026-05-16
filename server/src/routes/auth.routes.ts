import { Router } from "express";
import { loginUser } from "../auth/login.service.js";
import { registerUser } from "../auth/register.service.js";
import { authRateLimit } from "../middleware/rate-limit.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { authLoginSchema, authRegisterSchema } from "../validation/zod_validation.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  authRateLimit,
  validate(authRegisterSchema),
  async (req, res, next) => {
    try {
      const user = await registerUser(req.body);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

authRouter.post("/login", authRateLimit, validate(authLoginSchema), async (req, res, next) => {
  try {
    const data = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data,
    });
  } catch (error) {
    next(error);
  }
});
