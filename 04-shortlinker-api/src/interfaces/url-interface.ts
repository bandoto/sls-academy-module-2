import { ObjectId } from "mongoose";

export interface IUrlResponse {
  success: boolean;
  error?: string;
  data?: string;
}

export interface IUrl {
  _id: ObjectId;
  originalUrl: string;
  shortedUrl: string;
  __v: number;
}
