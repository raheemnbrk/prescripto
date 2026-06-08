import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../utils/ApiErrors";

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user } = req as any;

  if (!user || user.role !== "ADMIN")
    throw new ApiErrors(403, "Access denied.");

  next();
};
