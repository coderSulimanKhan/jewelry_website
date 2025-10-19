import { Router } from "express";
//* Controllers
import { deleteCustomerById, deleteEmployeeById, deleteUser, getAllCustomers, getAllEmployees, getAllUsers, getCustomerById, getEmployeeById, getMe, getUserProfile, loginUser, registerCustomer, registerEmployee, registerUser, resendVerification, updateCustomerById, updateEmployeeById, updateUserById, updateUserProfile, verifyEmail } from "../controllers/user.controller.js";
//* Middlewares
import { adminRateLimiter, rateLimiter } from "../middlewares/rateLimiter.js";
import protectRoute from "../middlewares/protectRoute.js";
import { isAdmin } from "../middlewares/admin.js";
import { uploadCustomer, uploadEmployee } from "../middlewares/upload.js";
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

// for customer
//* register a new customer
router.post("/register-c", /*rateLimiter,*/ protectRoute, isAdmin, uploadCustomer.single("image"), registerCustomerValidation, registerCustomer);

// for customer
//* get all customers (admin only)
router.get("/customers", /*adminRateLimiter,*/ protectRoute, isAdmin, getAllCustomers);

// for customer
//* delete customer by id (admin only)
router.delete("/:id", /*adminRateLimiter,*/ protectRoute, isAdmin, deleteCustomerById);

// for employee
//* get all employees (admin only)
router.get("/employee", /*adminRateLimiter,*/ protectRoute, isAdmin, getAllEmployees);

// for customer
//* get user by id (admin only)
router.get("/:id", /*adminRateLimiter,*/ protectRoute, isAdmin, getCustomerById);

// for customer
//* update customer by id (admin only)
router.put("/:id", /*adminRateLimiter,*/ protectRoute, isAdmin, uploadCustomer.single("image"), updateCustomerValidation, updateCustomerById);

// for employee
//* register a new employee
router.post("/register-e", /*rateLimiter,*/ protectRoute, isAdmin, uploadEmployee.single("image"), registerCustomerValidation, registerEmployee);

// for employee
//* delete employee by id (admin only)
router.delete("/employee/:id", /*adminRateLimiter,*/ protectRoute, isAdmin, deleteEmployeeById);

// for employee// for employee

//* get employee by id (admin only)
router.get("/employee/:id", /*adminRateLimiter,*/ protectRoute, isAdmin, getEmployeeById);

// for employee
//* update employee by id (admin only)
router.put("/employee/:id", /*adminRateLimiter,*/ protectRoute, isAdmin, uploadEmployee.single("image"), updateCustomerValidation, updateEmployeeById);

// todo : used to here

// //* get all users (admin only)
// router.get("/", adminRateLimiter, protectRoute, isAdmin, getAllUsers);

// //* verify email
// router.get("/verify-email/:token", verifyEmail);

// //* resend verification email
// router.post("/resend-verification", rateLimiter, protectRoute, resendVerification);

// //* get loged in user profile
// router.get("/profile", rateLimiter, protectRoute, getUserProfile);

// //* update user profile
// router.put("/profile", rateLimiter, protectRoute, profileValidation, upload.single("image"), updateUserProfile);

// //* delete user account
// router.delete("/profile", rateLimiter, protectRoute, deleteUser);

// //* register a new (customer, employee, admin) (admin only)
// router.post("/register", rateLimiter, protectRoute, isAdmin, registerValidation, registerUser);

// //* update user by id (admin only)
// router.put("/:id", adminRateLimiter, protectRoute, isAdmin, profileValidation, upload.single("image"), updateUserById);

export default router;