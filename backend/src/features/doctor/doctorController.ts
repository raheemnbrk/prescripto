import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../../shared/utils/ApiErrors";
import {
  createDoctorSchema,
  updateDoctorSchema,
} from "../../shared/validators/doctorValidation";
import { applyDoctorService } from "./doctorService";
import * as doctorService from "./doctorService";

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

export const updateDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = updateDoctorSchema.parse((req as any).body);
    const { id } = (req as any).user;

    const result = await doctorService.updateDoctorProfile(
      id,
      data,
      (req as any).file,
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Doctor profile updated Successfully.",
        user: result.user,
      });
  } catch (err) {
    next(err);
  }
};
