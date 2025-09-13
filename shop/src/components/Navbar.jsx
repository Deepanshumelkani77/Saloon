import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronDown, FaCut } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Hair Care");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  const gold = '#D9C27B';

  const categories = [
    {
      name: 'Hair Care',
      items: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Mask', 'Styling Products', 'Hair Serum', 'Dry Shampoo']
    },
    {
      name: 'Skin Care',
      items: ['Cleanser', 'Moisturizer', 'Serum', 'Face Mask', 'Sunscreen', 'Toner', 'Eye Cream']
    },
    {
      name: 'Accessories',
      items: ['Hair Brushes', 'Combs', 'Hair Clips', 'Headbands', 'Scrunchies', 'Hair Ties', 'Bobby Pins']
    },
    {
      name: 'Men',
      items: ['Beard Oil', 'Aftershave', 'Hair Gel', 'Face Wash', 'Cologne', 'Shaving Cream', 'Beard Balm']
    },
    {
      name: 'Women',
      items: ['Makeup', 'Nail Care', 'Perfume', 'Hair Accessories', 'Beauty Tools', 'Lipstick', 'Foundation']
    }
  ];

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    setActiveDropdown(activeDropdown === categoryName ? null : categoryName);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
    setIsSearchOpen(false);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsSearchOpen(false);
  };

  return (
    <nav className="bg-black border-b border-[#D9C27B]/20 sticky top-0 z-50 backdrop-blur-xl h-[10vh]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - Left */}
          <div className="flex justify-start">
            <a href="/" className="flex items-center gap-3 py-2 cursor-pointer">
              <FaCut className="text-3xl md:text-4xl animate-spin-slow" style={{ color: gold }} />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide">Me & Guys</span>
                <span className="text-sm tracking-widest font-normal" style={{ color: gold }}>S H O P</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation - Center */}
          <div className=" hidden lg:flex justify-center">
            <div className=" flex items-center space-x-6 xl:space-x-8">
              {categories.map((category, index) => (
                <div key={`${category.name}-${index}`} className="relative">
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category.name)}
                    className={`px-4 py-3 text-lg font-semibold flex items-center gap-2 transition-all duration-200 whitespace-nowrap rounded-lg ${
                      activeCategory === category.name
                        ? 'text-[#D9C27B] bg-[#D9C27B]/10 border-b-2 border-[#D9C27B]'
                        : 'text-white hover:text-[#D9C27B] hover:bg-[#D9C27B]/5'
                    }`}
                  >
                    {category.name}
                    <FaChevronDown className={`text-sm transition-transform duration-200 ${
                      activeDropdown === category.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {/* Enhanced Dropdown Menu */}
                  {activeDropdown === category.name && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-80 bg-gradient-to-br from-black/98 to-gray-900/98 backdrop-blur-xl border-2 border-[#D9C27B]/30 rounded-2xl shadow-2xl z-50 overflow-hidden">
                      {/* Dropdown Header */}
                      <div className="bg-gradient-to-r from-[#D9C27B]/20 to-[#D9C27B]/10 px-6 py-4 border-b border-[#D9C27B]/20">
                        <h3 className="text-lg font-bold text-[#D9C27B] flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#D9C27B] rounded-full animate-pulse"></span>
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">Explore our premium collection</p>
                      </div>
                      
                      {/* Dropdown Items */}
                      <div className=" py-4 px-2 max-h-80 overflow-y-auto">
                        {category.items.map((item, itemIndex) => (
                          <a
                            key={`${item}-${itemIndex}`}
                            href="#"
                            className="group flex items-center gap-4 px-6 py-4 mx-2 text-base text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#D9C27B]/20 hover:to-[#D9C27B]/10 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                          >
                            <div className="w-3 h-3 bg-gradient-to-br from-[#D9C27B] to-yellow-600 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="font-medium group-hover:font-semibold transition-all duration-200">{item}</span>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-[#D9C27B] text-sm">→</span>
                            </div>
                          </a>
                        ))}
                      </div>
                      
                      {/* Dropdown Footer */}
                      <div className="bg-gradient-to-r from-[#D9C27B]/10 to-[#D9C27B]/5 px-6 py-3 border-t border-[#D9C27B]/20">
                        <button className="w-full text-center text-sm text-[#D9C27B] hover:text-white font-medium transition-colors duration-200">
                          View All {category.name} Products →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Icons - Right */}
          <div className="flex justify-end items-center space-x-4 relative">
            {/* Search Icon */}
            <div className="relative">
              <button 
                onClick={toggleSearch}
                className="text-gray-300 hover:text-[#D9C27B] p-3 transition-colors duration-200"
              >
                <FaSearch className="text-xl md:text-2xl" />
              </button>
              
              {/* Enhanced Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-3 w-96 sm:w-[28rem] bg-gradient-to-br from-black/98 to-gray-900/98 backdrop-blur-xl border-2 border-[#D9C27B]/30 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  {/* Search Header */}
                  <div className="bg-gradient-to-r from-[#D9C27B]/20 to-[#D9C27B]/10 px-6 py-4 border-b border-[#D9C27B]/20">
                    <h3 className="text-lg font-bold text-[#D9C27B] flex items-center gap-2">
                      <FaSearch className="text-base animate-pulse" />
                      Search Products
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">Find your perfect beauty essentials</p>
                  </div>
                  
                  {/* Search Input */}
                  <div className="p-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for hair care, skin care, accessories..."
                        className="w-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-2 border-gray-700 rounded-xl pl-14 pr-4 py-4 text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-2 focus:ring-[#D9C27B]/50 transition-all duration-300 text-base"
                        autoFocus
                      />
                      <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#D9C27B] text-lg" />
                    </div>
                    
                    {/* Popular Searches */}
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#D9C27B] rounded-full"></span>
                        Popular Searches
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Hair Oil', 'Face Mask', 'Shampoo', 'Moisturizer', 'Serum', 'Beard Oil'].map((term) => (
                          <button
                            key={term}
                            className="px-4 py-2 bg-gradient-to-r from-[#D9C27B]/20 to-[#D9C27B]/10 text-[#D9C27B] text-sm rounded-full hover:from-[#D9C27B]/30 hover:to-[#D9C27B]/20 hover:text-white transition-all duration-300 border border-[#D9C27B]/30 hover:border-[#D9C27B]/50"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Quick Categories */}
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#D9C27B] rounded-full"></span>
                        Quick Categories
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {['Hair Care', 'Skin Care', 'Men\'s Grooming', 'Accessories'].map((cat) => (
                          <button
                            key={cat}
                            className="group flex items-center gap-3 p-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg hover:from-[#D9C27B]/20 hover:to-[#D9C27B]/10 transition-all duration-300 border border-gray-600 hover:border-[#D9C27B]/50"
                          >
                            <div className="w-2 h-2 bg-[#D9C27B] rounded-full opacity-60 group-hover:opacity-100"></div>
                            <span className="text-gray-300 group-hover:text-white text-sm font-medium">{cat}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <button className="text-gray-300 hover:text-[#D9C27B] p-3 transition-colors duration-200">
                <FaShoppingCart className="text-xl md:text-2xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D9C27B] text-black text-sm rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* User Account */}
            <button className="text-gray-300 hover:text-[#D9C27B] p-3 transition-colors duration-200">
              <FaUser className="text-xl md:text-2xl" />
            </button>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-[#D9C27B] p-3 transition-colors duration-200"
              >
                {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-[#D9C27B]/20">
          <div className="px-4 pt-4 pb-6 space-y-3">
            
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-1 focus:ring-[#D9C27B] transition-all"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            </div>

            {/* Mobile Categories */}
            {categories.map((category, index) => (
              <div key={`mobile-${category.name}-${index}`} className="border-b border-gray-700 last:border-b-0">
                <button
                  onClick={() => handleCategoryClick(category.name)}
                  className={`w-full text-left px-4 py-4 text-lg font-semibold flex items-center justify-between transition-all duration-200 rounded-lg ${
                    activeCategory === category.name
                      ? 'text-[#D9C27B] bg-[#D9C27B]/10 border-l-4 border-[#D9C27B]'
                      : 'text-white hover:text-[#D9C27B] hover:bg-[#D9C27B]/5'
                  }`}
                >
                  {category.name}
                  <FaChevronDown className={`text-sm transition-transform duration-200 ${
                    activeDropdown === category.name ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {activeDropdown === category.name && (
                  <div className="pb-4 pl-8 space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <a
                        key={`mobile-${item}-${itemIndex}`}
                        href="#"
                        className="block px-4 py-3 text-base text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/5 rounded-lg transition-colors duration-200"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Actions */}
            <div className="flex items-center justify-around pt-6 border-t border-gray-700 mt-6">
              <button className="flex items-center gap-3 text-gray-300 hover:text-[#D9C27B] transition-colors duration-200 p-3">
                <FaShoppingCart className="text-xl" />
                <span className="text-lg font-medium">Cart ({cartCount})</span>
              </button>
              <button className="flex items-center gap-3 text-gray-300 hover:text-[#D9C27B] transition-colors duration-200 p-3">
                <FaUser className="text-xl" />
                <span className="text-lg font-medium">Account</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdowns when clicking outside */}
      {(activeDropdown || isSearchOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeAllDropdowns}
        />
      )}
    </nav>
  );
};

export default Navbar;
