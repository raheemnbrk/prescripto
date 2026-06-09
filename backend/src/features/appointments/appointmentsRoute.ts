import { Router } from "express";
import { authenticate } from "../../shared/middlewares/authenticate";
import {
  adminCancelAppointment,
  bookAppointment,
  cancelAppointment,
  getAllAppointments,
  getPatientAppointments,
} from "./appointmentsController";
import { authorizeAdmin } from "../../shared/middlewares/authorizeAdmin";

const aptRouter = Router();

aptRouter.post("/book/:docId", authenticate, bookAppointment);
aptRouter.get("/my-appointments", authenticate, getPatientAppointments);
aptRouter.post("/cancel/:id", authenticate, cancelAppointment);

aptRouter.get(
  "/admin/all-appointments",
  authenticate,
  authorizeAdmin,
  getAllAppointments,
);

aptRouter.post(
  "/admin/cancel/:id",
  authenticate,
  authorizeAdmin,
  adminCancelAppointment,
);

export default aptRouter;
