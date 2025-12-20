import { validationResult } from "express-validator"
import Cut from "../models/cut.model.js";
import { isValidObjectId } from "mongoose";
import { error } from "console";

const createCut = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  try {
    req.body.items = JSON.parse(req?.body?.items);
    const newCut = await Cut.create({ ...req?.body, createdBy: req?.user?._id });
    if (!newCut) return res.status(400).json({ success: false, message: "Failed to create cut" });
    res.status(201).json({ success: true, message: "Cut created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const getAllCuts = async (req, res) => {
  try {
    const allCuts = await Cut.find({ isDeleted: false }).populate({
      path: "user",
      select: "name username image"
    }).populate({
      path: "createdBy",
      select: "name username image"
    }).populate({ path: "items.id", select: "name images" });
    if (!allCuts) return res.status(404).json({ success: false, message: "No cuts found" });
    console.log(allCuts);
    res.status(200).json({ success: true, data: allCuts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const deleteCut = async (req, res) => {
  const { id } = req?.params;
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid id" });
  try {
    const cut = await Cut.findById(id);
    if (!cut) return res.status(404).json({ success: false, message: "Cut not found" });
    cut.isDeleted = true;
    cut.save();
    res.status(200).json({ success: true, message: "Cut deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getCutById = async (req, res) => {
  const { id } = req?.params;
  if (!isValidObjectId(id)) return res.status(400).json({ success: false, message: "Invalid id" });
  try {
    const cut = await Cut.findOne({ _id: id, isDeleted: false })
      .populate({ path: "items.id", select: "name price" });
    if (!cut) return res.status(404).json({ success: false, message: "Cut not found" });
    res.status(200).json({ success: true, data: cut });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const updateCut = async (req, res) => {
  const { id } = req?.params;
  if (!isValidObjectId(id)) return res.status(400).json({ success: false, message: "Invalid id" });
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  try {
    const cut = await Cut.findOne({ _id: id, isDeleted: false });
    if (!cut) return res.status(404).json({ success: false, message: "Cut not found" });
    req.body.items = JSON.parse(req?.body?.items);
    const updatedCut = await Cut.findByIdAndUpdate(id, req?.body);
    if (!updateCut) return res.status(400).json({ success: false, message: "Failed to update" });
    res.status(200).json({ success: true, message: "Cut updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}


export { createCut, getAllCuts, deleteCut, getCutById, updateCut }