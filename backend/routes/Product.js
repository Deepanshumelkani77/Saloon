const express = require("express");
const router = express.Router();
const Product= require("../models/Product");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getSubCategories
} = require('../controller/productController');

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

// Get all products in "Hair" category
router.get("/hair", async (req, res) => {
  try {
    const data = await Product.find({ category: "Hair" }); // filter only Hair category
    res.json({
      success: true,
      data
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

// Get all products in "Hair" category
router.get("/skin", async (req, res) => {
  try {
    const data = await Product.find({ category: "Skin" }); // filter only Hair category
    res.json({
      success: true,
      data
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

// Get all products in "Hair" category
router.get("/accessories", async (req, res) => {
  try {
    const data = await Product.find({ category: "Accessories" }); // filter only Hair category
    res.json({
      success: true,
      data
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



// Get all products in "Hair" category
router.get("/men", async (req, res) => {
  try {
    const data = await Product.find({ category: "Men" }); // filter only Hair category
    res.json({
      success: true,
      data
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





// Get all products in "Hair" category
router.get("/women", async (req, res) => {
  try {
    const data = await Product.find({ category: "Women" }); // filter only Hair category
    res.json({
      success: true,
      data
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



router.get("/show/:id", async (req, res) => {
  console.log("hello")
  const { id } = req.params; 
  try {
    const data = await Product.findById(id); // filter only Hair category
    res.json({
      success: true,
      data
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


// Admin CRUD Routes
router.get('/all', getAllProducts); // Get all products with optional filters
router.get('/categories', getCategories); // Get unique categories
router.get('/subcategories', getSubCategories); // Get subcategories
router.post('/create', createProduct); // Create new product
router.put('/update/:id', updateProduct); // Update product
router.delete('/delete/:id', deleteProduct); // Delete product
router.get('/:id', getProductById); // Get single product by ID

module.exports=router;