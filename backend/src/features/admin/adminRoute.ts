import { Router } from "express";
import { authenticate } from "../../shared/middlewares/authenticate";
import { authorizeAdmin } from "../../shared/middlewares/authorizeAdmin";
import {
  approveDoctor,
  deleteDoctor,
  getAllDoctors,
  rejectDoctor,
} from "./adminControllers";

const adminRouter = Router();

adminRouter.get("/all-doctors", authenticate, authorizeAdmin, getAllDoctors);
adminRouter.post("/approve/:id", authenticate, authorizeAdmin, approveDoctor);
adminRouter.post("/reject/:id", authenticate, authorizeAdmin, rejectDoctor);
adminRouter.delete("/delete/:id", authenticate, authorizeAdmin, deleteDoctor);

export default adminRouter;
