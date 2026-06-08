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
      status: { in: ["PENDING", "CONFIRMED"] },
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
      status: { in: ["PENDING", "CONFIRMED"] },
      date: slotTime,
    },
  });

  if (existingSLot) throw new ApiErrors(409, "This slot is already booked.");

  const sameDayBooking = await prisma.appointment.findFirst({
    where: {
      userId,
      docId,
      status: { in: ["PENDING", "CONFIRMED"] },
      date: {
        gte: new Date(slotTime.setHours(0, 0, 0, 0)),
        lte: new Date(slotTime.setHours(23, 59, 59, 999)),
      },
    },
  });
  if (sameDayBooking)
    throw new ApiErrors(
      409,
      "You already have an appointment with this doctor today.",
    );

  await prisma.appointment.create({
    data: {
      userId,
      docId,
      date: slotTime,
      fees: doctor.fees,
    },
  });
};
