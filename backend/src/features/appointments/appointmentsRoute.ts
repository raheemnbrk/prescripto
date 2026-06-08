import { Router } from "express";
import { authenticate } from "../../shared/middlewares/authenticate";
import { bookAppointment } from "./appointmentsController";

const aptRouter = Router();

aptRouter.post("/book/:docId", authenticate, bookAppointment);

export default aptRouter;
