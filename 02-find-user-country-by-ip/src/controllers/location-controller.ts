import { Request, Response } from "express";
import { location } from "../service/location-service.js";
import { ILocationResponse } from "../models/location-models.js";

export const locationByIP = async (
  req: Request,
  res: Response
): Promise<Response<ILocationResponse>> => {
  try {
    const { ip } = req.body;

    if (!ip) {
      return res.json({
        success: false,
        error: "Enter ip",
      });
    }

    const locationData = await location(ip);

    return res.json(locationData);
  } catch (error) {
    return res.json({
      success: false,
      error: "Error creating user",
    });
  }
};

export const myLocation = async (
  req: Request,
  res: Response
): Promise<Response<ILocationResponse>> => {
  try {
    let locationData: ILocationResponse;

    const userIp =
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"] ||
      req.headers["cf-connecting-ip"] ||
      req.headers["true-client-ip"] ||
      req.headers["x-cluster-client-ip"] ||
      req.ip;

    if (Array.isArray(userIp)) {
      locationData = await location(userIp[0]);
    } else {
      locationData = await location(userIp);
    }

    return res.json(locationData);
  } catch (error) {
    return res.json({
      success: false,
      error: "Error creating user",
    });
  }
};
