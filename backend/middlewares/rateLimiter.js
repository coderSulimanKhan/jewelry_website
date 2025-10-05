import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please slow down"
});

const adminRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: "Tpp many admin requests"
})

export { rateLimiter, adminRateLimiter };