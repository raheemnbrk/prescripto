import prisma from "../../shared/config/prisma";
import {
  appointmentFilterInput,
  appointmentInput,
} from "../../shared/types/appointmentsType";
import { ApiErrors } from "../../shared/utils/ApiErrors";

export const bookAppointment = async (
  userId: string,
  docId: string,
  input: appointmentInput,
) => {
  const { date } = input;
  const doctor = await prisma.doctor.findUnique({ where: { userId: docId } });
  if (!doctor) throw new ApiErrors(404, "Doctor not found.");
  if (!doctor.available) throw new ApiErrors(400, "Doctor is not available.");
  if (doctor.status !== "APPROVED")
    throw new ApiErrors(400, "Doctor is not approved.");
  if (doctor.userId === userId)
    throw new ApiErrors(400, "You cannot book an appointment with yourself.");

  const slotTime = new Date(date);
  slotTime.setSeconds(0, 0);

  const TWO_HOURS = 2 * 60 * 60 * 1000;

  const conflictUser = await prisma.appointment.findFirst({
    where: {
      userId,
      status: { in: ["PENDING", "CONFIRMED", "COMPLETED"] },
      date: {
        gte: new Date(slotTime.getTime() - TWO_HOURS),
        lte: new Date(slotTime.getTime() + TWO_HOURS),
      },
    },
  });
  if (conflictUser)
    throw new ApiErrors(
      409,
      "You must leave at least 2 hours between appointments.",
    );

  const existingSlot = await prisma.appointment.findFirst({
    where: {
      docId,
      status: { in: ["PENDING", "CONFIRMED"] },
      date: slotTime,
    },
  });
  if (existingSlot) throw new ApiErrors(409, "This slot is already booked.");

  const dayStart = new Date(slotTime);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(slotTime);
  dayEnd.setHours(23, 59, 59, 999);

  const sameDayBooking = await prisma.appointment.findFirst({
    where: {
      userId,
      docId,
      status: { in: ["PENDING", "CONFIRMED"] },
      date: { gte: dayStart, lte: dayEnd },
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

export const getPatientAppointmentsService = async (id: string) => {
  const appointments = await prisma.appointment.findMany({
    where: { userId: id },
    include: {
      doctor: {
        include: {
          user: {
            select: { name: true, image: true },
          },
        },
      },
    },
    orderBy: { date: "desc" },
  });

  return appointments.map(({ doctor, ...apt }) => ({
    ...apt,
    doctorName: doctor.user.name,
    doctorImage: doctor.user.image,
    specialization: doctor.specialization,
  }));
};

export const cancelAppointmentService = async (id: string, userId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appointment) throw new ApiErrors(404, "Appointment not found");
  if (appointment.userId !== userId)
    throw new ApiErrors(403, "Not your appointment.");
  if (appointment.status === "CANCELLED")
    throw new ApiErrors(400, "Appointment already cancelled.");
  if (appointment.status === "COMPLETED")
    throw new ApiErrors(400, "Cannot cancel a completed appointment.");

  const twoHoursBefore = new Date(
    appointment.date.getTime() - 2 * 60 * 60 * 1000,
  );
  if (new Date() > twoHoursBefore)
    throw new ApiErrors(
      400,
      "Cannot cancel an appointment less than 2 hours before.",
    );

  await prisma.appointment.update({
    where: { id },
    data: { status: "CANCELLED" },
  });
};

export const getAllAppointmentsService = async (
  filters: appointmentFilterInput,
  page: number,
  limit: number,
) => {
  const { search, searchBy, date, status } = filters;

  const start = date
    ? new Date(new Date(date).setHours(0, 0, 0, 0))
    : undefined;
  const end = date
    ? new Date(new Date(date).setHours(23, 59, 59, 999))
    : undefined;

  const skip = (page - 1) * limit;

  const where = {
    ...(search &&
      searchBy === "doctor" && {
        doctor: {
          user: { name: { contains: search, mode: "insensitive" as const } },
        },
      }),
    ...(search &&
      searchBy === "user" && {
        user: { name: { contains: search, mode: "insensitive" as const } },
      }),
    ...(status && { status }),
    ...(date && { date: { gte: start, lte: end } }),
  };

  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { date: "desc" },
      include: {
        user: { select: { name: true, image: true } },
        doctor: { include: { user: { select: { name: true, image: true } } } },
      },
    }),
    prisma.appointment.count({ where }),
  ]);

  return {
    appointments: appointments.map(({ user, doctor, ...apt }) => ({
      ...apt,
      patientName: user.name,
      patientImage: user.image,
      doctorName: doctor.user.name,
      doctorImage: doctor.user.image,
      specialization: doctor.specialization,
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const adminCancelAppointments = async (id: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appointment) throw new ApiErrors(404, "Appointment not found");

  if (appointment.status === "CANCELLED")
    throw new ApiErrors(400, "Appointment already cancelled.");
  if (appointment.status === "COMPLETED")
    throw new ApiErrors(400, "Cannot cancel a completed appointment.");

  await prisma.appointment.update({
    where: { id },
    data: { status: "CANCELLED" },
  });
};

export const getDoctorAppointments = async (
  docId: string,
  filters: appointmentFilterInput,
  page: number,
  limit: number,
) => {
  const { search, date, status } = filters;

  const dateFilter = date
    ? {
        gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
        lte: new Date(new Date(date).setHours(23, 59, 59, 999)),
      }
    : undefined;

  const where = {
    docId,
    ...(search && {
      user: {
        name: {
          contains: search,
          mode: "insensitive" as const,
        },
      },
    }),
    ...(status && { status }),
    ...(dateFilter && { date: dateFilter }),
  };

  const skip = (page - 1) * limit;

  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { date: "asc" },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            phoneNumber: true,
            email: true,
          },
        },
      },
    }),
    prisma.appointment.count({ where }),
  ]);

  return {
    appointments: appointments.map(({ user, ...apt }) => ({
      ...apt,
      patientName: user.name,
      patientImage: user.image,
      patientPhone: user.phoneNumber,
      email: user.email,
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const doctorCancelAppointment = async (docId: string, id: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: id, docId: docId },
  });

  if (!appointment) throw new ApiErrors(404, "Appointment doesn't exist");
  if (appointment.status === "CANCELLED")
    throw new ApiErrors(400, "Appointment is already cancelled.");
  if (appointment.status === "COMPLETED")
    throw new ApiErrors(400, "Appointment is already completed.");

  const twoHoursBefore = new Date(
    appointment.date.getTime() - 2 * 60 * 60 * 1000,
  );

  if (new Date() > twoHoursBefore)
    throw new ApiErrors(
      400,
      "Cannot cancel an appointment less than 2 hours before.",
    );

  await prisma.appointment.update({
    where: { id: id, docId: docId },
    data: { status: "CANCELLED" },
  });
};

export const completeAppointmentService = async (id: string, docId: string) => {
  const appointment = await prisma.appointment.findUnique({ where: { id } });

  if (!appointment) throw new ApiErrors(404, "Appointment not found.");
  if (appointment.docId !== docId)
    throw new ApiErrors(403, "Not your appointment.");
  if (appointment.status !== "CONFIRMED")
    throw new ApiErrors(400, "Only confirmed appointments can be completed.");

  const now = new Date();
  if (now < appointment.date)
    throw new ApiErrors(400, "Cannot complete a future appointment.");

  await prisma.appointment.update({
    where: { id },
    data: { status: "COMPLETED" },
  });
};

export const confirmAppointmentService = async (id: string, docId: string) => {
  const appointment = await prisma.appointment.findUnique({ where: { id } });

  if (!appointment) throw new ApiErrors(404, "Appointment not found.");
  if (appointment.docId !== docId)
    throw new ApiErrors(403, "Not your appointment.");
  if (appointment.status !== "PENDING")
    throw new ApiErrors(400, "Only pending appointments can be confirmed.");

  await prisma.appointment.update({
    where: { id },
    data: { status: "CONFIRMED" },
  });
};
