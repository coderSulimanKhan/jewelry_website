import { validationResult } from "express-validator";
import Product from "../models/product.model.js";

const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, error: errors.array() });
    const { name, description, category, material, price, color, stock, weightValue, weightUnit, sizeValue, sizeUnit, stones, discountFee, discountPercentage } = req.body;
    // add stone images
    const allStones = await JSON.parse(stones);
    for (let i = 0; i < allStones.length; i++) {
      const file = req.files["stoneImageFiles"][i];
      allStones[i].image = "/api/v1/" + file.path.replace("backend/", "");
    }
    // add product images
    const images = [];
    for (let i = 0; i < req.files["imageFiles"].length; i++) {
      images.push("/api/v1/" + req.files["imageFiles"][i].path.replace("backend/", ""));
    }
    // console.log(req.files["imageFiles"]);
    // console.log(req.files["stoneImageFiles"]);
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
      createdBy: req.user._id,
      images
    });
    res.status(201).json({ success: true, newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { createProduct };