import React, { useState, useEffect } from 'react';
import { FaStar, FaShoppingCart, FaHeart, FaEye, FaFire, FaTrophy } from 'react-icons/fa';
import axios from 'axios';

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const gold = '#D9C27B';

  // Fetch best seller products from backend
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:1000/product/bestsellers');
        
        if (response.data.success) {
          setBestSellers(response.data.data);
        } else {
          setError('Failed to fetch best sellers');
        }
      } catch (err) {
        console.error('Error fetching best sellers:', err);
        setError('Failed to load best seller products');
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  const handleAddToCart = (product) => {
    // Add to cart functionality - to be implemented
    console.log('Adding to cart:', product);
  };

  const handleBuyNow = (product) => {
    // Buy now functionality - to be implemented
    console.log('Buy now:', product);
  };

  const handleAddToWishlist = (product) => {
    // Add to wishlist functionality - to be implemented
    console.log('Adding to wishlist:', product);
  };

  if (loading) {
    return (
      <div className="w-full py-16 md:py-20 lg:py-24">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D9C27B]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-16 md:py-20 lg:py-24">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center text-red-400">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-0 md:py-0 lg:py-0">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B]/30 rounded-full px-6 py-2 mb-6">
            <FaFire className="text-[#D9C27B] text-sm animate-pulse" />
            <span className="text-[#D9C27B] font-semibold text-sm">BEST SELLERS</span>
            <FaTrophy className="text-[#D9C27B] text-sm" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] bg-clip-text text-transparent">
              Most Popular
            </span>
            <br />
            <span className="text-white">Products</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our customers' favorite products that have earned the highest ratings and 
            <span className="text-[#D9C27B] font-semibold"> most purchases</span>. 
            These are the essentials that keep our clients coming back for more.
          </p>
        </div>

        {/* Best Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => (
            <div
              key={product._id}
              className="group relative overflow-hidden rounded-3xl bg-black border-2 border-[#D9C27B]/30 hover:border-[#D9C27B]/70 transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D9C27B]/20"
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
              <div className="relative h-90 sm:h-100 overflow-hidden rounded-t-3xl">
                <img 
                  src={product.image || '/api/placeholder/300/400'} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Rank Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                    <span className="flex items-center gap-1">
                      <FaTrophy className="text-xs" />
                      #{index + 1} Best Seller
                    </span>
                  </div>
                </div>

                {/* Sold Count Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {product.count} sold
                  </div>
                </div>
                
                {/* Enhanced Quick Actions */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <button 
                    onClick={() => handleAddToWishlist(product)}
                    className="bg-gradient-to-r from-black/80 to-gray-800/80 backdrop-blur-sm hover:from-[#D9C27B] hover:to-[#F4E4A6] text-white hover:text-black p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <FaHeart className="text-sm" />
                  </button>
                  <button className="bg-gradient-to-r from-black/80 to-gray-800/80 backdrop-blur-sm hover:from-[#D9C27B] hover:to-[#F4E4A6] text-white hover:text-black p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                    <FaEye className="text-sm" />
                  </button>
                </div>

                {/* Stock Indicator */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    ✓ In Stock
                  </div>
                </div>
              </div>

              {/* Enhanced Product Info */}
              <div className="p-6 space-y-4">
                {/* Product Name with Animation */}
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-xl leading-tight group-hover:text-[#D9C27B] transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] transition-all duration-500"></div>
                </div>
                
                {/* Enhanced Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className="text-[#D9C27B] text-base group-hover:scale-110 transition-transform duration-300" 
                        style={{ animationDelay: `${i * 50}ms` }}
                      />
                    ))}
                    <span className="text-gray-300 text-sm ml-2 font-medium">(4.8)</span>
                  </div>
                  <div className="text-gray-400 text-xs">
                    {product.count} reviews
                  </div>
                </div>

                {/* Enhanced Price Section */}
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-4 border border-[#D9C27B]/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[#D9C27B] font-bold text-2xl">
                        ₹{product.price}
                      </span>
                      <span className="text-gray-500 text-lg line-through">
                        ₹{Math.round(product.price * 1.2)}
                      </span>
                    </div>
                    <div className="text-green-400 text-sm font-bold bg-green-400/10 px-3 py-1 rounded-full">
                      SAVE ₹{Math.round(product.price * 0.2)}
                    </div>
                  </div>
                  
                  {/* Price per unit info */}
                  <div className="text-gray-400 text-xs">
                    Best price guaranteed • Free shipping over ₹999
                  </div>
                </div>
                
                {/* Enhanced Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-[#D9C27B]/30 hover:scale-105 transform relative overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F4E4A6] to-[#D9C27B] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">💳 Buy Now</span>
                  </button>
                  
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border-2 border-[#D9C27B] text-[#D9C27B] py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] hover:text-black hover:shadow-xl hover:scale-105 transform relative overflow-hidden group/btn2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] opacity-0 group-hover/btn2:opacity-100 transition-opacity duration-300"></div>
                    <FaShoppingCart className="text-sm relative z-10" />
                    <span className="relative z-10">Add to Cart</span>
                  </button>
                </div>

                {/* Additional Features */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-700/50">
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-bold py-4 px-8 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
