import { Router } from "express";
import { saleValidation } from "../validation/sale/create.sale.v.js";
import  protectRoute from "../middlewares/protectRoute.js"
import { isAdmin } from "../middlewares/admin.js"
import { createSale } from "../controllers/sale.controller.js";
import { uploadCustomer } from "../middlewares/upload.js"

const router = Router();

router.post("/", protectRoute, isAdmin, uploadCustomer.none(), saleValidation, createSale);

export default router;