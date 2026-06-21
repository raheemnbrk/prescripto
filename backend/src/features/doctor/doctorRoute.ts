import { Router } from "express";
import { upload } from "../../shared/config/multer";
import {
  applyDoctor,
  getAllDoctors,
  getAllSpecializationController,
  getDoctorByID,
  getDoctorPatients,
  getDoctorProfile,
  getDoctorStats,
  getRelatedDoctorsController,
  getTopDoctors,
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
doctorRouter.get("/all", getAllDoctors);
doctorRouter.get("/profile", authenticate, authorizeDoctor, getDoctorProfile);
doctorRouter.post(
  "/available",
  authenticate,
  authorizeDoctor,
  toggleAvailability,
);
doctorRouter.get("/specializations", getAllSpecializationController);
doctorRouter.get("/top", getTopDoctors);
doctorRouter.get("/patients", authenticate, authorizeDoctor, getDoctorPatients);
doctorRouter.get("/stats", authenticate, authorizeDoctor, getDoctorStats);
doctorRouter.get("/:id", getDoctorByID);
doctorRouter.get("/:id/related", getRelatedDoctorsController);
export default doctorRouter;
