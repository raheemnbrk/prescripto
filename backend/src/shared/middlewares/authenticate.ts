import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../utils/ApiErrors";
import { verifyAccess } from "../utils/jwt";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new ApiErrors(401, "Unauthorized access. Please login again.");

    console.log("Hello")

    const token = authHeader.split(" ")[1];
    const payload = verifyAccess(token);

    (req as any).user = payload;
    next();
  } catch (err) {
    next(err);
  }
};
