import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer.jsx"
import {
  FaFilter,
  FaSearch,
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaTimes,
  FaTrophy
} from 'react-icons/fa';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Women = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subCategory, setSubCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [qtyMap, setQtyMap] = useState({});
  const [searchParams] = useSearchParams();
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const subCategories = [
    'Makeup',
    'Nail Care',
    'Perfume',
    'Hair Accessories',
    'Beauty Tools',
    'Lipstick',
    'Foundation'
  ];

  useEffect(() => {
    fetchWomenProducts();
  }, []);

  // Sync subcategory from URL query parameter
  useEffect(() => {
    const sub = searchParams.get('sub');
    if (sub) {
      setSubCategory(sub);
    }
  }, [searchParams]);

  const fetchWomenProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:1000/product/women');
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError('Failed to fetch women\'s products');
      }
    } catch (err) {
      console.error("Error fetching women's products:", err);
      setError("Failed to load women's products");
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on subcategory and search term
  const filteredProducts = data.filter(product => {
    const matchesCategory = subCategory === 'all' || product.subCategory === subCategory;
    const name = (product.name || '').toLowerCase();
    const sub = (product.subCategory || '').toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || sub.includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert('Please login to add to cart!');
      return;
    }
    try {
      const qty = qtyMap[productId] ?? 1;
      const res = await axios.post('http://localhost:1000/cart/add', {
        userId: user?.id,
        productId,
        quantity: qty,
      });
      if (res.data.success) {
        alert('Added to cart!');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart');
    }
  };

  const handleBuyNow = (productId) => {
    if (!user) {
      alert('Please login to buy!');
      return;
    }
    const product = data.find(p => p._id === productId);
    if (!product) return;
    
    const qty = qtyMap[productId] ?? 1;
    navigate('/order', {
      state: {
        buyNow: true,
        product: {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: qty,
          image: product.image
        }
      }
    });
  };

  const changeQty = (productId, delta) => {
    setQtyMap((prev) => {
      const current = prev[productId] ?? 1;
      const next = Math.min(10, Math.max(1, current + delta));
      if (next === current) return prev;
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToWishlist = (product) => {
    console.log('Adding to wishlist:', product);
    // TODO: Add wishlist functionality here
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
            onClick={fetchWomenProducts}
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
              Women
            </span>
            <br />
            <span className="text-white">Beauty & Essentials</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover premium beauty products for every occasion. From makeup to accessories, elevate your daily routine.
          </p>
        </div>

        {/* Top Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 rounded-2xl blur-sm"></div>
          <div className="relative bg-gray-800/60 backdrop-blur-sm border border-[#D9C27B]/40 rounded-2xl overflow-hidden">
            <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#D9C27B] text-lg" />
            <input
              type="text"
              placeholder="Search women's beauty products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent pl-16 pr-16 py-4 text-white placeholder-gray-300 text-lg focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
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
                  {subCategories.map((c) => (
                    <option key={c} value={c} className="bg-gray-800 text-white">{c}</option>
                  ))}
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
                  <p className="text-gray-300 text-sm">Filter by beauty type</p>
                </div>

                {/* Filter Buttons - Vertical Layout */}
                <div className="space-y-3">
                  {/* All Products Button */}
                  <button
                    onClick={() => setSubCategory('all')}
                    className={`w-full group relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
                      subCategory === 'all'
                        ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black shadow-lg'
                        : 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-[#D9C27B]/30 text-white hover:border-[#D9C27B] hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-xl ${subCategory === 'all' ? 'text-black' : 'text-[#D9C27B]'}`}>✨</div>
                      <div className="text-left">
                        <div className="font-bold text-sm">All Products</div>
                        <div className={`text-xs ${subCategory === 'all' ? 'text-black/70' : 'text-gray-400'}`}>View Everything</div>
                      </div>
                    </div>
                  </button>

                  {/* Category Buttons */}
                  {subCategories.map((category, index) => {
                    const icons = ['💄', '💅', '🌸', '🎀', '🧰', '👄', '🧴'];
                    const descriptions = [
                      'Cosmetics & more',
                      'Manicure & care',
                      'Fragrance & mists',
                      'Clips, bands & more',
                      'Beauty tools',
                      'Color your lips',
                      'Perfect base'
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
                    setSubCategory('all');
                    setSearchTerm('');
                  }}
                  className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300"
                >
                  Show All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id || index}
                    className="group relative overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl bg-black border border-[#D9C27B]/30 md:border-2 hover:border-[#D9C27B]/70 transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D9C27B]/20"
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
                      <a href={`/show/${product._id}`}> 
                    <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-t-xl md:rounded-t-2xl lg:rounded-t-3xl">
                      <img
                        src={product.image || '/api/placeholder/300/400'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />

                      {/* Enhanced Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                      {/* Category Badge */}
                      <div className="absolute top-2 left-2 md:top-4 md:left-4">
                        <div className="bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg">
                          <span className="flex items-center gap-0.5 md:gap-1">
                            <FaTrophy className="text-[8px] md:text-xs" />
                            <span className="hidden sm:inline">{product.category || 'Women'}</span>
                          </span>
                        </div>
                      </div>

                      {/* Discount Badge - Hidden on mobile */}
                      {product.discount && (
                        <div className="absolute top-2 right-2 md:top-4 md:right-4 hidden sm:block">
                          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full shadow-lg">
                            -{product.discount}% OFF
                          </div>
                        </div>
                      )}

                      {/* Stock Status Badge */}
                      <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                        {(product.stock || 0) === 0 ? (
                          <div className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg border border-red-300/50">
                            🚫 Out of Stock
                          </div>
                        ) : (product.stock || 0) < 10 ? (
                          <div className="bg-yellow-500/90 backdrop-blur-sm text-black text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg border border-yellow-300/50">
                            ⚠️ Low Stock
                          </div>
                        ) : (
                          <div className="bg-green-500/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg border border-green-300/50">
                            ✓ In Stock
                          </div>
                        )}
                      </div>

                      {/* Enhanced Quick Actions - Hidden on mobile */}
                      <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 hidden md:flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <button onClick={() => handleAddToWishlist(product)} className="bg-gradient-to-r from-black/80 to-gray-800/80 backdrop-blur-sm hover:from-[#D9C27B] hover:to-[#F4E4A6] text-white hover:text-black p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                          <FaHeart className="text-xs md:text-sm" />
                        </button>
                             <a href={`/show/${product._id}`}> <button  className="bg-gradient-to-r from-black/80 to-gray-800/80 backdrop-blur-sm hover:from-[#D9C27B] hover:to-[#F4E4A6] text-white hover:text-black p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                                                  <FaEye className="text-xs md:text-sm" />
                                                </button></a>
                      </div>
                    </div>
</a>


                    {/* Enhanced Product Info */}
                    <div className="p-2 sm:p-3 md:p-4 lg:p-6 space-y-2 sm:space-y-3 md:space-y-4">
                      {/* Product Name with Animation */}
                      <div className="space-y-1 md:space-y-2">
                        <h3 className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-xl leading-tight group-hover:text-[#D9C27B] transition-colors duration-300 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] transition-all duration-500"></div>
                      </div>

                      {/* Enhanced Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5 md:gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className="text-[#D9C27B] text-[10px] sm:text-xs md:text-sm lg:text-base group-hover:scale-110 transition-transform duration-300"
                              style={{ animationDelay: `${i * 50}ms` }}
                            />
                          ))}
                          <span className="text-gray-300 text-[10px] sm:text-xs md:text-sm ml-1 md:ml-2 font-medium hidden sm:inline">(4.8)</span>
                        </div>
                        <div className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs hidden md:block">
                          234 reviews
                        </div>
                      </div>

                      {/* Enhanced Price Section */}
                      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg md:rounded-xl lg:rounded-2xl p-2 sm:p-3 md:p-4 border border-[#D9C27B]/20">
                        <div className="flex items-center justify-between mb-1 md:mb-2">
                          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                            <span className="text-[#D9C27B] font-bold text-sm sm:text-base md:text-lg lg:text-2xl">
                              ₹{product.price}
                            </span>
                            <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm lg:text-lg line-through">
                              ₹{Math.round(product.price * 1.2)}
                            </span>
                          </div>
                          <div className="text-green-400 text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold bg-green-400/10 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 rounded-full">
                            SAVE ₹{Math.round(product.price * 0.2)}
                          </div>
                        </div>

                        {/* Price per unit info - Hidden on Mobile */}
                        <div className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs hidden sm:block">
                          Best price guaranteed • Free shipping over ₹999
                        </div>
                      </div>

{/* Enhanced Action Buttons */}
                      <div className="flex gap-1.5 sm:gap-2 md:gap-3 pt-1 md:pt-2">
                        <button
                          onClick={() => handleBuyNow(product._id)}
                          disabled={(product.stock || 0) === 0}
                          className="flex-1 bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black py-1.5 sm:py-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4 lg:px-6 rounded-lg md:rounded-xl lg:rounded-2xl font-bold text-[10px] sm:text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 hover:shadow-2xl hover:shadow-[#D9C27B]/30 hover:scale-105 transform relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#F4E4A6] to-[#D9C27B] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative z-10"><span className="hidden sm:inline">💳 </span>Buy</span>
                        </button>

                        <button
                          onClick={() => handleAddToCart(product._id)}
                          disabled={(product.stock || 0) === 0}
                          className="flex-1 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B] md:border-2 text-[#D9C27B] py-1.5 sm:py-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4 lg:px-6 rounded-lg md:rounded-xl lg:rounded-2xl font-bold text-[10px] sm:text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] hover:text-black hover:shadow-xl hover:scale-105 transform relative overflow-hidden group/btn2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-gradient-to-r disabled:hover:from-[#D9C27B]/20 disabled:hover:to-[#F4E4A6]/20 disabled:hover:text-[#D9C27B]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] opacity-0 group-hover/btn2:opacity-100 transition-opacity duration-300"></div>
                          <FaShoppingCart className="text-xs sm:text-sm relative z-10" />
                          <span className="relative z-10 hidden sm:inline">Add to Cart</span>
                        </button>
                      </div>

                      {/* Additional Features - Hidden on Mobile */}
                      <div className="hidden sm:flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-700/50">
                        <span className="flex items-center gap-1">
                          🚚 Free Delivery
                        </span>
                        <span className="flex items-center gap-1">
                          🔄 Easy Returns
                        </span>
                        <span className="flex items-center gap-1">
                          ⭐ Premium Quality
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Women;
