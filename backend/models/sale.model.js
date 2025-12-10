import { Schema, model } from "mongoose"

const saleSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" }, // done 1 .
  items: [{ id: { type: Schema.Types.ObjectId, ref: "Product" }, quantity: { type: Number, min: 1 } }], // done 2 / .
  createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // done last (default) .
  totalPrice: Number, // done 6 / .
  cash: Number, // .
  another: Number, // .
  remainingFee: Number, // .
  isDefaultProductsDiscounts: Boolean, // done 3 isDefaultProductsDiscounts // .
  discountFee: Number, // done 4 / .
  discountPercentage: Number, // done 5 / .
  isDeleted: { type: Boolean, default: false }
});

const Sale = model("Sale", saleSchema);

export default Sale;