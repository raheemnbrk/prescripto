import prisma from "../../shared/config/prisma";
import {
  authServiceReturn,
  loginInput,
  payload,
  registerInput,
  updateProfileInput,
} from "../../shared/types/authTypes";
import { ApiErrors } from "../../shared/utils/ApiErrors";
import bcrypt from "bcrypt";
import {
  REFRESH_TOKEN_EXPIRES_MS,
  signAccessToken,
  signRefreshToken,
} from "../../shared/utils/jwt";
import { uploadImage } from "../../shared/utils/uploadImage";
import { Role } from "@prisma/client";

export const registerService = async (input: registerInput) => {
  const { name, email, password } = input;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new ApiErrors(409, "User already exists.");

  const hashed = await bcrypt.hash(password, 10);

  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim()) ?? [];

  const role: Role = adminEmails.includes(email) ? "ADMIN" : "PATIENT";

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role,
    },
  });

  const payload: payload = { id: user.id, role: user.role };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
    },
  });

  const { password: _, ...userWithoutPassword } = user;
  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  } as authServiceReturn;
};

export const loginService = async (input: loginInput) => {
  const { email, password } = input;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiErrors(401, "Invalid credentials.");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new ApiErrors(401, "Invalid credentials");

  const payload: payload = { id: user.id, role: user.role };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
    },
  });

  const { password: _, ...userWithoutPassword } = user;

  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  } as authServiceReturn;
};

export const getUserService = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new ApiErrors(404, "User not found!");
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const refreshService = async (token: string) => {
  const stored = await prisma.refreshToken.findFirst({
    where: { token },
    include: { user: true },
  });
  if (!stored || stored.expiresAt < new Date())
    throw new ApiErrors(401, "Unauthorized access. Please login again.");
  if (stored.isRevoked) {
    await prisma.refreshToken.updateMany({
      where: { userId: stored.userId },
      data: { isRevoked: true },
    });
    throw new ApiErrors(401, "Unauthorized access. Please login again.");
  }

  const payload: payload = { id: stored.userId, role: stored.user.role };

  const newAccessToken = signAccessToken(payload);
  const newRefreshToken = signRefreshToken(payload);

  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: { isRevoked: true, replacedBy: newRefreshToken },
  });

  await prisma.refreshToken.create({
    data: {
      token: newRefreshToken,
      userId: stored.user.id,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
    },
  });

  await prisma.refreshToken.deleteMany({
    where: { userId: stored.user.id, expiresAt: { lt: new Date() } },
  });

  const user = await prisma.user.findUnique({
    where: { id: stored.userId },
    omit: { password: true },
  });

  return { user, newAccessToken, newRefreshToken };
};

export const updateProfileService = async (
  id: string,
  input: updateProfileInput,
  file?: Express.Multer.File,
) => {
  const { name, dob, gender, phoneNumber } = input;

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
    },
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
