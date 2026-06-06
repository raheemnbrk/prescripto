import { Router } from "express";
import { getUser, loginController, registerController } from "./authController";
import { authenticate } from "../../shared/middlewares/authenticate";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/get-user", authenticate, getUser);

export default authRouter;
