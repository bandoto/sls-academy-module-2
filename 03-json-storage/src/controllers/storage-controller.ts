import { Request, Response } from "express";
import { IResponse } from "../interfaces/storage-interface.js";
import { getFile, putFile } from "../services/storage-service.js";

export const putJsonFile = async (
  req: Request,
  res: Response
): Promise<Response<IResponse>> => {
  try {
    const { bucketName, jsonName } = req.params;

    if (!bucketName || !jsonName) {
      return res.json({
        success: false,
        error: "Bucket or jsonFile name not found",
      });
    }

    const jsonData = req.body;
    const isJson = JSON.parse(JSON.stringify(jsonData));

    if (Object.keys(isJson).length === 0 || typeof isJson !== "object") {
      return res.json({
        success: false,
        error: "Invalid JSON format",
      });
    }

    const storageData = await putFile(bucketName, jsonName, jsonData);

    return res.json(storageData);
  } catch (error) {
    return res.json({
      success: false,
      error: error,
    });
  }
};

export const getJsonFile = async (
  req: Request,
  res: Response
): Promise<Response<IResponse>> => {
  try {
    const { bucketName, jsonName } = req.params;

    if (!bucketName || !jsonName) {
      return res.json({
        success: false,
        error: "Bucket or jsonFile name not found",
      });
    }

    const storageData = await getFile(bucketName, jsonName);

    return res.json(storageData);
  } catch (error) {
    return res.json({
      success: false,
      error: error,
    });
  }
};
