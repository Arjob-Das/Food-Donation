import { Router } from "express";

import Food from "../models/food.js";
import User from "../models/user.js";
import Org from "../models/org.js";

const router = Router();

// Route to handle food donation form submission
router.post("/fooddonation", async (req, res) => {
  try {
    const {
      foodName,
      foodTag,
      quantity,
      expiryDate,
      address,
      email,
      orgType,
      orgName,
    } = req.body.formData;

    // Find the user based on email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create and save the food donation
    const food = await Food.create({
      foodName,
      quantity,
      expiryDate,
      address,
      foodTag,
      user: user._id,
    });

    // Save food reference in user schema
    user.food.push(food._id);
    await user.save();

    // Find or create the organization
    let org = await Org.findOne({ orgName, orgType });

    if (!org) {
      org = await Org.create({ orgName, orgType, donations: [] });
    }

    // Check if the user already exists in donations
    const userDonation = org.donations.find(
      (donation) => donation.user.toString() === user._id.toString()
    );

    if (userDonation) {
      // If user exists, add the new food item to their array
      userDonation.foods.push(food._id);
    } else {
      // If user does not exist in donations, add a new entry
      org.donations.push({ user: user._id, foods: [food._id] });
    }

    // Save the updated org document
    await org.save();

    res.status(201).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
