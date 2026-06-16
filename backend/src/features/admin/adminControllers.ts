import { NextFunction, Request, Response } from "express";
import * as adminService from "./adminServices";
import { ApiErrors } from "../../shared/utils/ApiErrors";
import { DoctorStatus } from "@prisma/client";

export const getAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const search = req.query.search as string | undefined;
    const status = req.query.status as DoctorStatus | undefined;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await adminService.getAllDoctorsService({
      search: search || undefined,
      status: status || undefined,
      page,
      limit,
    });

    return res.status(200).json({ success: true, ...result });
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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await adminService.getAllUsers({ search, limit, page });

    res.status(200).json({ success: true, ...result });
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
