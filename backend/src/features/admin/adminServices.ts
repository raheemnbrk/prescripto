import prisma from "../../shared/config/prisma";
import { ApiErrors } from "../../shared/utils/ApiErrors";

export const getAllDoctorsService = async (search?: string) => {
  const doctors = await prisma.doctor.findMany({
    where: {
      ...(search && {
        OR: [
          { user: { name: { contains: search, mode: "insensitive" } } },
          { specialization: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: { user: { select: { name: true, email: true, image: true } } },
  });

  return doctors.map(({ user, ...doctor }) => ({
    ...doctor,
    name: user.name,
    email: user.email,
    image: user.image,
  }));
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

export const deleteDoctorService = async (id: string) => {
  const existing = await prisma.doctor.findUnique({ where: { userId: id } });
  if (!existing) throw new ApiErrors(404, "Doctor not found.");

  await prisma.user.delete({ where: { id } });
};
