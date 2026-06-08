import { Router } from "express";
import { upload } from "../../shared/config/multer";
import {
  applyDoctor,
  getAllDoctors,
  getDoctorByID,
  getDoctorProfile,
  toggleAvailability,
  updateDoctor,
} from "./doctorController";
import { authenticate } from "../../shared/middlewares/authenticate";
import { authorizeDoctor } from "../../shared/middlewares/authorizeDoctor";

const doctorRouter = Router();

doctorRouter.post("/apply", upload.single("image"), applyDoctor);
doctorRouter.post(
  "/update",
  authenticate,
  authorizeDoctor,
  upload.single("image"),
  updateDoctor,
);
doctorRouter.get("/all-doctors", getAllDoctors);
doctorRouter.get("/profile", authenticate, authorizeDoctor, getDoctorProfile);
doctorRouter.post(
  "/available",
  authenticate,
  authorizeDoctor,
  toggleAvailability,
);
doctorRouter.get("/:id", getDoctorByID);
export default doctorRouter;
