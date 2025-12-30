import { Router } from "express";
import { getRate, updateRate } from "../controllers/rate.controller.js";
import protectRoute from "../middlewares/protectRoute.js"

const router = Router();

router.get("/", getRate);
router.post("/", protectRoute, updateRate);

export default router;