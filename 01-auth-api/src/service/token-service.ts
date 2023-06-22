import jwt from "jsonwebtoken";
import { pool } from "../db.js";

export const generateTokens = (payload: { userId: string; email: string }) => {
  const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN,
  });
  const refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET);

  return {
    accessToken,
    refreshToken,
  };
};

export const validAccessToken = (token: string) => {
  try {
    const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return user;
  } catch (error) {
    return {
      success: false,
      error: "Cant valid jwt access token",
    };
  }
};

export const validRefreshToken = (token: string) => {
  try {
    const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return user;
  } catch (error) {
    return {
      success: false,
      error: "Cant valid jwt refresh token",
    };
  }
};

export const saveToken = async (userId: string, refreshToken: string) => {
  return await pool.query(
    "UPDATE user_schema.users SET refresh_token = $1 WHERE id = $2",
    [refreshToken, userId]
  );
};
