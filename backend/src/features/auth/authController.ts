import { NextFunction, Request, Response } from "express";
import {
  loginSchema,
  registerSchema,
} from "../../shared/validators/authValidation";
import * as authService from "./authService";
import { authServiceReturn } from "../../shared/types/authTypes";
import { REFRESH_TOKEN_EXPIRES_MS } from "../../shared/utils/jwt";
import prisma from "../../shared/config/prisma";

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

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_EXPIRES_MS,
    });

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

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_EXPIRES_MS,
    });

    res.status(201).json({
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req as any;

    const result = await authService.getUserService(user.id);

    res.status(200).json({ success: true, result });
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
