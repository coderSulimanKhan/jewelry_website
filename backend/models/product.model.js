import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: String,
  category: { type: String, required: true, enum: ["ring", "necklace", "bracelet", "earrings", "pendant", "anklet", "other"] },
  material: { type: [String], required: true, enum: ["silver", "gold", "diamond"] },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  weight: { value: Number, unit: { type: String, enum: ["ct", "g", "oz"], required: true, default: "g" } },
  size: { value: Number, unit: { type: String, enum: ["inch", "cm"], default: "inch" } },
  images: [String],
  stone: { type: [String], enum: ["agate", "amethyst", "apatite", "aquamarine", "adventurine", "carnelian", "chrysoprase", "citrine", "diamond", "emerald", "garnet", "honey quartz", "jade", "lab grown blue sapphire", "lab grown diamond", "lab grown emerald", "lab grown ruby", "lab grown white sapphire", "multi", "neon apatite", "onyx", "opal", "pearl", "peridot", "prasiolite", "quartz", "ruby", "sapphire", "sodalite", "swiss blue topaz", "tiger eye", "topaz", "tourmaline", "tsavorite", "turquoise", "none"], default: "none" },
  qrCode: String,
  barCode: String,
}, { timestamps: true });

const Product = model("Product", productSchema);

export default Product;