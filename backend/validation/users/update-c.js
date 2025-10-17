import { body } from "express-validator";

const updateCustomerValidation = [
  body("fullname").optional().notEmpty().trim().escape().isLength({ min: 2 }).withMessage("Full Name must be at least 2 characteres"),
  body("username").optional().notEmpty().trim().isLowercase().escape().isLength({ min: 2 }).withMessage("Username must be lowercase and at least 2 characteres"),
  body("email").optional().notEmpty().isEmail().normalizeEmail().withMessage("Invalid email"),
  body("country").optional().optional({ checkFalsy: true }).isLength({ min: 2 }).withMessage("Country must be at least 2 characters"),
  body("city").optional().optional({ checkFalsy: true }).isLength({ min: 2 }).withMessage("City must be at least 2 characters"),
  body("street").optional().optional({ checkFalsy: true }).isLength({ min: 2 }).withMessage("Street must me at least 2 characters"),
  body("postalCode").optional().optional({ checkFalsy: true }).isLength({ min: 2 }).withMessage("Postal code must be at least 2 characters"),
  body("phone").optional().optional({ checkFalsy: true }).isLength({ min: 11 }).withMessage("Phone must be 11 characters")
];

export { updateCustomerValidation };