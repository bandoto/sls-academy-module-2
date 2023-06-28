import { ObjectId } from "mongoose";

export interface IResponse {
  success: boolean;
  error?: string;
  data?: any;
}

export interface INewJsonFile {
  _id: ObjectId;
  jsonName: string;
  jsonData: any;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IExistBucket {
  bucketName: string;
  jsonFiles: INewJsonFile[];
}
