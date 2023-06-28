import { Router } from "express";
import { JSON_ROUTE } from "../helpers/constants.js";
import { getJsonFile, putJsonFile } from "../controllers/storage-controller.js";

const router = Router();

//  Store JSON
router.put(JSON_ROUTE, putJsonFile);

// Access JSON
router.get(JSON_ROUTE, getJsonFile);

export default router;
