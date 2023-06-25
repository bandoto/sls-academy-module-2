import { NextFunction, Response } from "express";
import { validAccessToken } from "../service/token-service.js";
import { ICustomRequest, ISignResponse } from "../models/user-models.js";

export const checkIsAuth = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
): Response<ISignResponse> | void => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.json({
        success: false,
        error: "Missing Authentication Token",
      });
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.json({
        success: false,
        error: "Missing Authentication Token",
      });
    }

    const userData = validAccessToken(accessToken);
    if (!userData) {
      return res.json({
        success: false,
        error: "Missing Authentication Token",
      });
    }

    req.userId = userData.userId;

    next();
  } catch (error) {
    return res.json({
      success: false,
      error: "Missing Authentication Token",
    });
  }
};
