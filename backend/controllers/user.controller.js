import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import ENV_VARS from "../config/ENV_VARS.js";
import { sendEmail } from "../utils/sendEmail.js";
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, user: { ...user._doc, password: "" } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server errror" });
  }
}

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, error: errors.array() });
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: "user not found" });
    if (user.isDeleted) return res.status(404).json({ success: false, message: "User not found" });
    if (!user.isVerified) return res.status(400).json({ success: false, message: "user is not verified" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ success: false, message: "password is not correct" });
    const token = generateTokenAndSetCookie(user._id, user.role, res);
    return res.status(200).json({ success: true, message: "Login successful", user: { ...user._doc, password: "" }, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// for customer
const registerCustomer = async (req, res) => {
  try {
    //* Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }

    //* Getting the data from the request
    const { fullname: name, username, email, password, country, city, street, postalCode, phone } = req.body;

    //* Check for the email if already defined
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    //* Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //* Registering the new user
    const newCustomer = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      address: {
        country,
        city,
        street,
        postalCode
      },
      phone,
      image: req.file ? `/api/v1/uploads/customers/${req.file.filename}` : "/avatar.png",
      createdBy: req.user._id
    });

    res.status(201).json({ success: true, newUser: { ...newCustomer._doc, password: "" } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const allCustomers = await User.find({ role: "customer", isDeleted: false });
    if (!allCustomers) return res.status(404).json({ success: false, message: "Customers not found" });
    res.status(200).json({ success: true, message: allCustomers.length ? "Customers retrieved successfully" : "Customers not found", data: allCustomers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteCustomerById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({ success: false, message: "Invalid id" });
  try {
    console.log(id);
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "Customer not found" });
    if (user.isDeleted) return res.status(404).json({ success: false, message: "Customer already deleted" });
    user.isDeleted = true;
    await user.save();
    res.status(200).json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid id" });
  try {
    const user = await User.findOne({ _id: id, role: "customer", isDeleted: false });
    if (!user) return res.status(404).json({ success: false, message: "Customer not found" });
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    //* Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }

    //* Getting the data from the request
    const { fullname: name, username, email, country, city, street, postalCode, phone } = req.body;

    const user = await User.findOne({ _id: id, isDeleted: false });
    if (!user) {
      return res.status(400).json({ success: false, message: "Customer not found" });
    }

    const image = req.file;

    //* Update the user
    // delete the image from file system if it updates
    if (image && user.image !== "/avatar.png") {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      await fs.unlink(path.join(__dirname, "uploads/customers/" + user.image.split("/")[5]).replace("/controllers", ""));
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.address = {
      country: country || user.address.country,
      city: city || user.address.city,
      street: street || user.address.street,
      postalCode: postalCode || user.address.postalCode
    },
      user.phone = phone || user.phone;
    user.image = image ? `/api/v1/uploads/customers/${image.filename}` : user.image;
    user.save();

    res.status(200).json({ success: true, updatedCustomer: { ...user._doc, password: "" } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// for employee

const registerEmployee = async (req, res) => {
  try {
    //* Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }

    //* Getting the data from the request
    const { fullname: name, username, email, password, country, city, street, postalCode, phone } = req.body;

    //* Check for the email if already defined
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Employee already exists" });
    }
    //* Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //* Registering the new employee
    const newEmployee = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      address: {
        country,
        city,
        street,
        postalCode
      },
      phone,
      image: req.file ? `/api/v1/uploads/employees/${req.file.filename}` : "/avatar.png",
      createdBy: req.user._id,
      role: "employee"
    });

    res.status(201).json({ success: true, newUser: { ...newEmployee._doc, password: "" } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await User.find({ role: "employee", isDeleted: false });
    if (!allEmployees) return res.status(404).json({ success: false, message: "Employees not found" });
    res.status(200).json({ success: true, message: allEmployees.length ? "Employees retrieved successfully" : "Employees not found", data: allEmployees });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteEmployeeById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({ success: false, message: "Invalid id" });
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "Employee not found" });
    if (user.isDeleted) return res.status(404).json({ success: false, message: "Employee already deleted" });
    user.isDeleted = true;
    await user.save();
    res.status(200).json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid id" });
  try {
    const user = await User.findOne({ _id: id, role: "employee", isDeleted: false });
    if (!user) return res.status(404).json({ success: false, message: "Employee not found" });
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    //* Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }

    //* Getting the data from the request
    const { fullname: name, username, email, country, city, street, postalCode, phone } = req.body;

    const user = await User.findOne({ _id: id, isDeleted: false });
    if (!user) {
      return res.status(400).json({ success: false, message: "Employee not found" });
    }

    const image = req.file;

    //* Update the user
    // delete the image from file system if it updates
    if (image && user.image !== "/avatar.png") {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      await fs.unlink(path.join(__dirname, "uploads/employees/" + user.image.split("/")[5]).replace("/controllers", ""));
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.address = {
      country: country || user.address.country,
      city: city || user.address.city,
      street: street || user.address.street,
      postalCode: postalCode || user.address.postalCode
    },
      user.phone = phone || user.phone;
    user.image = image ? `/api/v1/uploads/employees/${image.filename}` : user.image;
    user.save();

    res.status(200).json({ success: true, updatedEmployee: { ...user._doc, password: "" } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// for admin
const registerAdmin = async (req, res) => {
  try {
    //* Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }

    //* Getting the data from the request
    const { fullname: name, username, email, password, country, city, street, postalCode, phone } = req.body;

    //* Check for the email if already defined
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }
    //* Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //* Registering the new employee
    const newAdmin = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      address: {
        country,
        city,
        street,
        postalCode
      },
      phone,
      image: req.file ? `/api/v1/uploads/admins/${req.file.filename}` : "/avatar.png",
      createdBy: req.user._id,
      role: "admin"
    });

    res.status(201).json({ success: true, newAdmin: { ...newAdmin._doc, password: "" } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await User.find({ role: "admin", isDeleted: false });
    if (!allAdmins) return res.status(404).json({ success: false, message: "Admins not found" });
    res.status(200).json({ success: true, message: allAdmins.length ? "Admins retrieved successfully" : "Admins not found", data: allAdmins });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteAdminById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({ success: false, message: "Invalid id" });
  try {
    console.log(id);
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "Admin not found" });
    if (user.isDeleted) return res.status(404).json({ success: false, message: "Admin already deleted" });
    user.isDeleted = true;
    await user.save();
    res.status(200).json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAdminById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid id" });
  try {
    const user = await User.findOne({ _id: id, role: "admin", isDeleted: false });
    if (!user) return res.status(404).json({ success: false, message: "Admin not found" });
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    //* Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }

    //* Getting the data from the request
    const { fullname: name, username, email, country, city, street, postalCode, phone } = req.body;

    const user = await User.findOne({ _id: id, isDeleted: false });
    if (!user) {
      return res.status(400).json({ success: false, message: "Admin not found" });
    }

    const image = req.file;

    //* Update the user
    // delete the image from file system if it updates
    if (image && user.image !== "/avatar.png") {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      await fs.unlink(path.join(__dirname, "uploads/admins/" + user.image.split("/")[5]).replace("/controllers", ""));
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.address = {
      country: country || user.address.country,
      city: city || user.address.city,
      street: street || user.address.street,
      postalCode: postalCode || user.address.postalCode
    },
      user.phone = phone || user.phone;
    user.image = image ? `/api/v1/uploads/admins/${image.filename}` : user.image;
    user.save();

    res.status(200).json({ success: true, updatedEmployee: { ...user._doc, password: "" } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).json({ success: false, message: "Failed to logout" });
    res.cookie("jwt-jewelry", { maxAge: 0 }).status(200).json({ succes: true, message: "Logout successfully" });
    // res.status(200).json({ success: true, message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// todo: used to here

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ success: true, message: allUsers.length ? "Users retrieved successfullu" : "Users not found", data: allUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server errror" });
  }
};

const registerUser = async (req, res) => {
  try {
    //* Getting the data from the request
    const { name, username, email, password, role } = req.body;
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
      username,
      email,
      password: hashedPassword,
      role
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
    if (user.isDeleted) return res.status(404).json({ success: false, message: "User not found" });
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
    if (user.isDeleted) return res.status(404).json({ success: false, message: "User not found" });
    sendEmail(user.email);
    res.status(200).send("Verification email resent");
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "user not found" });
    if (!user.isVerified) return res.status(403).json({ success: false, message: "user is not verified" });
    if (user.isDeleted) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, username, address, phone } = req.body;
  try {
    const imageFileName = req.file?.filename;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "user not found" });
    user.name = name || user.name;
    user.address = JSON.parse(address) || user.address;
    user.phone = phone || user.phone;
    user.username = username || user.username;
    if (imageFileName && user.image === "/avatar.png") {
      user.image = imageFileName || user.image;
    } else if (imageFileName && user.image !== "/avatar.png") {
      await fs.unlink(path.resolve("backend", "uploads", user.image));
      user.image = imageFileName || user.image;
    }
    await user.save();
    const updatedUser = await User.findById(req.user._id);
    res.status(200).json({ success: true, updatedUser: { ...updatedUser._doc, password: "" } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);;
    if (!user) return res.status(404).json({ success: false, message: "User not fouund" });
    //todo: send email to verify before deleting the user
    if (user.isDeleted) return res.status(404).json({ success: false, message: "User already deleted" });
    user.isDeleted = true;
    await user.save();
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({ success: false, message: "Invalid Id" });
  console.log(req.body);
  const { name, address, phone } = req.body;
  try {
    const imageFileName = req.file?.filename;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "user not found" });
    user.name = name || user.name;
    user.address = JSON.parse(address) || user.address;
    user.phone = phone || user.phone;
    if (imageFileName && user.image === "/avatar.png") {
      user.image = imageFileName || user.image;
    } else if (imageFileName && user.image !== "/avatar.png") {
      await fs.unlink(path.resolve("backend", "uploads", user.image));
      user.image = imageFileName || user.image;
    }
    await user.save();
    const updatedUser = await User.findById(id);
    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { registerCustomer, registerUser, verifyEmail, resendVerification, loginUser, getUserProfile, updateUserProfile, deleteUser, getAllUsers, getCustomerById, updateUserById, deleteCustomerById, getMe, getAllCustomers, updateCustomerById, deleteEmployeeById, getAllEmployees, getEmployeeById, updateEmployeeById, registerEmployee, deleteAdminById, getAllAdmins, getAdminById, updateAdminById, registerAdmin, logoutUser };