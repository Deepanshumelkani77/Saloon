const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // your user model


// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
console.log(req.body);
    // check if user already exists
    let existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ username, email, password: hashedPassword, phone_no: phone });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // create JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      "mysecretkey", // put in .env file
      { expiresIn: "1h" }
    );

    res.json({ token, admin: { id: admin._id, name: admin.username, email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update admin profile
router.put("/profile/:adminId", async (req, res) => {
  try {
    const { adminId } = req.params;
    const { username,email, phone, address, dob,  bio,image } = req.body;
    console.log(req.body);

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
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

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedAdmin
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
});


router.get("/info/:userId", async (req, res) => {

const { userId } = req.params;
  try {
    const admin = await Admin.findById(userId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json( admin );
  } catch (error) {
    res.status(500).json({ message: "Error fetching user info", error: error.message });
  }
});





module.exports = router;