import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MAIN_ROUTE } from "./helpers/constants.js";
import locationRoute from "./routes/location-route.js";

dotenv.config();
const app = express();

// Constants
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(MAIN_ROUTE, locationRoute);

const start = async (): Promise<void> => {
  try {
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
