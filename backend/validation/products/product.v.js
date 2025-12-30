import { body } from "express-validator";

const productValidation = [
  body("name").notEmpty().trim().escape().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("description").notEmpty().trim().escape().isLength({ min: 2 }).withMessage("Description must be at least 2 characters"),
  body("category").notEmpty().trim().escape().withMessage("category is not defined"),
  body("material").notEmpty().trim().escape().isLength({ min: 2 }).withMessage("Material is not denfined"),
  body("price").notEmpty().isInt({ min: 1 }).withMessage("Price must be at least 1"),
  body("making").notEmpty().isInt({ min: 0 }).withMessage("Making must be at least 0"),
  body("wastage").notEmpty().isInt({ min: 0 }).withMessage("Wastage must be at least 0"),
  body("polish").notEmpty().isInt({ min: 0 }).withMessage("Polish must be at least 0"),
  body("color").notEmpty().trim().escape().isLength({ min: 2 }).withMessage("Color must be at least 2 characters"),
  body("stock").notEmpty().isInt({ min: 1 }).withMessage("Stock must be at least 1"),
  body("weightValue").notEmpty().isInt({ min: 0 }).withMessage("Weight must be greater than 0"),
  body("weightUnit").notEmpty().escape().isLength({ min: 1 }).withMessage("Weight unit is not defined"),
  body("sizeValue").notEmpty().isInt({ min: 0 }).withMessage("Size must be greater than 0"),
  body("sizeUnit").notEmpty().escape().isLength({ min: 2 }).withMessage("Size unit is not defined"),
  body("stones").optional().trim(),
  body("discountPrice").optional().isInt({ min: 0 }).withMessage("Discount price must be greater than 0"),
  body("discountPercentage").optional().isInt({ min: 0 }).withMessage("Discount percentage must be greater than 0"),
  body("images").optional(),
  body("type").optional().trim().escape().isLength({ min: 1 }).withMessage("Type is not defined")
];

export { productValidation };