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

    res.status(200).json({
      success: true,
      message: "Doctor profile updated Successfully.",
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search, filter } = (req as any).query;

    const result = await doctorService.getAllDoctorsService(search, filter);

    return res.status(200).json({ success: true, doctors: result });
  } catch (err) {
    next(err);
  }
};

export const getDoctorByID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    if (!id) throw new ApiErrors(404, "Can't access doctor profile");

    const doctor = await doctorService.getDoctorByIDService(id);

    res.status(200).json({ success: true, doctor });
  } catch (err) {
    next(err);
  }
};

export const getDoctorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).doctor;

    const doctor = await doctorService.getDoctorProfileService(id);

    res.json({ success: true, doctor });
  } catch (err) {
    next(err);
  }
};

export const toggleAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).doctor;
    const availability = req.body.availability as boolean;

    const doctor = await doctorService.toggleAvailabilityService(
      id,
      availability,
    );
    const message = availability
      ? "You are now available"
      : "You are now not available.";
    res.status(200).json({ success: true, message, doctor });
  } catch (err) {
    next(err);
  }
};

export const getAllSpecializationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const specializations = await doctorService.getAllSpecializationService();
    res.status(200).json({ success: true, specializations });
  } catch (err) {
    next(err);
  }
};

export const getRelatedDoctorsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id as string;
  const specialization = req.query.specialization as string;

  const doctors = await doctorService.getRelatedDoctorsService(
    id,
    specialization,
  );

  res.status(200).json({ success: true, doctors });
};
