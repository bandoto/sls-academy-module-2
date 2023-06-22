import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createUserSchema } from "./db.js";
import { AUTH_ROUTE } from "./helpers/constants.js";

import authRoute from "./routes/auth-route.js";

dotenv.config();
const app = express();

// Constants
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(AUTH_ROUTE, authRoute);

const start = async () => {
  try {
    await createUserSchema();
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
