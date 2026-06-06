import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../utils/ApiErrors";
import { ZodError } from "zod";

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiErrors) {
    console.log("api Error :", err.message);
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  if (err instanceof ZodError) {
    console.log("api Error :", err.message);
    return res.status(400).json({ success: false, message: err.message });
  }

  console.log("Error message", err.message);
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
};
