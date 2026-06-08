import { Router } from "express";
import { upload } from "../../shared/config/multer";
import {
  applyDoctor,
  getAllDoctors,
  getDoctorByID,
  getDoctorProfile,
  updateDoctor,
} from "./doctorController";
import { authenticate } from "../../shared/middlewares/authenticate";
import { authorizeDoctor } from "../../shared/middlewares/authorizeDoctor";

const doctorRoute = Router();

doctorRoute.post("/apply", upload.single("image"), applyDoctor);
doctorRoute.post(
  "/update",
  authenticate,
  authorizeDoctor,
  upload.single("image"),
  updateDoctor,
);
doctorRoute.get("/all-doctors", getAllDoctors);
doctorRoute.get("/profile", authenticate, authorizeDoctor, getDoctorProfile);
doctorRoute.get("/:id", getDoctorByID);
export default doctorRoute;
