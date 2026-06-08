import { NextFunction, Request, Response } from "express";
import { appointmentSchema } from "../../shared/validators/appointmentSchema";
import * as appointmentService from "./appointmentsService";

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
