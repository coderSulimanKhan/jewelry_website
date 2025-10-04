import { Router } from "express";
//* Controllers
import { registerUser, verifyEmail } from "../controllers/user.controller.js";
//* Middlewares
import { registerValidation } from "../middlewares/register.v.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

//* register a new user
router.post("/register", /**rateLimiter ,*/ registerValidation, registerUser);
router.get("/verify-email/:token", verifyEmail);

export default router;