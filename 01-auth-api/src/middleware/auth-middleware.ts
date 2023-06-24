import { NextFunction, Response } from "express";
import { validAccessToken } from "../service/token-service.js";
import { ICustomRequest } from "../models/user-models.js";

export const checkIsAuth = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.json({
        success: false,
        error: "No access",
      });
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.json({
        success: false,
        error: "No access",
      });
    }

    const userData = validAccessToken(accessToken);
    if (!userData) {
      return res.json({
        success: false,
        error: "No access",
      });
    }

    req.userId = userData.userId;

    next();
  } catch (error) {
    return res.json({
      success: false,
      error: "No access",
    });
  }
};