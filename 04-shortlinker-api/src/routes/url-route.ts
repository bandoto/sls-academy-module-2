import { Router } from "express";
import { REDIRECT_ROUTE, SHORT_ROUTE } from "../helpers/constants.js";
import {
  redirectToOriginUrl,
  shortUrl,
} from "../controllers/url-controller.js";

const router = Router();

// Get and short URL
router.post(SHORT_ROUTE, shortUrl);

// Redirect to URL
router.get(REDIRECT_ROUTE, redirectToOriginUrl);

export default router;
