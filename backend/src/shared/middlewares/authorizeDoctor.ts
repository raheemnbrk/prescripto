import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../utils/ApiErrors";
import prisma from "../config/prisma";

export const authorizeDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req as any;
    if (user.role !== "DOCTOR") throw new ApiErrors(401, "Access denied");

    const doctor = await prisma.doctor.findUnique({
      where: { userId: user.id },
      select: { userId: true, status: true },
    });

    if (!doctor) throw new ApiErrors(403, "Access denied");

    if (doctor?.status !== "APPROVED")
      throw new ApiErrors(403, "Access denied");

    (req as any).doctor = { id: doctor.userId };
    next();
  } catch (err) {
    next(err);
  }
};
