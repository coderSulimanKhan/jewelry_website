import { body } from "express-validator";

const saleValidation = [
  body("user").notEmpty().withMessage("User is required."),
  body("items").notEmpty().withMessage("At least 1 item is required."),
  body("totalPrice").optional().isInt({ min: 1 }).withMessage("Total price must be a positive integer."),
  body("cash").optional().isInt({ min: 0 }).withMessage("Cash must be a non-negative integer."),
  body("another").optional().isInt({ min: 0 }).withMessage("Another payment must be a non-negative integer."),
  body("remainingFee").optional().isInt({ min: 0 }).withMessage("Remaining fee must be a non-negative integer."),
  body("isDefaultProductsDiscounts").optional().isBoolean().toBoolean(),
  body("discountFee").optional().isInt({ min: 0 }).withMessage("Discount fee must be at least 1."),
  body("discountPer").optional().isInt({ min: 0, max: 100 }).withMessage("Discount percentage must be between 1 and 100."),
];

export { saleValidation }