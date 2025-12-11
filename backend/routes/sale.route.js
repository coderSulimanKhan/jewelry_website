import { Router } from "express";
import { saleValidation } from "../validation/sale/create.sale.v.js";
import protectRoute from "../middlewares/protectRoute.js"
import { isAdmin } from "../middlewares/admin.js"
import { createSale, deleteSale, getAllSales, getSale, updateSale } from "../controllers/sale.controller.js";
import { uploadCustomer } from "../middlewares/upload.js"

const router = Router();

router.post("/", protectRoute, isAdmin, uploadCustomer.none(), saleValidation, createSale);
router.get("/", protectRoute, isAdmin, getAllSales);
router.get("/:id", protectRoute, isAdmin, getSale);
router.delete("/:id", protectRoute, isAdmin, deleteSale);
router.put("/:id", protectRoute, isAdmin, uploadCustomer.none(), saleValidation, updateSale);

export default router;