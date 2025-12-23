import { validationResult } from "express-validator";
import Order from "../models/order.model.js";
import mongoose, { isValidObjectId } from "mongoose";

const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, error: errors.array() });
  try {
    // const { user, items, totalPrice, cash, another, remainingFee, createdBy, isDefaultProductsDiscounts, discountFee, discountPer } = req.body;
    req.body.items = JSON.parse(req.body.items);
    const newOrder = await Order.create({ ...req?.body, createdBy: req?.user?._id });
    if (!newOrder) return res.status(400).json({ success: false, message: "Failed to create order" });
    res.status(201).json({ success: true, message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({ isDeleted: false })
      .populate({ path: "user", select: "name username image" })
      .populate({ path: "items.id", select: "name images" })
      .populate({ path: "createdBy", select: "name username image" });
    if (!allOrders) {
      res.status(404).json({ success: false, message: "Orders not found" });
    }
    res.status(200).json({ success: true, data: allOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "invalid id" });
  }
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    order.isDeleted = true;
    order.save();
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const getOrder = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid id" });
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const changeStatus = async (req, res) => {
  const { id } = req?.params;
  if (!isValidObjectId(id)) return res.status(400).json({ success: false, message: "Invalid id" });
  try {
    const order = await Order.findOne({ _id: id, isDeleted: false });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    order.status = req?.body?.status;
    await order.save();
    res.status(200).json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const updateOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid id" });
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, error: errors.array() });
  try {
    req.body.items = JSON.parse(req.body.items);
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ succes: false, message: "Order not found" });
    await Order.findByIdAndUpdate(id, req?.body);
    res.status(200).json({ success: true, message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export { createOrder, getAllOrders, deleteOrder, getOrder, changeStatus, updateOrder }