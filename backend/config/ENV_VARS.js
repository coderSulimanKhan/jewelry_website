import "dotenv/config"

const ENV_VARS = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  JWT_EMAIL_SECRET: process.env.JWT_EMAIL_SECRET,
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  PROD_BACKEND_URL: process.env.PROD_BACKEND_URL
};

export default Object.freeze(ENV_VARS);