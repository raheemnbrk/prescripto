import express from "express";
import authRouter from "./features/auth/authRoute";
import cookieParser from "cookie-parser";
import { errorHandler } from "./shared/middlewares/errorHandler";
import doctorRouter from "./features/doctor/doctorRoute";
import adminRouter from "./features/admin/adminRoute";
import aptRouter from "./features/appointments/appointmentsRoute";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/appointments", aptRouter);

app.use(errorHandler);

export default app;
