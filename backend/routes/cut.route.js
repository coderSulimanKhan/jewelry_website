import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js"
import { isAdmin } from "../middlewares/admin.js"
import { cutValidation } from "../validation/cuts/cuts.v.js";
import { uploadCustomer } from "../middlewares/upload.js"
import { createCut, deleteCut, getAllCuts, getCutById, updateCut } from "../controllers/cut.controller.js";

const router = Router();

router.post("/", protectRoute, isAdmin, uploadCustomer.none(), cutValidation, createCut);
router.get("/", protectRoute, isAdmin, getAllCuts);
router.delete("/:id", protectRoute, isAdmin, deleteCut);
router.get("/:id", protectRoute, isAdmin, getCutById);
router.post("/:id", protectRoute, isAdmin, uploadCustomer.none(), cutValidation, updateCut);

export default router