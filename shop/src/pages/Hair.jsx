import React, { useState, useEffect } from 'react';
import { 
  FaFilter, 
  FaSearch, 
  FaStar, 
  FaShoppingCart, 
  FaHeart, 
  FaEye, 
  FaSort, 
  FaTh, 
  FaList,
  FaTimes,
  FaChevronDown
} from 'react-icons/fa';
import axios from 'axios';

const Hair = () => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    subCategory: 'all',
    sortBy: 'name',
    order: 'asc',
    minPrice: '',
    maxPrice: ''
  });
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const gold = '#D9C27B';

  // Fetch hair products from backend
  useEffect(() => {
    fetchHairProducts();
  }, [filters]);

  const fetchHairProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] && filters[key] !== 'all') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await axios.get(`http://localhost:1000/product/hair?${queryParams}`);
      
      if (response.data.success) {
        setProducts(response.data.data.products);
        setSubcategories(response.data.data.subcategories);
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

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      subCategory: 'all',
      sortBy: 'name',
      order: 'asc',
      minPrice: '',
      maxPrice: ''
    });
    setSearchTerm('');
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
  };

  const handleAddToWishlist = (product) => {
    console.log('Adding to wishlist:', product);
  };

  // Filter products by search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {/* Search and Filter Bar */}
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#D9C27B]/20 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search hair products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-full pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-2 focus:ring-[#D9C27B]/50 transition-all duration-300"
              />
            </div>

            {/* Filter Toggle & View Mode */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B] text-[#D9C27B] px-4 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] hover:text-black"
              >
                <FaFilter className="text-sm" />
                Filters
                <FaChevronDown className={`text-sm transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex items-center gap-2 bg-gray-800/50 rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-[#D9C27B] text-black' 
                      : 'text-gray-400 hover:text-[#D9C27B]'
                  }`}
                >
                  <FaTh className="text-sm" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-[#D9C27B] text-black' 
                      : 'text-gray-400 hover:text-[#D9C27B]'
                  }`}
                >
                  <FaList className="text-sm" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-[#D9C27B]/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Subcategory Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
                  <select
                    value={filters.subCategory}
                    onChange={(e) => handleFilterChange('subCategory', e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-[#D9C27B] focus:outline-none transition-all duration-300"
                  >
                    <option value="all">All Categories</option>
                    {subcategories.map((sub, index) => (
                      <option key={index} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-[#D9C27B] focus:outline-none transition-all duration-300"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="count">Popularity</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Min Price</label>
                  <input
                    type="number"
                    placeholder="₹0"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="₹5000"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-gray-400 hover:text-[#D9C27B] transition-colors duration-300"
                >
                  <FaTimes className="text-sm" />
                  Clear Filters
                </button>
                <span className="text-gray-400 text-sm">
                  {filteredProducts.length} products found
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">No products found</div>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#D9C27B]/20 hover:border-[#D9C27B]/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl ${
                  viewMode === 'list' ? 'flex gap-6 p-6' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'h-64 sm:h-72'
                }`}>
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

                  {/* Sale Badge */}
                  {product.count > 50 && (
                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black text-xs font-bold px-3 py-1 rounded-full">
                        Popular
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className={`${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
                  <div className="space-y-3">
                    {/* Category & Brand */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-[#D9C27B] font-semibold">{product.subCategory}</span>
                      {product.brand && (
                        <>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">{product.brand}</span>
                        </>
                      )}
                    </div>

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
