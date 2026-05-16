import { Router } from "express";
import create_habits from "../controller/habit-post.controller";
import { Get_Req } from "../controller/habit-get.controller";
import { delete_habits } from "../controller/habit-del.controller";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  habitIdParamsSchema,
  habitSchema,
} from "../validation/zod_validation.js";

const router = Router();

router.use(authMiddleware);

router.post("/post", validate(habitSchema), create_habits);

router.get("/get", Get_Req);

router.delete("/del/:id", validate(habitIdParamsSchema, "params"), delete_habits);

export { router };
