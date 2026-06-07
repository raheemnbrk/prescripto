import prisma from "../../shared/config/prisma";
import { doctorInput } from "../../shared/types/authTypes";
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
