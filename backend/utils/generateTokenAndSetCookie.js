import jwt from "jsonwebtoken"
import ENV_VARS from "../config/ENV_VARS.js";

const generateTokenAndSetCookie = (id, role, res) => {
  //* Generating token
  const token = jwt.sign({ userId: id, role: role }, ENV_VARS.JWT_SECRET, { expiresIn: "10d" });
  //* Setting cookie
  res.cookie("jwt-jewelry", token, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: true, secure: ENV_VARS != "development" });
  return token;
}

export { generateTokenAndSetCookie };