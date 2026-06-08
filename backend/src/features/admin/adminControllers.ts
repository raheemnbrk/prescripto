import { NextFunction, Request, Response } from "express";
import * as adminService from "./adminServices";
import { ApiErrors } from "../../shared/utils/ApiErrors";

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

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const search = req.query.search as string | undefined;
    const users = await adminService.getAllUsers(search);

    res.status(200).json({ success: true, users });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    if (!id) throw new ApiErrors(404, "user not found");

    await adminService.deleteUser(id);

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully." });
  } catch (err) {
    next(err);
  }
};
