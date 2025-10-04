import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "To many regitration attempts, please try again later"
});

export { rateLimiter };