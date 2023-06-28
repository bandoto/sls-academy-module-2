import { nanoid } from "nanoid";
import Url from "../models/url-model.js";
import { BASE_URL } from "../helpers/constants.js";
import { IUrl, IUrlResponse } from "../interfaces/url-interface.js";

export const short = async (url: string): Promise<IUrlResponse> => {
  const urlShortId = nanoid(5);

  const existUrl = (await Url.findOne({ originalUrl: url })) as IUrl;
  let newUrl;

  if (existUrl) {
    return {
      success: true,
      data: existUrl.shortedUrl,
    };
  } else {
    const fullUrl = `${BASE_URL}/${urlShortId}`;
    newUrl = new Url({
      originalUrl: url,
      shortedUrl: fullUrl,
    } as IUrl);

    await newUrl.save();
  }

  return {
    success: true,
    data: newUrl.shortedUrl,
  };
};

export const redirect = async (url: string): Promise<IUrlResponse> => {
  const fullUrl = `${BASE_URL}/${url}`;

  const existShortUrl = (await Url.findOne({ shortedUrl: fullUrl })) as IUrl;

  if (!existShortUrl) {
    return {
      success: false,
      error: "Url not found",
    };
  }

  return {
    success: true,
    data: existShortUrl.originalUrl,
  };
};
