import { body } from "express-validator"

const loginValidation = [
  body("username").optional().trim().escape().isLength({ min: 2 }).withMessage("Username must be lowercase and at least 2 characters"),
  body("password").notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
];

export { loginValidation };