import { Router } from "express";
import { authenticate } from "../../shared/middlewares/authenticate";
import { authorizeAdmin } from "../../shared/middlewares/authorizeAdmin";
import {
  approveDoctor,
  deleteUser,
  getAdminStats,
  getAllDoctors,
  getAllUsers,
  getPendingDoctors,
  rejectDoctor,
} from "./adminControllers";

const adminRouter = Router();

adminRouter.get("/all-doctors", authenticate, authorizeAdmin, getAllDoctors);
adminRouter.post("/approve/:id", authenticate, authorizeAdmin, approveDoctor);
adminRouter.post("/reject/:id", authenticate, authorizeAdmin, rejectDoctor);

adminRouter.get("/all-users", authenticate, authorizeAdmin, getAllUsers);
adminRouter.delete("/delete/:id", authenticate, authorizeAdmin, deleteUser);
adminRouter.get("/stats", authenticate, authorizeAdmin, getAdminStats);
adminRouter.get("/pending", authenticate, authorizeAdmin, getPendingDoctors);

export default adminRouter;
