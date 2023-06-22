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
    id: string;
    accessToken: string;
    refreshToken: string;
  };
}
