const express = require("express");
const router = express.Router();
const Product= require("../models/Product");

// Get best seller products (top 4 by count)
router.get("/bestsellers", async (req, res) => {
    try {
        const bestSellers = await Product.find()
            .sort({ count: -1 }) // Sort by count in descending order
            .limit(4) // Get only top 4 products
            .select('name image price category subCategory count'); // Select specific fields
        
        res.json({
            success: true,
            data: bestSellers
        });
    } catch (error) {
        console.error("Error fetching best sellers:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch best seller products",
            error: error.message
        });
    }
});

module.exports=router;