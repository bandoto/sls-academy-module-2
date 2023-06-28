import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { MAIN_ROUTE } from "./helpers/constants.js";

import urlRoute from "./routes/url-route.js";

dotenv.config();
const app = express();

// Constants
const PORT = process.env.PORT || 5001;
const DB_URL = process.env.DB_URL!;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(MAIN_ROUTE, urlRoute);

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
