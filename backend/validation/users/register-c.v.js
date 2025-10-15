import { body } from "express-validator";

const registerCustomerValidation = [
  body("fullname").notEmpty().trim().escape().isLength({ min: 2 }).withMessage("Full Name must be at least 2 characteres"),
  body("username").notEmpty().trim().isLowercase().escape().isLength({ min: 2 }).withMessage("Username must be lowercase and at least 2 characteres"),
  body("email").notEmpty().isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password").notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("country").optional({ checkFalsy: true }).isLength({ min: 2 }).withMessage("Country must be at least 2 characters"),
  body("city").optional({ checkFalsy: true }).isLength({ min: 2 }).withMessage("City must be at least 2 characters"),
  body("street").optional({ checkFalsy: true }).isLength({ min: 2 }).withMessage("Street must me at least 2 characters"),
  body("postalCode").optional({ checkFalsy: true }).isLength({ min: 2 }).withMessage("Postal code must be at least 2 characters"),
  body("phone").optional({ checkFalsy: true }).isLength({ min: 11 }).withMessage("Phone must be 11 characters")
];

export { registerCustomerValidation };