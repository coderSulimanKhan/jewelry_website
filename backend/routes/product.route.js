import { Router } from "express";
import { adminRateLimiter } from "../middlewares/rateLimiter.js";
import protectRoute from "../middlewares/protectRoute.js";
import { isAdmin } from "../middlewares/admin.js";
import { productValidation } from "../validation/products/product.v.js";
import { createProduct } from "../controllers/product.controller.js";
import { uploadProductImages } from "../middlewares/upload.js";

const router = Router();

router.post("/", /*adminRateLimiter,*/ protectRoute, isAdmin, uploadProductImages, productValidation, createProduct);

export default router;