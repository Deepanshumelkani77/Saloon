import React, { useState, useEffect, useContext } from 'react';
import { FaStar, FaShoppingCart, FaHeart, FaEye, FaFire, FaTrophy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const gold = '#D9C27B';

  // Hide scrollbar CSS
  const scrollContainerStyle = {
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE and Edge
    WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
  };

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

  const handleAddToCart = async (product) => {
    if (!user) {
      alert('Please login to add to cart!');
      return;
    }
    try {
      const res = await axios.post('http://localhost:1000/cart/add', {
        userId: user?.id,
        productId: product._id,
        quantity: 1
      });
      if (res.data.success) {
        alert('Added to cart!');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart');
    }
  };

  const handleBuyNow = (product) => {
    if (!user) {
      alert('Please login to buy!');
      return;
    }
    
    navigate('/order', {
      state: {
        buyNow: true,
        product: {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        }
      }
    });
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
    <>
      {/* Hide scrollbar for WebKit browsers */}
      <style>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
    <div className="w-full py-0 md:py-0 lg:py-0">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B]/30 rounded-full px-3 py-1.5 md:px-6 md:py-2 mb-4 md:mb-6">
            <FaFire className="text-[#D9C27B] text-xs md:text-sm animate-pulse" />
            <span className="text-[#D9C27B] font-semibold text-xs md:text-sm">BEST SELLERS</span>
            <FaTrophy className="text-[#D9C27B] text-xs md:text-sm" />
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white mb-3 md:mb-6">
            <span className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] bg-clip-text text-transparent">
              Most Popular
            </span>
            <br />
            <span className="text-white">Products</span>
          </h1>
          
          <p className="text-gray-300 text-sm md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Discover our customers' favorite products that have earned the highest ratings and 
            <span className="text-[#D9C27B] font-semibold"> most purchases</span>. 
            These are the essentials that keep our clients coming back for more.
          </p>
        </div>

        {/* Best Sellers Horizontal Scroll */}
        <div className="relative">
          {/* Scroll Container */}
          <div 
            className="scroll-container flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
            style={scrollContainerStyle}
          >
          {bestSellers.map((product, index) => (
            <div
              key={product._id}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl bg-black border border-[#D9C27B]/30 md:border-2 hover:border-[#D9C27B]/70 transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D9C27B]/20 flex-shrink-0 w-[45%] sm:w-[45%] md:w-[30%] lg:w-[23%] snap-start"
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
              <div className="relative h-40 sm:h-56 md:h-72 lg:h-90 overflow-hidden rounded-t-xl md:rounded-t-2xl lg:rounded-t-3xl">
                <img 
                  src={product.image || '/api/placeholder/300/400'} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Rank Badge */}
                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                  <div className="bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg">
                    <span className="flex items-center gap-0.5 md:gap-1">
                      <FaTrophy className="text-[8px] md:text-xs" />
                      <span className="hidden sm:inline">#{index + 1}</span>
                      <span className="sm:hidden">#{index + 1}</span>
                    </span>
                  </div>
                </div>

                {/* Sold Count Badge - Hidden on mobile */}
                <div className="absolute top-2 right-2 md:top-4 md:right-4 hidden sm:block">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full shadow-lg">
                    {product.count} sold
                  </div>
                </div>

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
                  
                  <button className="bg-gradient-to-r from-black/80 to-gray-800/80 backdrop-blur-sm hover:from-[#D9C27B] hover:to-[#F4E4A6] text-white hover:text-black p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                    <FaEye className="text-xs md:text-sm" />
                  </button>
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
                    {product.count} reviews
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
                  
                  {/* Price per unit info - Hidden on mobile */}
                  <div className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs hidden sm:block">
                    Best price guaranteed • Free shipping over ₹999
                  </div>
                </div>
                
                {/* Enhanced Action Buttons */}
                <div className="flex gap-1.5 sm:gap-2 md:gap-3 pt-1 md:pt-2">
                  <button 
                    onClick={() => handleBuyNow(product)}
                    disabled={(product.stock || 0) === 0}
                    className="flex-1 bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black py-1.5 sm:py-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4 lg:px-6 rounded-lg md:rounded-xl lg:rounded-2xl font-bold text-[10px] sm:text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 hover:shadow-2xl hover:shadow-[#D9C27B]/30 hover:scale-105 transform relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F4E4A6] to-[#D9C27B] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10"><span className="hidden sm:inline">💳 </span>Buy</span>
                  </button>
                  
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B] md:border-2 text-[#D9C27B] py-1.5 sm:py-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4 lg:px-6 rounded-lg md:rounded-xl lg:rounded-2xl font-bold text-[10px] sm:text-xs md:text-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] hover:text-black hover:shadow-xl hover:scale-105 transform relative overflow-hidden group/btn2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] opacity-0 group-hover/btn2:opacity-100 transition-opacity duration-300"></div>
                    <FaShoppingCart className="text-[10px] sm:text-xs md:text-sm relative z-10" />
                    <span className="relative z-10 hidden sm:inline">Cart</span>
                  </button>
                </div>

                {/* Additional Features - Hidden on mobile */}
                <div className="hidden md:flex items-center justify-between text-[9px] md:text-xs text-gray-400 pt-2 border-t border-gray-700/50">
                  <span className="flex items-center gap-1">
                    🚚 Free Delivery
                  </span>
                  <span className="flex items-center gap-1">
                    🔄 Easy Returns
                  </span>
                  <span className="flex items-center gap-1">
                    ⭐ Premium
                  </span>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-6 sm:mt-8 md:mt-12">
          <button className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-bold py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base md:text-lg">
            View All Products
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default BestSeller;
