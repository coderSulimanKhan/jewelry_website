import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import ENV_VARS from "../config/ENV_VARS.js";
import { sendEmail } from "../utils/sendEmail.js";

const registerUser = async (req, res) => {
  try {
    //* Getting the data from the request
    const { name, email, password, } = req.body;
    //* Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }
    //* Check for the email if already defined
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    //* Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //* Registering the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    //* Send email to verify
    // sendEmail(newUser.email);
    const token = generateTokenAndSetCookie(newUser._id, newUser.role, res);
    res.status(201).json({ success: true, newUser: { ...newUser._doc, password: "" }, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, ENV_VARS.JWT_EMAIL_SECRET);
    const demail = decoded.email;
    if (!demail) return res.status(400).send("Invalid token");
    const user = await User.findOne({ email: demail });
    if (!user) return res.status(404).send("User not found.");
    if (user.isVerified) return res.status(200).send("Email already verified");
    user.isVerified = true;
    await user.save();
    res.status(200).send("Email verified");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const resendVerification = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "user not found" });
    if (user.isVerified) return res.status(200).json({ success: true, message: "email already verified" });
    sendEmail(user.email);
    res.status(200).send("Verification email resent");
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, error: errors.array() });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "user not found" });
    if (!user.isVerified) return res.status(400).json({ success: false, message: "user is not verified" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ success: false, message: "password is not correct" });
    const token = generateTokenAndSetCookie(user._id, user.role, res);
    return res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "user not found" });
    if (!user.isVerified) return res.status(403).json({ success: false, message: "user is not verified" });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, address, phone } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "user not found" });
    user.name = name || user.name;
    user.address = address || user.address;
    user.phone = phone || user.phone;
    await user.save();
    const updateUser = await User.findById(req.user._id);
    res.status(200).json({ success: true, updateUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export { registerUser, verifyEmail, resendVerification, loginUser, getUserProfile, updateUserProfile };