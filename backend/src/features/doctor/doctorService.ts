import prisma from "../../shared/config/prisma";
import { doctorInput, updateDoctorInput } from "../../shared/types/authTypes";
import { ApiErrors } from "../../shared/utils/ApiErrors";
import { uploadImage } from "../../shared/utils/uploadImage";
import bcrypt from "bcrypt";

export const applyDoctorService = async (
  input: doctorInput,
  file: Express.Multer.File,
) => {
  const {
    name,
    email,
    password,
    specialization,
    experience,
    fees,
    about,
    degree,
    address,
  } = input;

  const existing = await prisma.doctor.findFirst({
    where: {
      user: {
        email,
      },
    },
  });

  if (existing) throw new ApiErrors(409, "email already in use!");

  const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  const imageUrl = await uploadImage(base64, "prescripto/doctors");

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: "DOCTOR",
      image: imageUrl,
      doctor: {
        create: { specialization, experience, fees, about, degree, address },
      },
    },
    include: { doctor: true },
  });
};

export const updateDoctorProfile = async (
  id: string,
  input: updateDoctorInput,
  file: Express.Multer.File,
) => {
  const existing = await prisma.user.findUnique({
    where: { id },
    include: { doctor: true },
  });
  if (!existing) throw new ApiErrors(404, "Access denied , please login");
  if (!existing.doctor)
    throw new ApiErrors(404, "Access denied , please login");

  const {
    name,
    phoneNumber,
    dob,
    gender,
    specialization,
    experience,
    fees,
    about,
    degree,
    address,
    available,
  } = input;

  let imageUrl: string | undefined;
  if (file) {
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    imageUrl = await uploadImage(base64, "prescripto/users");
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(dob && { dob }),
      ...(gender && { gender }),
      ...(phoneNumber && { phoneNumber }),
      ...(imageUrl && { image: imageUrl }),
      doctor: {
        update: {
          ...(fees && { fees }),
          ...(experience && { experience }),
          ...(degree && { degree }),
          ...(specialization && { specialization }),
          ...(about && { about }),
          ...(address && { address }),
          ...(available && { available }),
        },
      },
    },
    include: { doctor: true },
  });

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword };
};

export const getAllDoctorsService = async (
  search?: string,
  filter?: string,
) => {
  const doctors = await prisma.doctor.findMany({
    where: {
      ...(filter && { specialization: filter }),
      status: "APPROVED",
      ...(search && {
        user: { name: { contains: search, mode: "insensitive" } },
      }),
    },
    include: { user: { select: { name: true, email: true, image: true } } },
  });

  return doctors.map(({ user, ...doctor }) => ({
    name: user.name,
    email: user.email,
    image: user.image,
    ...doctor,
  }));
};

export const getDoctorByIDService = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: { userId: id },
    include: { user: { select: { name: true, email: true, image: true } } },
  });

  if (!doctor) throw new ApiErrors(404, "Doctor not found.");
  const { user, ...rest } = doctor;
  return { ...rest, ...user };
};

export const getDoctorProfileService = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: { userId: id },
    include: { user: { omit: { password: true } } },
  });

  if (!doctor) throw new ApiErrors(404, "Access denied,please login again");

  const { user, ...rest } = doctor;
  return { ...rest, ...user };
};

export const toggleAvailabilityService = async (
  id: string,
  availability: boolean,
) => {
  const doctor = await prisma.doctor.update({
    where: { userId: id },
    data: { available: availability },
    include: { user: { omit: { password: true } } },
  });

  if (!doctor) throw new ApiErrors(404, "Access denied.please login again");

  const { user, ...rest } = doctor;
  return { ...rest, ...user };
};
