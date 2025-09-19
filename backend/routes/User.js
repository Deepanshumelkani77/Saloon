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
    console.log("hello",userId)
    const { username,email, phone, address, dob,  bio,image } = req.body;
    console.log(req.body);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        image,
        phone,
        address,
        dob,
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
    res.json( user );
  } catch (error) {
    res.status(500).json({ message: "Error fetching user info", error: error.message });
  }
});

// Dashboard Statistics - User Stats
router.get("/stats", async (req, res) => {

  console.log("user information");
  try {
    // Total users count
    const totalUsers = await User.countDocuments();
    
    // Users registered this month
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    
    const usersThisMonth = await User.countDocuments({
      createdAt: { $gte: currentMonth }
    });
    
    // Users registered today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const usersToday = await User.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    // Active users (users with at least one appointment)
    const Appointment = require("../models/Appointment");
    const activeUserIds = await Appointment.distinct("userId");
    const activeUsers = activeUserIds.length;

    res.json({
      totalUsers,
      usersThisMonth,
      usersToday,
      activeUsers,
      userGrowth: usersThisMonth > 0 ? ((usersThisMonth / Math.max(totalUsers - usersThisMonth, 1)) * 100).toFixed(1) : 0
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user statistics", error: error.message });
  }
});

module.exports = router;
