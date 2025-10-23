import { validationResult } from "express-validator";
import Product from "../models/product.model.js";

const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, error: errors.array() });
    const { name, description, category, material, price, color, stock, weightValue, weightUnit, sizeValue, sizeUnit, stones, discountFee, discountPercentage } = req.body;
    let allStones = await JSON.parse(stones);
    const newProduct = await Product.create({
      name,
      description,
      category,
      material,
      price,
      color,
      stock,
      weight: { value: weightValue, unit: weightUnit },
      size: { value: sizeValue, unit: sizeUnit },
      stones: allStones,
      discountFee,
      discountPercentage,
      createdBy: req.user._id
    });
    res.status(201).json({ success: true, newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { createProduct };