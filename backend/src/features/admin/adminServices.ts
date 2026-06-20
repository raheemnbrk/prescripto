import prisma from "../../shared/config/prisma";
import { ApiErrors } from "../../shared/utils/ApiErrors";
import { DoctorStatus } from "@prisma/client";

export const getAllDoctorsService = async ({
  search,
  status,
  page,
  limit,
}: {
  search?: string;
  status?: DoctorStatus;
  page: number;
  limit: number;
}) => {
  const skip = (page - 1) * limit;

  const where = {
    ...(status && { status }),
    ...(search && {
      OR: [
        { user: { name: { contains: search, mode: "insensitive" as const } } },
        { specialization: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [doctors, total] = await Promise.all([
    prisma.doctor.findMany({
      where,
      skip,
      take: limit,
      include: { user: { select: { name: true, email: true, image: true } } },
    }),
    prisma.doctor.count({ where }),
  ]);

  return {
    doctors: doctors.map(({ user, ...doctor }) => ({
      ...doctor,
      name: user.name,
      email: user.email,
      image: user.image,
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const approveDoctorService = async (id: string) => {
  const existing = await prisma.doctor.findUnique({ where: { userId: id } });
  if (!existing) throw new ApiErrors(404, "Doctor not found.");

  await prisma.doctor.update({
    where: { userId: id },
    data: { status: "APPROVED" },
  });
};

export const rejectDoctorService = async (id: string) => {
  const existing = await prisma.doctor.findUnique({ where: { userId: id } });
  if (!existing) throw new ApiErrors(404, "Doctor not found.");

  await prisma.doctor.update({
    where: { userId: id },
    data: { status: "REJECTED" },
  });
};

export const getAllUsers = async ({
  search,
  limit,
  page,
}: {
  search?: string;
  limit: number;
  page: number;
}) => {
  const skip = (page - 1) * limit;
  const where = {
    ...(search && { name: { contains: search, mode: "insensitive" as const } }),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      omit: { password: true },
    }),
    prisma.user.count({ where }),
  ]);

  return { users, total, page, totalPage: Math.ceil(total / page) };
};

export const deleteUser = async (id: string) => {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new ApiErrors(404, "User not found");
  await prisma.user.delete({ where: { id } });
};

export const getAdminStats = async () => {
  const [totalDoctors, totalPatients, totalAppointments, pendingDoctors] =
    await Promise.all([
      prisma.doctor.count({ where: { status: "APPROVED" } }),
      prisma.user.count({ where: { role: "PATIENT" } }),
      prisma.appointment.count(),
      prisma.doctor.count({ where: { status: "PENDING" } }),
    ]);

  return { totalDoctors, totalPatients, totalAppointments, pendingDoctors };
};

export const getPendingDoctors = async () => {
  const doctors = await prisma.doctor.findMany({
    where: { status: "PENDING" },
    take: 5,
  });

  return doctors;
};

