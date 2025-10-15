import { Router } from "express";
//* Controllers
import { deleteUser, deleteUserById, getAllUsers, getMe, getUserById, getUserProfile, loginUser, registerCustomer, registerUser, resendVerification, updateUserById, updateUserProfile, verifyEmail } from "../controllers/user.controller.js";
//* Middlewares
import { adminRateLimiter, rateLimiter } from "../middlewares/rateLimiter.js";
import protectRoute from "../middlewares/protectRoute.js";
import { isAdmin } from "../middlewares/admin.js";
//* Validation
import { registerCustomerValidation } from "../validation/users/register-c.v.js";
import { loginValidation } from "../validation/users/login.v.js";
import { profileValidation } from "../validation/users/profile.v.js";
import { registerValidation } from "../validation/users/register.v.js";
import upload from "../middlewares/upload.js";

const router = Router();

//* get user from cookie
router.get("/me", rateLimiter, protectRoute, getMe);

//* login existing user
router.post("/login", /*rateLimiter, */ loginValidation, loginUser);

//* register a new customer
router.post("/register-c", /*rateLimiter,*/ protectRoute, isAdmin, upload.single("image"), registerCustomerValidation, registerCustomer);

//* verify email
router.get("/verify-email/:token", verifyEmail);

//* resend verification email
router.post("/resend-verification", rateLimiter, protectRoute, resendVerification);

//* get loged in user profile
router.get("/profile", rateLimiter, protectRoute, getUserProfile);

//* update user profile
router.put("/profile", rateLimiter, protectRoute, profileValidation, upload.single("image"), updateUserProfile);

//* delete user account
router.delete("/profile", rateLimiter, protectRoute, deleteUser);

//* register a new (customer, employee, admin) (admin only)
router.post("/register", rateLimiter, protectRoute, isAdmin, registerValidation, registerUser);

//* get all users (admin only)
router.get("/", adminRateLimiter, protectRoute, isAdmin, getAllUsers);

//* get user by id (admin only)
router.get("/:id", adminRateLimiter, protectRoute, isAdmin, getUserById);

//* update user by id (admin only)
router.put("/:id", adminRateLimiter, protectRoute, isAdmin, profileValidation, upload.single("image"), updateUserById);

//* delete user by id (admin only)
router.delete("/:id", adminRateLimiter, protectRoute, isAdmin, deleteUserById);

export default router;