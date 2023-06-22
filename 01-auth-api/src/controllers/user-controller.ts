import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { login, registration } from "../service/user-service.js";

export const signUp = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        success: false,
        error:
          "Password must be between 3 and 15 characters, or you have entered an invalid email (example@gmail.com)",
      });
    }

    const { email, password } = req.body;
    const userData = await registration(email, password);
    res.cookie("refreshToken", userData.data?.refreshToken, {
      httpOnly: true,
    });

    return res.json(userData);
  } catch (error) {
    return res.json({
      success: false,
      error: "Error creating user",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await login(email, password);

    res.cookie("refreshToken", userData.data?.refreshToken, {
      httpOnly: true,
    });

    return res.json(userData);
  } catch (error) {
    return res.json(error);
  }
};
