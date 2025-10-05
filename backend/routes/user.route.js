import { Router } from "express";
//* Controllers
import { loginUser, registerUser, resendVerification, verifyEmail } from "../controllers/user.controller.js";
//* Middlewares
import { registerValidation } from "../validation/register.v.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import protectRoute from "../middlewares/protectRoute.js";
import { loginValidation } from "../validation/login.v.js";

const router = Router();

//* register a new user
router.post("/register", /**rateLimiter ,*/ registerValidation, registerUser);
//* verify email
router.get("/verify-email/:token", verifyEmail);
//* resend verification email
router.post("/resend-verification", rateLimiter, protectRoute, resendVerification);
//* login existing user
router.post("/login", rateLimiter, loginValidation, loginUser);

export default router;