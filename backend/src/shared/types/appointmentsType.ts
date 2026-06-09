import z from "zod";
import { appointmentFilterSchema, appointmentSchema } from "../validators/appointmentSchema";

export type appointmentInput = z.infer<typeof appointmentSchema>;

export type appointmentFilterInput = z.infer<typeof appointmentFilterSchema>