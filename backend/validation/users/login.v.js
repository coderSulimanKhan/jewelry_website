import { body } from "express-validator"

const loginValidation = [
  body("username").notEmpty().isLowercase().trim().escape().isLength({ min: 2 }).withMessage("Username must be lowercase"),
  body("password").notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
];

export { loginValidation };