import { Router } from "express";
import {
  LOCATION_BY_IP_ROUTE,
  MY_LOCATION_ROUTE,
} from "../helpers/constants.js";
import {
  locationByIP,
  myLocation,
} from "../controllers/location-controller.js";

const router = Router();

// Location by IP
router.get(LOCATION_BY_IP_ROUTE, locationByIP);

// My current location
router.get(MY_LOCATION_ROUTE, myLocation);

export default router;
