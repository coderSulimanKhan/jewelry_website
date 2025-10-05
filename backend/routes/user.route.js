import { Router } from "express";
//* Controllers
import { deleteUser, getAllUsers, getUserProfile, loginUser, registerUser, resendVerification, updateUserProfile, verifyEmail } from "../controllers/user.controller.js";
//* Middlewares
import { adminRateLimit, adminRateLimiter, rateLimiter } from "../middlewares/rateLimiter.js";
import protectRoute from "../middlewares/protectRoute.js";
import { isAdmin } from "../middlewares/admin.js";
//* Validation
import { registerValidation } from "../validation/register.v.js";
import { loginValidation } from "../validation/login.v.js";
import { profileValidation } from "../validation/profile.v.js";

const router = Router();

//* register a new user
router.post("/register", rateLimiter, registerValidation, registerUser);

//* verify email
router.get("/verify-email/:token", verifyEmail);

//* resend verification email
router.post("/resend-verification", rateLimiter, protectRoute, resendVerification);

//* login existing user
router.post("/login", rateLimiter, loginValidation, loginUser);

//* get loged in user profile
router.get("/profile", rateLimiter, protectRoute, getUserProfile);

//* update user profile
router.put("/profile", rateLimiter, protectRoute, profileValidation, updateUserProfile);

//* delete user account
router.delete("/profile", rateLimiter, protectRoute, deleteUser);

//* get all users (admin only)
router.get("/", adminRateLimiter, protectRoute, isAdmin, getAllUsers);

export default router;