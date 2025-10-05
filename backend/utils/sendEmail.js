import nodemailer from "nodemailer"
import ENV_VARS from "../config/ENV_VARS.js"
import jwt from "jsonwebtoken"

const sendEmail = email => {
  const token = jwt.sign({ email }, ENV_VARS.JWT_EMAIL_SECRET, { expiresIn: "1h" });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV_VARS.SMTP_EMAIL,
      pass: ENV_VARS.SMTP_PASSWORD
    }
  });
  transporter.sendMail({
    to: email,
    subject: "Verify email",
    html: `<a href="${ENV_VARS.PROD_BACKEND_URL}/api/v1/users/verify-email/${token}">Click to verify</a>`
  });
};

export { sendEmail };