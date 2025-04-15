import Food from "../models/food.js";  // ✅ Make sure file is named exactly food.js
import User from "../models/user.js";  // ✅ And user.js

import express from "express";
const router = express.Router();

router.get("/donations", async (req, res) => {
  try {
    const donations = await Food.find().populate("user", "name email number");
    res.json(donations);
  } catch (error) {
    console.error("Donation Fetch Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});


// DELETE a donation
router.delete("/donations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Food.findByIdAndDelete(id);
    res.json({ message: "Donation removed" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting donation" });
  }
});

export default router;
