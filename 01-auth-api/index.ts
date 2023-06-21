import express from 'express';
import dotenv from 'dotenv';
import {createUserSchema} from "./db.js";
import cors from 'cors';

import authRoute from './routes/auth.js';

dotenv.config();
const app = express();

// Constants
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoute);

const start = async () => {
    try {
        await createUserSchema();
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start();