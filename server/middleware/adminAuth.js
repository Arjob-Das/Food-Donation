const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "admin_secret"); 
    if (decoded.role !== "admin") throw new Error("Not an admin");
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = adminAuth;
F   