import React, { useState, useEffect } from 'react';
import { 
  FaFilter, 
  FaSearch, 
  FaStar, 
  FaShoppingCart, 
  FaHeart, 
  FaEye,
  FaTimes
} from 'react-icons/fa';
import axios from 'axios';

const Hair = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subCategory, setSubCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const subCategories = [
    "Shampoo",
    "Conditioner", 
    "Hair Oil",
    "Treatments & Serums",
    "Hair Masks",
    "Dry Shampoo",
    "Travel Size",
    "Gifts & Bundles"
  ];

  useEffect(() => {
    fetchHairProducts();
  }, []);

  const fetchHairProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:1000/product/hair');
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError('Failed to fetch hair products');
      }
    } catch (err) {
      console.error('Error fetching hair products:', err);
      setError('Failed to load hair products');
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on subcategory and search term
  const filteredProducts = data.filter(product => {
    const matchesCategory = subCategory === "all" || product.subCategory === subCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.subCategory.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    // Add cart functionality here
  };

  const handleAddToWishlist = (product) => {
    console.log('Adding to wishlist:', product);
    // Add wishlist functionality here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D9C27B]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] flex items-center justify-center">
        <div className="text-center text-red-400">
          <p className="text-xl mb-4">{error}</p>
          <button 
            onClick={fetchHairProducts}
            className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818]">
      
      {/* Header Section */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 pt-8 pb-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B]/30 rounded-full px-6 py-2 mb-6">
            <FaStar className="text-[#D9C27B] text-sm" />
            <span className="text-[#D9C27B] font-semibold text-sm">HAIR CARE COLLECTION</span>
            <FaStar className="text-[#D9C27B] text-sm" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] bg-clip-text text-transparent">
              Premium Hair
            </span>
            <br />
            <span className="text-white">Care Products</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our professional-grade hair care collection. From nourishing shampoos to styling essentials, 
            <span className="text-[#D9C27B] font-semibold"> transform your hair</span> with salon-quality products.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search hair products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-600 rounded-full pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-2 focus:ring-[#D9C27B]/50 transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#D9C27B] transition-colors"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#D9C27B]/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-[#D9C27B]" />
            <span className="text-[#D9C27B] font-semibold">Filter by Category</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSubCategory("all")}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                subCategory === "all"
                  ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black'
                  : 'bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B] text-[#D9C27B] hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] hover:text-black'
              }`}
            >
              All Products
            </button>
            
            {subCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSubCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  subCategory === category
                    ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black'
                    : 'bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B] text-[#D9C27B] hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-gray-400 text-sm">
            Showing {filteredProducts.length} products
            {subCategory !== "all" && (
              <span className="text-[#D9C27B]"> in {subCategory}</span>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">No products found</div>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Try a different search term' : 'No products available in this category'}
            </p>
            <button
              onClick={() => {
                setSubCategory("all");
                setSearchTerm("");
              }}
              className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#D9C27B]/20 hover:border-[#D9C27B]/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl"
              >
                {/* Product Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img 
                    src={product.image || '/api/placeholder/300/400'} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => handleAddToWishlist(product)}
                      className="bg-black/70 hover:bg-[#D9C27B] text-white hover:text-black p-2 rounded-full transition-all duration-300"
                    >
                      <FaHeart className="text-sm" />
                    </button>
                    <button className="bg-black/70 hover:bg-[#D9C27B] text-white hover:text-black p-2 rounded-full transition-all duration-300">
                      <FaEye className="text-sm" />
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black text-xs font-bold px-3 py-1 rounded-full">
                      {product.subCategory}
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="space-y-3">
                    {/* Product Name */}
                    <h3 className="text-white font-bold text-lg group-hover:text-[#D9C27B] transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-[#D9C27B] text-sm" />
                      ))}
                      <span className="text-gray-400 text-sm ml-2">(4.5)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[#D9C27B] font-bold text-xl">
                          ₹{product.price}
                        </span>
                        <span className="text-gray-500 text-sm line-through">
                          ₹{Math.round(product.price * 1.2)}
                        </span>
                      </div>
                      <span className="text-green-400 text-sm font-semibold">
                        17% OFF
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black py-3 px-4 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105"
                      >
                        Buy Now
                      </button>
                      
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border-2 border-[#D9C27B] text-[#D9C27B] py-3 px-4 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] hover:text-black"
                      >
                        <FaShoppingCart className="text-sm" />
                        Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hair;
