import { Request } from "express";

export interface IUser {
  id: string;
  email: string;
  password: string;
  refresh_token: string | null;
}

export interface ISignResponse {
  success: boolean;
  error?: string;
  data?: {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    email?: string;
  };
}

export interface ICustomRequest extends Request {
  userId?: string;

  // This is needed to solve the warning
  pause: any;
  resume: any;
  setEncoding: any;
  unpipe: any;
  wrap: any;
}

export interface IValidTokenResponse {
  userId: string;
  email: string;
}
