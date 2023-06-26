export interface ILocationResponse {
  success: boolean;
  error?: string;
  data?: {
    from?: string;
    to?: string;
    country?: string;
  };
}

export interface ICountryInfo {
  fromIp: string;
  toIp: string;
  id: string;
  country: string;
}
