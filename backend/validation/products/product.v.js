import { body } from "express-validator";

const productValidation = [
  body("name").notEmpty().trim().escape().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("")
];

export { productValidation };