import prisma from "../../shared/config/prisma";
import { appointmentInput } from "../../shared/types/appointmentsType";
import { ApiErrors } from "../../shared/utils/ApiErrors";

export const bookAppointment = async (
  userId: string,
  docId: string,
  input: appointmentInput,
) => {
  const { date } = input;
  const doctor = await prisma.doctor.findUnique({ where: { userId: docId } });
  if (!doctor) throw new ApiErrors(404, "Doctor not found.");
  if (!doctor.available) throw new ApiErrors(400, "Doctor is not available");
  if (doctor.status !== "APPROVED")
    throw new ApiErrors(400, "Doctor is not approved");

  const slotTime = new Date(date);
  slotTime.setSeconds(0, 0);

  const conflictUser = await prisma.appointment.findFirst({
    where: {
      userId,
      date: {
        gte: new Date(slotTime.getTime() - 60 * 60 * 1000),
        lte: new Date(slotTime.getTime() + 60 * 60 * 1000),
      },
      status: { in: ["COMPLETED", "CONFIRMED", "PENDING"] },
    },
  });

  if (conflictUser)
    throw new ApiErrors(
      409,
      "You already have an appointment within 1 hour of this slot.",
    );

  const existingSLot = await prisma.appointment.findFirst({
    where: {
      docId,
      status: { in: ["CONFIRMED", "COMPLETED", "PENDING"] },
      date: slotTime,
    },
  });

  if (existingSLot) throw new ApiErrors(409, "This slot is already booked.");

  await prisma.appointment.create({
    data: {
      userId,
      docId,
      date: slotTime,
      fees: doctor.fees,
    },
  });
};
