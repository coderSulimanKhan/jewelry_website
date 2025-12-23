import { Router } from "express";
import { orderValidation } from "../validation/orders/create.order.v.js";
import protectRoute from "../middlewares/protectRoute.js";
import { isAdmin } from "../middlewares/admin.js";
import { uploadCustomer } from "../middlewares/upload.js";
import { changeStatus, createOrder, deleteOrder, getAllOrders, getOrder, updateOrder } from "../controllers/order.controller.js";

const router = Router();

router.post("/", protectRoute, isAdmin, uploadCustomer.none(), orderValidation, createOrder);
router.get("/", protectRoute, isAdmin, getAllOrders);
router.delete("/:id", protectRoute, isAdmin, deleteOrder);
router.get("/:id", protectRoute, isAdmin, getOrder);
router.put("/:id", protectRoute, isAdmin, changeStatus);
router.patch("/:id", protectRoute, isAdmin, uploadCustomer.none(), orderValidation, updateOrder);

export default router