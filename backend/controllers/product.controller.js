import { validationResult } from "express-validator";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, error: errors.array() });
    const { name, description, category, material, making, wastage, polish, color, stock, weightValue, weightUnit, sizeValue, sizeUnit, stones, discountFee, discountPercentage, type } = req.body;
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
      making,
      wastage,
      polish,
      color,
      stock,
      weight: { value: weightValue, unit: weightUnit },
      size: { value: sizeValue, unit: sizeUnit },
      stones: allStones,
      discountFee,
      discountPercentage,
      images,
      type,
      createdBy: req.user._id,
    });
    res.status(201).json({ success: true, newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProdcuts = await Product.find({ isDeleted: false});
    if (!allProdcuts) return res.status(404).json({ success: false, message: "Products not found" });
    res.status(200).json({ success: true, data: allProdcuts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const getProductById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
  try {
    const product = await Product.findOne({ _id: id, isDeleted: false });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product found", data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const updateProductById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  const { name, description, category, material, making, wastage, polish, color, stock, weightValue, weightUnit, sizeValue, sizeUnit, stones, discountFee, discountPercentage } = req.body;
  // add stone images
  const allStones = await JSON.parse(stones);
  const images = (await JSON.parse(req.body?.images)).filter(image => !image?.includes("blob"));
  try {
    let theIndex = 0;
    if (allStones?.length > 0) {
      allStones.forEach(stone => {
        if (!stone?.image?.includes("api")) {
          const file = req?.files["stoneImageFiles"][theIndex];
          allStones[theIndex].image = "/api/v1/" + file.path.replace("backend/", "");
          theIndex++;
        }
      });
    }
    if (req.files["imageFiles"]?.length > 0) {
      for (let i = 0; i < req.files["imageFiles"]?.length; i++) {
        images.push("/api/v1/" + req.files["imageFiles"][i].path.replace("backend/", ""));
      }
    }
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.material = material || product.material;
    product.making = making || product.making;
    product.wastage = wastage || product.wastage;
    product.polish = polish || product.polish;
    product.color = color || product.color;
    product.stock = stock || product.stock;
    product.weight = { ...product.weight, unit: weightUnit, value: weightValue };
    product.size = { ...product.size, unit: sizeUnit, value: sizeValue };
    product.stones = allStones || product.stones;
    product.discountFee = discountFee || product.discountFee;
    product.discountPercentage = discountPercentage || product.discountPercentage;
    product.images = images || product.images;
    product.save();

    res.status(200).json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server errror" });
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    product.isDeleted = true;
    await product.save();
    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export { createProduct, getAllProducts, getProductById, updateProductById, deleteProduct };