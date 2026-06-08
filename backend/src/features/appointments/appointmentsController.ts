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
