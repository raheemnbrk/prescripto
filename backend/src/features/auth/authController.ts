import { NextFunction, Request, Response } from "express";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "../../shared/validators/authValidation";
import * as authService from "./authService";
import { authServiceReturn } from "../../shared/types/authTypes";
import { REFRESH_TOKEN_EXPIRES_MS } from "../../shared/utils/jwt";
import prisma from "../../shared/config/prisma";
import { ApiErrors } from "../../shared/utils/ApiErrors";
import { success } from "zod";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? ("strict" as const)
      : ("lax" as const),
  maxAge: REFRESH_TOKEN_EXPIRES_MS,
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const result: authServiceReturn = await authService.registerService({
      name,
      email,
      password,
    });

    res.cookie("refreshToken", result.refreshToken, cookieOptions);

    return res.status(201).json({
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const result: authServiceReturn = await authService.loginService({
      email,
      password,
    });

    res.cookie("refreshToken", result.refreshToken, cookieOptions);

    res.status(201).json({
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).user;
    const user = await authService.getUserService(id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = (req as any).cookies;

    if (refreshToken) {
      await prisma.refreshToken.updateMany({
        where: { token: refreshToken },
        data: { isRevoked: true },
      });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

export const refreshController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = (req as any).cookies.refreshToken;

    if (!token)
      throw new ApiErrors(401, "Unauthorized access. Please login again.");

    const result = await authService.refreshService(token);

    res.cookie("refreshToken", result.newRefreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      user: result.user,
      accessToken: result.newAccessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = updateProfileSchema.parse((req as any).body);
    const { id } = (req as any).user;
    const file = (req as any).file;

    const result = await authService.updateProfileService(id, data, file);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
};
