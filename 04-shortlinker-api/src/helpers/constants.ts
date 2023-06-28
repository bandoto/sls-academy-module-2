import dotenv from "dotenv";

dotenv.config();

export const MAIN_ROUTE = "/";
export const SHORT_ROUTE = "/short";
export const REDIRECT_ROUTE = "/:shortUrl";
export const BASE_URL = `http://localhost:${process.env.PORT || 5001}`;
