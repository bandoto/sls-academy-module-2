import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../db.js";
import { ISignResponse, IValidTokenResponse } from "../models/user-models.js";
import { QueryResult } from "pg";

export const generateTokens = (payload: {
  userId: string;
  email: string;
}): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN!,
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!);

  return {
    accessToken,
    refreshToken,
  };
};

export const validAccessToken = (
  token: string
): JwtPayload | IValidTokenResponse => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as
      | JwtPayload
      | ISignResponse;
  } catch (error) {
    return {
      success: false,
      error: "Cant valid jwt access token",
    };
  }
};

export const validRefreshToken = (
  token: string
): JwtPayload | IValidTokenResponse => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as
      | JwtPayload
      | ISignResponse;
  } catch (error) {
    return {
      success: false,
      error: "Cant valid jwt refresh token",
    };
  }
};

export const saveToken = async (
  userId: string,
  refreshToken: string
): Promise<QueryResult> => {
  return await pool.query(
    "UPDATE user_schema.users SET refresh_token = $1 WHERE id = $2",
    [refreshToken, userId]
  );
};
