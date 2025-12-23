import { model, Schema, SchemaTypes } from "mongoose";

const OrderSchema = new Schema({
  user: { type: SchemaTypes.ObjectId, ref: "User" },
  items: [{ id: { type: SchemaTypes.ObjectId, ref: "Product" }, quantity: { type: Number, default: 1 } }],
  isDefaultOrdersDiscounts: { type: Boolean, default: false },
  discountFee: Number,
  discountPer: Number,
  cash: Number,
  another: Number,
  totalPrice: Number,
  remainingFee: Number,
  status: { type: String, enum: ["processing", "completed", "cancelled"], default: "processing" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  isPaid: { type: Boolean, default: false },
  note: String,
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const Order = model("Order", OrderSchema);

export default Order