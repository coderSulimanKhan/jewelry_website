const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ success: false, message: "Admin access only" });
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { isAdmin };