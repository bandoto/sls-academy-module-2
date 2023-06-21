import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";
import { Request, Response } from "express";

interface IUser {
  id: string;
  email: string;
  password: string;
  refresh_token: string | null;
}

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const isUsed = await pool.query<IUser>(
      "SELECT * FROM user_schema.users WHERE email = $1",
      [email]
    );

    if (email.length < 1 || password.length < 1) {
      return res.json({
        message: "Enter email or password",
      });
    }

    if (isUsed.rows.length > 0) {
      return res.json({
        message: "Email is busy",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query<IUser>(
      "INSERT INTO user_schema.users (password, email) VALUES ($1, $2) RETURNING id, email",
      [hashedPassword, email]
    );

    const userId = newUser.rows[0].id;

    const accessToken = jwt.sign({ id: userId }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN,
    });

    const refreshToken = jwt.sign({ id: userId }, process.env.TOKEN_SECRET);

    await pool.query(
      "UPDATE user_schema.users SET refresh_token = $1 WHERE id = $2",
      [refreshToken, userId]
    );

    return res.json({
      userId,
      accessToken,
      refreshToken,
      message: "Registration completed successfully",
    });
  } catch (error) {
    return res.json({
      message: "Error creating user",
    });
  }
};

export const signIn = (req, res) => {
  // try {
  //   console.log("signIn");
  // } catch (error) {
  //   console.log(error);
  // }
};
