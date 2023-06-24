import { Router } from "express";
import { getMe, refreshTokens } from "../controllers/user-controller.js";
import { GETME_ROUTE, REFRESH_ROUTE } from "../helpers/constants.js";
import { checkIsAuth } from "../middleware/auth-middleware.js";

const router = Router();

// Check auth
router.get(GETME_ROUTE, checkIsAuth, getMe);

// Refresh
router.get(REFRESH_ROUTE, refreshTokens);

export default router;
