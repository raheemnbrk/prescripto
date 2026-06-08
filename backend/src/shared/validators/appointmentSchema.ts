import z, { date } from "zod";

export const appointmentSchema = z.object({
  date: z.coerce
    .date({ message: "Valid date is required" })
    .refine((date) => {
      const minute = date.getMinutes();
      return minute === 0 || minute === 30;
    }, "Appointments must be at :00 or :30 only.")
    .refine((date) => {
      return date.getTime() > Date.now() + 60 * 60 * 1000;
    }, "Appointment must be one hour from now.")
    .refine((date) => {
      const hour = date.getHours();
      return hour >= 9 && hour <= 17;
    }, "Appointments must be between 9:00 AM and 5:00 PM.")
    .refine((date) => {
      const day = date.getDay();
      return day !== 5;
    }, "Can't book an appointment in weekend"),
});
