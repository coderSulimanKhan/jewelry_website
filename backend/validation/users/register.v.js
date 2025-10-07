import { body } from "express-validator";

const registerValidation = [
  body("name").notEmpty().trim().escape().isLength({ min: 2 }).withMessage("Name must be at least 2 characteres"),
  body("email").notEmpty().isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password").notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("role").notEmpty().trim().escape().withMessage("Invalid role").isIn(["employee", "admin"])
];

export { registerValidation };