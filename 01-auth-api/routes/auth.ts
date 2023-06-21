import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.js";

const router = Router();

// Register
router.post('/sign-up', signUp);

// Login
router.post('/sign-in', signIn);

// CheckAuth
// router.get('/me')

export default router;