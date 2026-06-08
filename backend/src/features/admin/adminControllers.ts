import { NextFunction, Request, Response } from "express";
import * as adminService from "./adminServices";

export const getAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const search = req.query.search as string | undefined;

    const doctors = await adminService.getAllDoctorsService(search);

    return res.status(200).json({ success: true, doctors });
  } catch (err) {
    next(err);
  }
};

export const approveDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).params;

    await adminService.approveDoctorService(id);

    return res
      .status(200)
      .json({ success: true, message: "Doctor approved successfully." });
  } catch (err) {
    next(err);
  }
};

export const rejectDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).params;

    await adminService.rejectDoctorService(id);

    return res
      .status(200)
      .json({ success: true, message: "Doctor rejected successfully." });
  } catch (err) {
    next(err);
  }
};

export const deleteDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).params;

    await adminService.deleteDoctorService(id);

    return res
      .status(200)
      .json({ success: true, message: "Doctor deleted successfully." });
  } catch (err) {
    next(err);
  }
};
