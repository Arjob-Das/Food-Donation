const jwt = require("jsonwebtoken");
const Food = require("../models/food");
const User = require("../models/user");

exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@donate.com" && password === "admin123") {
    const token = jwt.sign({ email, role: "admin" }, "admin_secret", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

exports.getAllDonations = async (req, res) => {
  const donations = await Food.find();
  res.json(donations);
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ role: { $ne: "admin" } });
  res.json(users);
};
