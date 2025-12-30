import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ["ring", "necklace", "bracelet", "earrings", "pendant", "anklet", "other"] },
  material: { type: String, required: true, enum: ["silver", "gold"] },
  making: { type: Number, required: true, min: 0 },
  wastage: { type: Number, required: true, min: 0 },
  polish: { type: Number, required: true, min: 0 },
  color: { type: String, required: true },
  stock: { type: Number, required: true, min: 1 },
  weight: { value: { type: Number, required: true } },
  size: { value: { type: Number, required: true }, unit: { type: String, enum: ["inch", "cm"], default: "cm" } },
  discountFee: { type: Number, defult: 0 },
  discountPercentage: { type: Number, default: 0 },
  stones: [{
    type: { type: String, enum: ["agate", "amethyst", "apatite", "aquamarine", "adventurine", "carnelian", "chrysoprase", "citrine", "diamond", "emerald", "garnet", "honey quartz", "jade", "lab grown blue sapphire", "lab grown diamond", "lab grown emerald", "lab grown ruby", "lab grown white sapphire", "multi", "neon apatite", "onyx", "opal", "pearl", "peridot", "prasiolite", "quartz", "ruby", "sapphire", "sodalite", "swiss blue topaz", "tiger eye", "topaz", "tourmaline", "tsavorite", "turquoise", "none"], default: "none" },
    quantity: { type: Number, min: 1 },
    shape: String,
    color: String,
    weight: { value: Number, unit: { type: String, enum: ["ct", "g", "oz"], default: "g" } },
    image: String,
    uniqueId: Number
  }],
  images: [{ type: String, required: true }],
  isSoldOut: { type: Boolean, default: false },
  ratings: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["product", "order", "got"], default: "product" },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const Product = model("Product", productSchema);

export default Product;