import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import ENV_VARS from "../config/ENV_VARS.js";

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

    //* Verify email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: ENV_VARS.SMTP_EMAIL, pass: ENV_VARS.SMTP_PASSWORD }
    });
    const eToken = jwt.sign({ email }, ENV_VARS.JWT_EMAIL_SECRET, { expiresIn: "1h" });
    const isSended = await transporter.sendMail({
      to: newUser.email,
      subject: "Verify your email",
      html: `<a href="${ENV_VARS.PROD_BACKEND_URL}/api/v1/users/verify-email/${eToken}">Click to verify</a>`
    });

    if (!isSended) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = generateTokenAndSetCookie(newUser._id, newUser.role, res);
    res.status(201).json({ success: true, newUser, token });
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


export { registerUser, verifyEmail };