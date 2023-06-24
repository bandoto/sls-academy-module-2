import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  getCurrentUser,
  login,
  refresh,
  registration,
} from "../service/user-service.js";
import { ICustomRequest, ISignResponse } from "../models/user-models.js";

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response<ISignResponse>> => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
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

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response<ISignResponse>> => {
  try {
    const { email, password } = req.body;

    const userData = await login(email, password);

    res.cookie("refreshToken", userData.data?.refreshToken, {
      httpOnly: true,
    });

    return res.json(userData);
  } catch (error) {
    return res.json({
      success: false,
      error: "Error sign in",
    });
  }
};

export const getMe = async (
  req: ICustomRequest,
  res: Response
): Promise<Response<ISignResponse>> => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.json({
        success: false,
        error: "Error get current user",
      });
    }

    const userData = await getCurrentUser(userId);

    return res.json(userData);
  } catch (error) {
    return res.json({
      success: false,
      error: "Error get current user",
    });
  }
};

export const refreshTokens = async (
  req: Request,
  res: Response
): Promise<Response<ISignResponse>> => {
  try {
    const { refreshToken } = req.cookies;

    const userData = await refresh(refreshToken);

    res.cookie("refreshToken", userData.data?.refreshToken, {
      httpOnly: true,
    });

    return res.json(userData);
  } catch (error) {
    return res.json({
      success: false,
      error: "Error refresh",
    });
  }
};
