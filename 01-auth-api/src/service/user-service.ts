import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import { generateTokens, saveToken } from "./token-service.js";
import { ISignResponse, IUser } from "../models/user-models.js";

export const registration = async (
  email: string,
  password: string
): Promise<ISignResponse> => {
  const isUsed = await pool.query<IUser>(
    "SELECT * FROM user_schema.users WHERE email = $1",
    [email]
  );

  if (email.length < 1 || password.length < 1) {
    return {
      success: false,
      error: "Enter email or password",
    };
  }

  if (isUsed.rows.length > 0) {
    return {
      success: false,
      error: "Email is busy",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await pool.query<IUser>(
    "INSERT INTO user_schema.users (password, email) VALUES ($1, $2) RETURNING id, email",
    [hashedPassword, email]
  );

  const userId = newUser.rows[0].id;

  const tokens = generateTokens({ userId, email });

  await saveToken(userId, tokens.refreshToken);

  return {
    success: true,
    data: {
      id: userId,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    },
  };
};

export const login = async (
  email: string,
  password: string
): Promise<ISignResponse> => {
  const user = await pool.query<IUser>(
    "SELECT * FROM user_schema.users WHERE email = $1",
    [email]
  );

  if (!user.rows.length) {
    return {
      success: false,
      error: "User with this email was not found",
    };
  }

  if (email.length < 1 || password.length < 1) {
    return {
      success: false,
      error: "Enter email or password",
    };
  }

  const userPassword = user.rows[0].password;
  const userId = user.rows[0].id;

  const isPassEquals = await bcrypt.compare(password, userPassword);

  if (!isPassEquals) {
    return {
      success: false,
      error: "Incorrect password",
    };
  }

  const tokens = generateTokens({ userId, email });

  await saveToken(userId, tokens.refreshToken);

  return {
    success: true,
    data: {
      id: userId,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    },
  };
};
