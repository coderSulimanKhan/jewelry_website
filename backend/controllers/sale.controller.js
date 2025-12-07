import { validationResult } from "express-validator"
import Sale from "../models/sale.model.js";

const createSale = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, error: errors.array() });
  try {
    // const { user, items, totalPrice, cash, another, remainingFee, createdBy, isDefaultProductsDiscounts, discountFee, discountPer } = req.body;
    req.body.items = JSON.parse(req.body.items);
    const newSale = Sale.create({ ...req?.body, createdBy: req?.user?._id });
    if (!newSale) return res.status(400).json({ success: false, message: "Failed to create sale" });
    res.status(201).json({ success: true, message: "Sale created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export { createSale }