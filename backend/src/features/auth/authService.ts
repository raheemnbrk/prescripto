import prisma from "../../shared/config/prisma";
import {
  authServiceReturn,
  loginInput,
  payload,
  registerInput,
} from "../../shared/types/authTypes";
import { ApiErrors } from "../../shared/utils/ApiErrors";
import bcrypt from "bcrypt";
import {
  REFRESH_TOKEN_EXPIRES_MS,
  signAccessToken,
  signRefreshToken,
} from "../../shared/utils/jwt";

export const registerService = async (input: registerInput) => {
  const { name, email, password } = input;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new ApiErrors(409, "User already exists.");

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
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
