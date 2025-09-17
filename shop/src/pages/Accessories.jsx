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

const Accessories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subCategory, setSubCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const subCategories = [
    "Hair Dryers",
    "Hair Straighteners", 
    "Hair Curler",
    "Hair Brush",
    "Trimmers & Clippers",
    "Cosmetic Lenses"
  ];

  useEffect(() => {
    fetchAccessoriesProducts();
  }, []);

  const fetchAccessoriesProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:1000/product/accessories');
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError('Failed to fetch accessories products');
      }
    } catch (err) {
      console.error('Error fetching accessories products:', err);
      setError('Failed to load accessories products');
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
            onClick={fetchAccessoriesProducts}
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
         
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] bg-clip-text text-transparent">
              Premium Beauty
            </span>
            <br />
            <span className="text-white">Accessories</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our professional-grade beauty accessories collection. From styling tools to cosmetic lenses, 
            <span className="text-[#D9C27B] font-semibold"> enhance your beauty</span> with salon-quality accessories.
          </p>
        </div>

        {/* Top Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 rounded-2xl blur-sm"></div>
          <div className="relative bg-gray-800/60 backdrop-blur-sm border border-[#D9C27B]/40 rounded-2xl overflow-hidden">
            <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#D9C27B] text-lg" />
            <input
              type="text"
              placeholder="Search premium beauty accessories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent pl-16 pr-16 py-4 text-white placeholder-gray-300 text-lg focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#D9C27B] transition-all duration-300 hover:scale-110"
              >
                <FaTimes className="text-lg" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar Layout */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Select - Only visible on mobile */}
          <div className="lg:hidden mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 rounded-2xl blur-sm"></div>
              <div className="relative bg-gray-800/60 backdrop-blur-sm border border-[#D9C27B]/40 rounded-2xl overflow-hidden">
                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#D9C27B] text-sm" />
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full bg-transparent pl-12 pr-4 py-3 text-white text-sm focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="all" className="bg-gray-800 text-white">✨ All Products</option>
                  <option value="Hair Dryers" className="bg-gray-800 text-white">💨 Hair Dryers</option>
                  <option value="Hair Straighteners" className="bg-gray-800 text-white">🔥 Hair Straighteners</option>
                  <option value="Hair Curler" className="bg-gray-800 text-white">🌀 Hair Curler</option>
                  <option value="Hair Brush" className="bg-gray-800 text-white">🪥 Hair Brush</option>
                  <option value="Trimmers & Clippers" className="bg-gray-800 text-white">✂️ Trimmers & Clippers</option>
                  <option value="Cosmetic Lenses" className="bg-gray-800 text-white">👁️ Cosmetic Lenses</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#D9C27B] pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Mobile Results Counter */}
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-[#D9C27B]/30 rounded-full px-3 py-1">
                <div className="w-1.5 h-1.5 bg-[#D9C27B] rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-xs">
                  <span className="text-[#D9C27B] font-bold">{filteredProducts.length}</span> products
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Left Sidebar - Filters - Only visible on desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-black border-2 border-[#D9C27B]/30 rounded-3xl p-6 shadow-2xl">
                
                {/* Filter Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B]/50 rounded-full px-6 py-2 mb-3">
                    <FaFilter className="text-[#D9C27B]" />
                    <span className="text-[#D9C27B] font-bold">Categories</span>
                  </div>
                  <p className="text-gray-300 text-sm">Filter by accessory type</p>
                </div>
                
                {/* Filter Buttons - Vertical Layout */}
                <div className="space-y-3">
                  {/* All Products Button */}
                  <button
                    onClick={() => setSubCategory("all")}
                    className={`w-full group relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
                      subCategory === "all"
                        ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black shadow-lg'
                        : 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-[#D9C27B]/30 text-white hover:border-[#D9C27B] hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-xl ${subCategory === "all" ? 'text-black' : 'text-[#D9C27B]'}`}>✨</div>
                      <div className="text-left">
                        <div className="font-bold text-sm">All Products</div>
                        <div className={`text-xs ${subCategory === "all" ? 'text-black/70' : 'text-gray-400'}`}>View Everything</div>
                      </div>
                    </div>
                  </button>
                  
                  {/* Category Buttons */}
                  {subCategories.map((category, index) => {
                    const icons = ["💨", "🔥", "🌀", "🪥", "✂️", "👁️"];
                    const descriptions = [
                      "Dry & Style",
                      "Smooth & Sleek", 
                      "Curl & Wave",
                      "Brush & Detangle",
                      "Trim & Groom",
                      "Color & Style"
                    ];
                    
                    return (
                      <button
                        key={category}
                        onClick={() => setSubCategory(category)}
                        className={`w-full group relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
                          subCategory === category
                            ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black shadow-lg'
                            : 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-[#D9C27B]/30 text-white hover:border-[#D9C27B] hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-xl">{icons[index]}</div>
                          <div className="text-left">
                            <div className="font-bold text-sm leading-tight">{category}</div>
                            <div className={`text-xs ${subCategory === category ? 'text-black/70' : 'text-gray-400'}`}>
                              {descriptions[index]}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {/* Results Counter */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-[#D9C27B]/30 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-[#D9C27B] rounded-full animate-pulse"></div>
                    <span className="text-gray-300 text-sm">
                      <span className="text-[#D9C27B] font-bold">{filteredProducts.length}</span> products
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Products */}
          <div className="flex-1">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-black border border-[#D9C27B]/30 sm:border-2 hover:border-[#D9C27B]/70 transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D9C27B]/20"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Decorative Elements */}
                    <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#D9C27B]/20 to-[#F4E4A6]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-[#F4E4A6]/20 to-[#D9C27B]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D9C27B]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                    
                    {/* Product Image */}
                    <div className="relative h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                      <img 
                        src={product.image || '/api/placeholder/300/400'} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />
                      
                      {/* Enhanced Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                      
                      {/* Premium Badge */}
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                        <div className="bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black text-xs font-bold px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg animate-pulse">
                          <span className="flex items-center gap-1">
                            <span className="hidden sm:inline">✨</span> <span className="text-xs sm:text-xs">{product.subCategory}</span>
                          </span>
                        </div>
                      </div>

                      {/* Discount Badge */}
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg">
                          17% OFF
                        </div>
                      </div>
                      
                      {/* Enhanced Quick Actions */}
                      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <button 
                          onClick={() => handleAddToWishlist(product)}
                          className="bg-gradient-to-r from-black/80 to-gray-800/80 backdrop-blur-sm hover:from-[#D9C27B] hover:to-[#F4E4A6] text-white hover:text-black p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                        >
                          <FaHeart className="text-xs sm:text-sm" />
                        </button>
                        <button className="bg-gradient-to-r from-black/80 to-gray-800/80 backdrop-blur-sm hover:from-[#D9C27B] hover:to-[#F4E4A6] text-white hover:text-black p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                          <FaEye className="text-xs sm:text-sm" />
                        </button>
                      </div>

                      {/* Stock Indicator */}
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
                          <span className="hidden sm:inline">✓</span> In Stock
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Product Info */}
                    <div className="p-3 md:p-4 lg:p-4 xl:p-5 space-y-2 md:space-y-3 lg:space-y-1 xl:space-y-1">
                      {/* Product Name with Animation */}
                      <div className="space-y-1 md:space-y-1 lg:space-y-1 xl:space-y-2 h-12 md:h-14 lg:h-16 xl:h-20 flex flex-col justify-start">
                        <h3 className="text-white font-bold text-sm md:text-base lg:text-lg xl:text-xl leading-tight group-hover:text-[#D9C27B] transition-colors duration-300 line-clamp-2 overflow-hidden">
                          {product.name}
                        </h3>
                        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] transition-all duration-500 mt-auto"></div>
                      </div>
                      
                      {/* Enhanced Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className="text-[#D9C27B] text-xs md:text-sm lg:text-sm xl:text-base group-hover:scale-110 transition-transform duration-300" 
                              style={{ animationDelay: `${i * 50}ms` }}
                            />
                          ))}
                          <span className="text-gray-300 text-xs md:text-xs lg:text-sm xl:text-sm ml-1 md:ml-1 lg:ml-2 xl:ml-2 font-medium">(4.5)</span>
                        </div>
                        <div className="text-gray-400 text-xs hidden md:block">
                          127 reviews
                        </div>
                      </div>

                      {/* Enhanced Price Section */}
                      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl md:rounded-xl lg:rounded-2xl xl:rounded-2xl p-2 md:p-3 lg:p-3 xl:p-4 border border-[#D9C27B]/20">
                        <div className="flex items-center justify-between mb-1 md:mb-1 lg:mb-2 xl:mb-2">
                          <div className="flex items-center gap-1 md:gap-2 lg:gap-2 xl:gap-3">
                            <span className="text-[#D9C27B] font-bold text-lg md:text-xl lg:text-xl xl:text-2xl">
                              ₹{product.price}
                            </span>
                            <span className="text-gray-500 text-sm md:text-base lg:text-base xl:text-lg line-through">
                              ₹{Math.round(product.price * 1.2)}
                            </span>
                          </div>
                          <div className="text-green-400 text-xs md:text-xs lg:text-sm xl:text-sm font-bold bg-green-400/10 px-2 md:px-2 lg:px-3 xl:px-3 py-1 rounded-full">
                            SAVE ₹{Math.round(product.price * 0.2)}
                          </div>
                        </div>
                        
                      </div>
                      
                      {/* Enhanced Action Buttons */}
                      <div className="flex gap-2 md:gap-2 lg:gap-3 xl:gap-3 pt-1 md:pt-1 lg:pt-2 xl:pt-2">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black py-2 md:py-3 lg:py-3 xl:py-4 px-3 md:px-4 lg:px-5 xl:px-6 rounded-xl md:rounded-xl lg:rounded-2xl xl:rounded-2xl font-bold text-xs md:text-xs lg:text-sm xl:text-sm transition-all duration-300 flex items-center justify-center gap-1 md:gap-1 lg:gap-2 xl:gap-2 hover:shadow-2xl hover:shadow-[#D9C27B]/30 hover:scale-105 transform relative overflow-hidden group/btn"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#F4E4A6] to-[#D9C27B] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative z-10"><span className="hidden lg:inline">💳</span> Buy</span>
                        </button>
                        
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B] md:border lg:border-2 xl:border-2 text-[#D9C27B] py-2 md:py-3 lg:py-3 xl:py-4 px-3 md:px-4 lg:px-5 xl:px-6 rounded-xl md:rounded-xl lg:rounded-2xl xl:rounded-2xl font-bold text-xs md:text-xs lg:text-sm xl:text-sm transition-all duration-300 flex items-center justify-center gap-1 md:gap-1 lg:gap-2 xl:gap-2 hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] hover:text-black hover:shadow-xl hover:scale-105 transform relative overflow-hidden group/btn2"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] opacity-0 group-hover/btn2:opacity-100 transition-opacity duration-300"></div>
                          <FaShoppingCart className="text-xs md:text-xs lg:text-sm xl:text-sm relative z-10" />
                          <span className="relative z-10 hidden lg:inline"> Cart</span>
                        </button>
                      </div>

                    
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
