import { body } from "express-validator";

const profileValidation = [
  body("name").optional().trim().escape().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("username").optional().trim().escape().isLength({ min: 2 }).withMessage("Username must be lowercase and at least 2 characters"),

  body("address.country").optional().trim().escape().isLength({ min: 5 }).withMessage("Country must be at least 2 characters"),
  body("address.city").optional().trim().escape().isLength({ min: 2 }).withMessage("City must be at least 2 characters"),
  body("address.street").optional().trim().escape().isLength({ min: 2 }).withMessage("Street must be at least 3 characters"),
  body("address.postalCode").optional().trim().escape().isPostalCode("any").withMessage("Invalid postal code"),

  body("phone").optional().trim().escape().isLength({ min: 11 }).withMessage("Phone must be at least 11 numbers")
];

export { profileValidation };