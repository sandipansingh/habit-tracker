import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";

type ValidationTarget = "body" | "params" | "query";

export const validate =
  <T extends ZodTypeAny>(schema: T, target: ValidationTarget = "body") =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const parsed = schema.parse(req[target]);
    req[target] = parsed;
    next();
  };
