import { Router } from "express";
import { body } from "express-validator";
import { signUp, signIn } from "../controllers/user-controller.js";
import { SIGNIN_ROUTE, SIGNUP_ROUTE } from "../helpers/constants.js";

const router = Router();

// Register
router.post(
  SIGNUP_ROUTE,
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 15 }),
  signUp
);

// Login
router.post(SIGNIN_ROUTE, signIn);

// CheckAuth
// router.get('/me')

export default router;
