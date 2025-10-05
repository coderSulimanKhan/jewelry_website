import jwt from "jsonwebtoken"
import ENV_VARS from "../config/ENV_VARS.js";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-jewelry"];
    if (!token) return res.status(401).json({ success: false, message: "no token provided" });
    const decode = jwt.verify(token, ENV_VARS.JWT_SECRET);
    const user = await User.findById(decode.userId);
    if (!user) return res.status(404).json({ success: false, message: "user not found" });
    if (!user.isVerified) return res.status(403).json({ success: false, message: "email is not verified" });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
}

export default protectRoute;