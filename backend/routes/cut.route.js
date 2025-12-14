import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js"
import { isAdmin } from "../middlewares/admin.js"
import { cutValidation } from "../validation/cuts/cuts.v.js";
import { uploadCustomer } from "../middlewares/upload.js"
import { createCut, deleteCut, getAllCuts } from "../controllers/cut.controller.js";

const router = Router();

router.post("/", protectRoute, isAdmin, uploadCustomer.none(), cutValidation, createCut);
router.get("/", protectRoute, isAdmin, getAllCuts);
router.delete("/:id", protectRoute, isAdmin, deleteCut);

export default router