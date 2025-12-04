import { Schema, model } from "mongoose"

const saleSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  totalPrice: Number,
  cash: Number,
  another: Number,
  remainingFee: Number
});

const Sale = model("Sale", saleSchema);

export default Sale;