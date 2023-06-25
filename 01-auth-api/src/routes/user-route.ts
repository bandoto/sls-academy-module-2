import { Router } from "express";
import { getMe, refreshTokens } from "../controllers/user-controller.js";
import {
  GETME_ROUTE,
  MAIN_ROUTE,
  REFRESH_ROUTE,
} from "../helpers/constants.js";
import { checkIsAuth } from "../middleware/auth-middleware.js";

const router = Router();

// Main
router.get(MAIN_ROUTE, checkIsAuth, getMe);

// Check auth
router.get(GETME_ROUTE, checkIsAuth, getMe);

// Refresh
router.get(REFRESH_ROUTE, refreshTokens);

export default router;
