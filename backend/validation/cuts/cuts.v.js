import { body } from "express-validator";

const cutValidation = [
  body("user").notEmpty().withMessage("User is required"),
  body("items").notEmpty().withMessage("At least 1 item is required"),
  body("cnic").optional().isLength({ min: 14 }).withMessage("Invalid cnic"),
  body("deductions").optional().isInt({ min: 0 }).withMessage("Deduction will be 0 or greater"),
  body("cash").optional().isInt({ min: 0 }).withMessage("Cash will be 0 or greater"),
  body("another").optional().isInt({ min: 0 }).withMessage("Another will be 0 or greater"),
  body("note").optional(),
  body("totalAmount").optional().isInt({ min: 1 }).withMessage("Total amount will be 1 or greater"),
  body("remainingAmount").optional().isInt({ min: 0 }).withMessage("Remaining amount will be 0 or greater"),
];

export { cutValidation };