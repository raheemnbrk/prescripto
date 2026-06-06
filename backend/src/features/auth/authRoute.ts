import { Router } from "express";
import {
  getUser,
  loginController,
  logout,
  refreshController,
  registerController,
} from "./authController";
import { authenticate } from "../../shared/middlewares/authenticate";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/get-user", authenticate, getUser);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refreshController);

export default authRouter;
