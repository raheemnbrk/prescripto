import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../../shared/utils/ApiErrors";
import { createDoctorSchema } from "../../shared/validators/doctorValidation";
import { applyDoctorService } from "./doctorService";

export const applyDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) throw new ApiErrors(400, "Image is required.");

    const data = createDoctorSchema.parse(req.body);
    await applyDoctorService(data, req.file);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully. Wait for admin approval.",
    });
  } catch (err) {
    next(err);
  }
};
