import { body } from "express-validator";

const registerCustomerValidation = [
  body("name").notEmpty().trim().escape().isLength({ min: 2 }).withMessage("Name must be at least 2 characteres"),
  body("username").notEmpty().trim().isLowercase().escape().isLength({ min: 2 }).withMessage("Username must be lowercase and at least 2 characteres"),
  body("email").notEmpty().isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password").notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
];

export { registerCustomerValidation };