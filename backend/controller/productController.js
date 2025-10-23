const Product = require('../models/Product');

// Get all products with optional filters
const getAllProducts = async (req, res) => {
  try {
    const { category, subCategory, gender } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (gender) filter.gender = gender;
    
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch products', 
      error: error.message 
    });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch product', 
      error: error.message 
    });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const { name, image, size, price, category, subCategory, gender, brand, stock } = req.body;
    
    // Validation
    if (!name || !price || !category || !subCategory || !gender) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields', 
        required: ['name', 'price', 'category', 'subCategory', 'gender'] 
      });
    }

    const newProduct = new Product({
      name,
      image: image || '',
      size: size || 0,
      price: parseFloat(price),
      category,
      subCategory,
      gender,
      brand: brand || '',
      stock: stock || 0,
      count: 0 // Initialize purchase count to 0
    });

    const savedProduct = await newProduct.save();
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create product', 
      error: error.message 
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, size, price, category, subCategory, gender, brand, stock } = req.body;
    
    // Validation
    if (!name || !price || !category || !subCategory || !gender) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields', 
        required: ['name', 'price', 'category', 'subCategory', 'gender'] 
      });
    }

    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        image: image || product.image,
        size: size || 0,
        price: parseFloat(price),
        category,
        subCategory,
        gender,
        brand: brand || '',
        stock: stock !== undefined ? stock : product.stock
        // count is NOT updated here - it's only for purchase tracking
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to update product', 
      error: error.message 
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    await Product.findByIdAndDelete(id);
    
    res.status(200).json({ 
      success: true,
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete product', 
      error: error.message 
    });
  }
};

// Get unique categories
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch categories', 
      error: error.message 
    });
  }
};

// Get unique subcategories
const getSubCategories = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const subCategories = await Product.distinct('subCategory', filter);
    
    res.status(200).json({
      success: true,
      data: subCategories
    });
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch subcategories', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getSubCategories
};
