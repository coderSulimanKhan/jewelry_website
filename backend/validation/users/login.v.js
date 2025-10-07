import { body } from "express-validator"

const loginValidation = [
  body("email").notEmpty().isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password").notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
];

export { loginValidation };