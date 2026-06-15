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

export const getAllUsers = async (search?: string) => {
  const users = await prisma.user.findMany({
    where: {
      ...(search && {
        OR: [{ name: { contains: search, mode: "insensitive" } }],
      }),
    },
    omit: { password: true },
  });

  return users;
};

export const deleteUser = async (id: string) => {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new ApiErrors(404, "User not found");
  await prisma.user.delete({ where: { id } });
};
