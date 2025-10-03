import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  address: { country: String, city: String, street: String, postalCode: String },
  phone: String,
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  image: { type: String, default: "avatar.png" }
}, { timestamps: true });

const User = model("User", userSchema);

export default User;