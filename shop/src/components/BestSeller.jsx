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
    <div className="w-full py-16 md:py-20 lg:py-24">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestSellers.map((product, index) => (
            <div
              key={product._id}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#D9C27B]/20 hover:border-[#D9C27B]/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <FaTrophy className="text-xs" />
                  #{index + 1}
                </div>
              </div>

              {/* Sold Count Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-black/70 text-[#D9C27B] text-xs font-semibold px-3 py-1 rounded-full">
                  {product.count} sold
                </div>
              </div>

              {/* Product Image */}
              <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                <img 
                  src={product.image || '/api/placeholder/300/400'} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#D9C27B]/30 to-transparent transition-opacity duration-500 ${
                  hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'
                }`}></div>

                {/* Action Buttons */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3 transition-all duration-500 ${
                  hoveredProduct === product._id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}>
                  <button 
                    onClick={() => handleAddToWishlist(product)}
                    className="bg-black/70 hover:bg-[#D9C27B] text-white hover:text-black p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <FaHeart className="text-lg" />
                  </button>
                  <button className="bg-black/70 hover:bg-[#D9C27B] text-white hover:text-black p-3 rounded-full transition-all duration-300 hover:scale-110">
                    <FaEye className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#D9C27B] text-xs font-semibold uppercase tracking-wide">
                      {product.category}
                    </span>
                    {product.subCategory && (
                      <>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-xs">
                          {product.subCategory}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Product Name */}
                  <h3 className="text-white font-bold text-lg md:text-xl mb-3 group-hover:text-[#D9C27B] transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-[#D9C27B] text-sm" />
                    ))}
                    <span className="text-gray-400 text-sm ml-2">(4.8)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-5">
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
                  
                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className={`w-full bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B] text-[#D9C27B] py-3 px-6 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-[#D9C27B] group-hover:to-[#F4E4A6] group-hover:text-black transform ${
                      hoveredProduct === product._id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                  >
                    <FaShoppingCart className="text-sm" />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                   style={{
                     background: `linear-gradient(45deg, ${gold}, #F4E4A6, ${gold})`,
                     padding: '2px',
                     borderRadius: '1rem'
                   }}>
                <div className="w-full h-full bg-transparent rounded-2xl"></div>
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
