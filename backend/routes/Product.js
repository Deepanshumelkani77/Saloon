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
        console.log(bestSellers);
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

// Get hair category products with filtering
router.get("/hair", async (req, res) => {
    try {
        const { subCategory, sortBy = 'name', order = 'asc', minPrice, maxPrice } = req.query;
        
        // Build filter object
        let filter = { category: 'Hair Care' };
        
        if (subCategory && subCategory !== 'all') {
            filter.subCategory = subCategory;
        }
        
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        
        // Build sort object
        let sortObj = {};
        sortObj[sortBy] = order === 'desc' ? -1 : 1;
        
        const hairProducts = await Product.find(filter)
            .sort(sortObj)
            .select('name image price category subCategory for count brand');
        
        // Get unique subcategories for filter options
        const allSubCategories = await Product.distinct('subCategory', { category: 'Hair Care' });
        
        res.json({
            success: true,
            data: {
                products: hairProducts,
                subcategories: allSubCategories,
                totalCount: hairProducts.length
            }
        });
    } catch (error) {
        console.error("Error fetching hair products:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch hair products",
            error: error.message
        });
    }
});

module.exports=router;