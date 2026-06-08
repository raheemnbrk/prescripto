import { Router } from "express";
import { authenticate } from "../../shared/middlewares/authenticate";
import {
  bookAppointment,
  cancelAppointment,
  getPatientAppointments,
} from "./appointmentsController";

const aptRouter = Router();

aptRouter.post("/book/:docId", authenticate, bookAppointment);
aptRouter.get("/my-appointments", authenticate, getPatientAppointments);
aptRouter.post("/cancel/:id", authenticate, cancelAppointment);

export default aptRouter;
