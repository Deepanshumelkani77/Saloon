const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // your user model

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
console.log(req.body);
    // check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword, phone_no: phone });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "mysecretkey", // put in .env file
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user._id, name: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update user profile
router.put("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, phone, address, dateOfBirth, profileImage, bio } = req.body;
    console.log(req.body);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        address,
        dateOfBirth,
        profileImage,
        bio
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
});


router.get("/info/:userId", async (req, res) => {

const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user info", error: error.message });
  }
});

module.exports = router;
