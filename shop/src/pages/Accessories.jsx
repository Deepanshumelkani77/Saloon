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
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="group relative bg-gradient-to-br from-gray-900/90 via-black to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden hover:border-[#D9C27B]/60 transition-all duration-500 hover:transform hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#D9C27B]/25"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Elegant Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D9C27B]/5 via-transparent to-[#F4E4A6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Premium Product Image */}
                    <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] overflow-hidden">
                      <img 
                        src={product.image || '/api/placeholder/400/500'} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      
                      {/* Sophisticated Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-black/80 backdrop-blur-md border border-[#D9C27B]/30 text-[#D9C27B] text-xs font-semibold px-3 py-1.5 rounded-full">
                          {product.subCategory}
                        </div>
                      </div>

                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          20% OFF
                        </div>
                      </div>
                      
                      {/* Quick Action Buttons */}
                      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <button 
                          onClick={() => handleAddToWishlist(product)}
                          className="bg-black/80 backdrop-blur-md border border-gray-600/50 hover:border-[#D9C27B]/60 text-white hover:text-[#D9C27B] p-2.5 rounded-full transition-all duration-300 hover:scale-110"
                        >
                          <FaHeart className="text-sm" />
                        </button>
                        <button className="bg-black/80 backdrop-blur-md border border-gray-600/50 hover:border-[#D9C27B]/60 text-white hover:text-[#D9C27B] p-2.5 rounded-full transition-all duration-300 hover:scale-110">
                          <FaEye className="text-sm" />
                        </button>
                      </div>

                      {/* Stock Status */}
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-emerald-500/90 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                          ✓ In Stock
                        </div>
                      </div>
                    </div>

                    {/* Professional Product Details */}
                    <div className="p-2 sm:p-4 lg:p-5 xl:p-6 space-y-1 sm:space-y-3 lg:space-y-3 xl:space-y-4">
                      {/* Product Title */}
                      <div className="space-y-1 sm:space-y-2">
                        <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg xl:text-lg leading-tight group-hover:text-[#D9C27B] transition-colors duration-300 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="w-0 group-hover:w-8 sm:group-hover:w-10 lg:group-hover:w-12 xl:group-hover:w-12 h-0.5 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] transition-all duration-500"></div>
                      </div>
                      
                      {/* Rating & Reviews - Hidden on Mobile */}
                      <div className="hidden sm:flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className="text-[#D9C27B] text-sm" 
                            />
                          ))}
                          <span className="text-gray-400 text-sm lg:text-sm xl:text-sm ml-2 lg:ml-2 xl:ml-2 font-medium">4.8</span>
                        </div>
                        <span className="text-gray-500 text-sm lg:text-sm xl:text-sm">
                          (234 reviews)
                        </span>
                      </div>

                      {/* Pricing Section */}
                      <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-xl sm:rounded-xl lg:rounded-2xl xl:rounded-2xl p-2 sm:p-3 lg:p-4 xl:p-4 border border-gray-700/30">
                        <div className="flex items-center justify-between mb-0 sm:mb-1 lg:mb-2 xl:mb-2">
                          <div className="flex items-baseline gap-1 sm:gap-1 lg:gap-2 xl:gap-2">
                            <span className="text-[#D9C27B] font-bold text-lg sm:text-xl lg:text-2xl xl:text-2xl">
                              ₹{product.price}
                            </span>
                            <span className="text-gray-500 text-sm sm:text-base lg:text-lg xl:text-lg line-through">
                              ₹{Math.round(product.price * 1.25)}
                            </span>
                          </div>
                          <div className="text-emerald-400 text-xs sm:text-xs lg:text-sm xl:text-sm font-semibold bg-emerald-400/10 px-2 sm:px-2 lg:px-3 xl:px-3 py-1 rounded-full">
                            Save ₹{Math.round(product.price * 0.25)}
                          </div>
                        </div>
                        <div className="text-gray-400 text-xs sm:text-xs lg:text-xs xl:text-xs hidden sm:block">
                          Free shipping • Easy returns
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 sm:gap-2 lg:gap-3 xl:gap-3 pt-0 sm:pt-1 lg:pt-2 xl:pt-2">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] hover:from-[#F4E4A6] hover:to-[#D9C27B] text-black font-bold py-2 sm:py-2 lg:py-3 xl:py-3 px-2 sm:px-3 lg:px-4 xl:px-4 rounded-xl sm:rounded-xl lg:rounded-2xl xl:rounded-2xl text-xs sm:text-sm lg:text-sm xl:text-sm transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1 lg:gap-2 xl:gap-2 hover:shadow-lg hover:shadow-[#D9C27B]/30 hover:scale-[1.02] transform"
                        >
                          <span>Buy Now</span>
                        </button>
                        
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-transparent border-2 border-[#D9C27B]/60 hover:bg-[#D9C27B]/10 text-[#D9C27B] font-bold py-2 sm:py-2 lg:py-3 xl:py-3 px-2 sm:px-3 lg:px-4 xl:px-4 rounded-xl sm:rounded-xl lg:rounded-2xl xl:rounded-2xl text-xs sm:text-sm lg:text-sm xl:text-sm transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1 lg:gap-2 xl:gap-2 hover:border-[#D9C27B] hover:scale-[1.02] transform"
                        >
                          <FaShoppingCart className="text-xs sm:text-sm lg:text-sm xl:text-sm" />
                          <span className="hidden sm:inline lg:inline xl:inline">Add to Cart</span>
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
