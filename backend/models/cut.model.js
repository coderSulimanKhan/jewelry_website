import { Schema, model, SchemaTypes } from "mongoose"

const cutSchema = new Schema({
  user: { type: SchemaTypes.ObjectId, ref: "User" }, // 1
  items: [{ id: { type: SchemaTypes.ObjectId, ref: "Product" }, quantity: { type: Number, min: 1 } }],
  cnic: String, // 5
  deductions: Number, // 6
  cash: Number, // 3
  another: Number, // 4
  note: String, // 7
  totalAmount: Number, // 8
  remainingAmount: Number, // 9
  createdBy: { type: SchemaTypes.ObjectId, ref: "User" }, // 2
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const Cut = model("Cut", cutSchema);

export default Cut;