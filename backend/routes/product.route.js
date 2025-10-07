import { Router } from "express";
import { adminRateLimiter } from "../middlewares/rateLimiter.js";
import protectRoute from "../middlewares/protectRoute.js";
import { isAdmin } from "../middlewares/admin.js";

const router = Router();

// router.post("/", adminRateLimiter, protectRoute, isAdmin, productValidation, createProduct);

export default router;