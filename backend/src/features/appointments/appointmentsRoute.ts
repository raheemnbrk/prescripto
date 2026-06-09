import { Router } from "express";
import { authenticate } from "../../shared/middlewares/authenticate";
import {
  adminCancelAppointment,
  bookAppointment,
  cancelAppointment,
  getAllAppointments,
  getDoctorAppointments,
  getPatientAppointments,
} from "./appointmentsController";
import { authorizeAdmin } from "../../shared/middlewares/authorizeAdmin";
import { authorizeDoctor } from "../../shared/middlewares/authorizeDoctor";

const aptRouter = Router();

aptRouter.post("/book/:docId", authenticate, bookAppointment);
aptRouter.get("/my-appointments", authenticate, getPatientAppointments);
aptRouter.post("/cancel/:id", authenticate, cancelAppointment);

aptRouter.get("/admin/all", authenticate, authorizeAdmin, getAllAppointments);

aptRouter.post(
  "/admin/cancel/:id",
  authenticate,
  authorizeAdmin,
  adminCancelAppointment,
);

aptRouter.get(
  "/doctor/all",
  authenticate,
  authorizeDoctor,
  getDoctorAppointments,
);

export default aptRouter;
