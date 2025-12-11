import { validationResult } from "express-validator"
import Sale from "../models/sale.model.js";
import mongoose from "mongoose";

const createSale = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, error: errors.array() });
  try {
    // const { user, items, totalPrice, cash, another, remainingFee, createdBy, isDefaultProductsDiscounts, discountFee, discountPer } = req.body;
    req.body.items = JSON.parse(req.body.items);
    const newSale = await Sale.create({ ...req?.body, createdBy: req?.user?._id });
    if (!newSale) return res.status(400).json({ success: false, message: "Failed to create sale" });
    res.status(201).json({ success: true, message: "Sale created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const getAllSales = async (req, res) => {
  try {
    const allSales = await Sale.find({ isDeleted: false }).populate({ path: "user", select: "name username image" }).populate({ path: "items.id", select: "name images" }).populate({ path: "createdBy", select: "name username image" });
    if (!allSales) {
      res.status(404).json({ success: false, message: "Sales not found" });
    }
    res.status(200).json({ success: true, data: allSales });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const deleteSale = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "invalid id" });
  }
  try {
    const sale = await Sale.findById(id);
    if (!sale) return res.status(404).json({ success: false, message: "Sale not found" });
    sale.isDeleted = true;
    sale.save();
    res.status(200).json({ success: true, message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const getSale = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid id" });
  try {
    const sale = await Sale.findById(id).populate({ path: "user", select: "name username image" }).populate({ path: "items.id", select: "name images" }).populate({ path: "createdBy", select: "name username image" });
    if (!sale) return res.status(404).json({ success: false, message: "Sale not found" });
    res.status(200).json({ success: true, data: sale });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const updateSale = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid id" });
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, error: errors.array() });
  try {
    // const { user, items, totalPrice, cash, another, remainingFee, createdBy, isDefaultProductsDiscounts, discountFee, discountPer } = req.body;
    req.body.items = JSON.parse(req.body.items);
    const sale = await Sale.findById(id);
    if (!sale) return res.status(404).json({ succes: false, message: "Sale not found" });
    await Sale.findByIdAndUpdate(id, req?.body);
    res.status(200).json({ success: true, message: "Sale updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export { createSale, getAllSales, deleteSale, getSale,updateSale }