import { Request, Response } from "express";
import { IUrlResponse } from "../interfaces/url-interface.js";
import { isUrl } from "../helpers/funcs.js";
import { redirect, short } from "../services/url-service.js";

export const shortUrl = async (
  req: Request,
  res: Response
): Promise<Response<IUrlResponse>> => {
  try {
    const { originalUrl } = req.body;

    const isBodyUrl = isUrl(originalUrl);

    if (!isBodyUrl) {
      return res.json({
        success: false,
        error: "Invalid URL format",
      });
    }

    const urlData = await short(originalUrl);

    return res.json(urlData);
  } catch (error) {
    return res.json({
      success: false,
      error: error,
    });
  }
};

export const redirectToOriginUrl = async (
  req: Request,
  res: Response
): Promise<void | Response<IUrlResponse>> => {
  try {
    const { shortUrl } = req.params;

    const urlData = await redirect(shortUrl);

    if (!urlData || !urlData.data) {
      return res.json({
        success: false,
        error: "Something went wrong",
      });
    }

    return res.redirect(urlData.data);
  } catch (error) {
    return res.json({
      success: false,
      error: error,
    });
  }
};
