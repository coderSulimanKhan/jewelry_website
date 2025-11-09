import { Router } from "express";
import { adminRateLimiter } from "../middlewares/rateLimiter.js";
import protectRoute from "../middlewares/protectRoute.js";
import { isAdmin } from "../middlewares/admin.js";
import { productValidation } from "../validation/products/product.v.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProductById } from "../controllers/product.controller.js";
import { uploadProductImages } from "../middlewares/upload.js";

const router = Router();

router.post("/", /*adminRateLimiter,*/ protectRoute, isAdmin, uploadProductImages, productValidation, createProduct);
router.get("/", /*adminRateLimiter,*/ protectRoute, isAdmin, getAllProducts);
router.get("/:id", /*adminRateLimiter,*/ protectRoute, isAdmin, getProductById);
router.post("/:id", protectRoute, isAdmin, uploadProductImages, productValidation, updateProductById);
router.delete("/:id", protectRoute, isAdmin, deleteProduct);

export default router;