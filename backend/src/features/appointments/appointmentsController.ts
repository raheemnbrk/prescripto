import { NextFunction, Request, Response } from "express";
import {
  appointmentFilterSchema,
  appointmentSchema,
} from "../../shared/validators/appointmentSchema";
import * as appointmentService from "./appointmentsService";
import { ApiErrors } from "../../shared/utils/ApiErrors";

export const bookAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id as string;
    const docId = req.params.docId as string;
    const data = appointmentSchema.parse(req.body);

    await appointmentService.bookAppointment(userId, docId, data);

    return res
      .status(201)
      .json({ success: true, message: "Appointment booked successfully." });
  } catch (err) {
    next(err);
  }
};

export const getPatientAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = (req as any).user.id as string;

    const appointments =
      await appointmentService.getPatientAppointmentsService(id);

    return res.status(200).json({ success: true, appointments });
  } catch (err) {
    next(err);
  }
};

export const cancelAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).user.id;

    await appointmentService.cancelAppointmentService(id, userId);

    return res
      .status(200)
      .json({ success: true, message: "appointment cancelled successfully." });
  } catch (err) {
    next(err);
  }
};

export const getAllAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const filters = appointmentFilterSchema.parse(req.query);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await appointmentService.getAllAppointmentsService(
      filters,
      page,
      limit,
    );
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const adminCancelAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    if (!id) throw new ApiErrors(400, "Can't find an appointment");

    await appointmentService.adminCancelAppointments(id);

    return res
      .status(201)
      .json({ success: true, message: "Appointment cancelled successfully." });
  } catch (err) {
    next(err);
  }
};

export const getDoctorAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const filters = appointmentFilterSchema.parse(req.query);
    const docId = (req as any).user.id as string;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await appointmentService.getDoctorAppointments(
      docId,
      filters,
      page,
      limit,
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

export const doctorCancelAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    if (!id) throw new ApiErrors(400, "Can't find an appointment");

    const docId = (req as any).doctor.id as string;

    await appointmentService.doctorCancelAppointment(id, docId);

    return res
      .status(201)
      .json({ success: true, message: "Appointment cancelled successfully." });
  } catch (err) {
    next(err);
  }
};

export const confirmAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const docId = (req as any).user.id as string;
    await appointmentService.confirmAppointmentService(id, docId);
    res.status(200).json({ success: true, message: "Appointment confirmed." });
  } catch (err) {
    next(err);
  }
};

export const completeAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const docId = (req as any).user.id as string;
    await appointmentService.completeAppointmentService(id, docId);
    res.status(200).json({ success: true, message: "Appointment completed." });
  } catch (err) {
    next(err);
  }
};
