import z from "zod";
import { appointmentSchema } from "../validators/appointmentSchema";

export type appointmentInput = z.infer<typeof appointmentSchema>;
