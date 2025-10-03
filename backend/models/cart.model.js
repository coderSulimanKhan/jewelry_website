import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [{ productId: { type: Schema.Types.ObjectId, ref: "Product" }, quantity: { type: Number, min: 1, default: 1 } }]
}, { timestamps: true });

const Cart = model("Cart", cartSchema);

export default Cart;