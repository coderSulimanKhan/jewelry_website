import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, unique: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "customer", "employee"], default: "customer" },
  address: { country: { type: String, default: "" }, city: { type: String, default: "" }, street: { type: String, default: "" }, postalCode: { type: String, default: "" } },
  phone: { type: String, default: "" },
  image: { type: String, default: "/avatar.png" },
  isVerified: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: "false" }
}, { timestamps: true });

const User = model("User", userSchema);

export default User;