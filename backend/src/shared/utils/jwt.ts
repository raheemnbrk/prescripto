import jwt from "jsonwebtoken";
import { payload } from "../types/authTypes";

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export const signAccessToken = (payload: payload) =>
  jwt.sign(payload, ACCESS_SECRET, { expiresIn: "7d" });

export const signRefreshToken = (payload: payload) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

export const verifyAccess = (token: string) => jwt.verify(token, ACCESS_SECRET);

export const verifyRefresh = (token: string) =>
  jwt.verify(token, REFRESH_SECRET);

export const REFRESH_TOKEN_EXPIRES_MS = 7 * 24 * 60 * 60 * 1000;
