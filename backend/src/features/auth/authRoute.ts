import { Router } from "express";
import {
  getMe,
  loginController,
  logout,
  refreshController,
  registerController,
  updateProfile,
} from "./authController";
import { authenticate } from "../../shared/middlewares/authenticate";
import { upload } from "../../shared/config/multer";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/me", authenticate, getMe);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refreshController);
authRouter.post("/update-profile", authenticate , upload.single("image"), updateProfile);

export default authRouter;
