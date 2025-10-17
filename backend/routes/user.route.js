import { Router } from "express";
//* Controllers
import { deleteCustomerById, deleteUser, getAllCustomers, getAllUsers, getCustomerById, getMe, getUserProfile, loginUser, registerCustomer, registerUser, resendVerification, updateCustomerById, updateUserById, updateUserProfile, verifyEmail } from "../controllers/user.controller.js";
//* Middlewares
import { adminRateLimiter, rateLimiter } from "../middlewares/rateLimiter.js";
import protectRoute from "../middlewares/protectRoute.js";
import { isAdmin } from "../middlewares/admin.js";
import upload from "../middlewares/upload.js";
//* Validation
import { registerCustomerValidation } from "../validation/users/register-c.v.js";
import { loginValidation } from "../validation/users/login.v.js";
import { profileValidation } from "../validation/users/profile.v.js";
import { registerValidation } from "../validation/users/register.v.js";
import { updateCustomerValidation } from "../validation/users/update-c.js";

const router = Router();

//* get user from cookie
router.get("/me", /*rateLimiter, */ protectRoute, getMe);

//* login existing user
router.post("/login", /*rateLimiter, */ loginValidation, loginUser);

//* register a new customer
router.post("/register-c", /*rateLimiter,*/ protectRoute, isAdmin, upload.single("image"), registerCustomerValidation, registerCustomer);

//* get all customers (admin only)
router.get("/customers", /*adminRateLimiter,*/ protectRoute, isAdmin, getAllCustomers);

//* delete customer by id (admin only)
router.delete("/:id", /*adminRateLimiter,*/ protectRoute, isAdmin, deleteCustomerById);

//* get user by id (admin only)
router.get("/:id", /*adminRateLimiter,*/ protectRoute, isAdmin, getCustomerById);

//* update customer by id (admin only)
router.put("/:id", /*adminRateLimiter,*/ protectRoute, isAdmin, upload.single("image"), updateCustomerValidation, updateCustomerById);

// todo : used to here

//* get all users (admin only)
router.get("/", adminRateLimiter, protectRoute, isAdmin, getAllUsers);

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

//* update user by id (admin only)
router.put("/:id", adminRateLimiter, protectRoute, isAdmin, profileValidation, upload.single("image"), updateUserById);

export default router;