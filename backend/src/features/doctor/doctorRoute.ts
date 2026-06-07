import { Router } from "express";
import { upload } from "../../shared/config/multer";
import { applyDoctor } from "./doctorController";

const doctorRoute = Router();

doctorRoute.post("/apply", upload.single("image"), applyDoctor);

export default doctorRoute;
