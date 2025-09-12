import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronDown, FaCut } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const gold = '#D9C27B';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (category) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  const categories = [
    {
      name: 'Hair Care',
      items: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Mask', 'Styling Products']
    },
    {
      name: 'Skin Care',
      items: ['Cleanser', 'Moisturizer', 'Serum', 'Face Mask', 'Sunscreen']
    },
    {
      name: 'Accessories',
      items: ['Hair Brushes', 'Combs', 'Hair Clips', 'Headbands', 'Scrunchies']
    },
    {
      name: 'Men',
      items: ['Beard Oil', 'Aftershave', 'Hair Gel', 'Face Wash', 'Cologne']
    },
    {
      name: 'Women',
      items: ['Makeup', 'Nail Care', 'Perfume', 'Hair Accessories', 'Beauty Tools']
    }
  ];

  return (
    <nav className="bg-black border-b border-[#D9C27B]/20 sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center gap-2 py-2 cursor-pointer">
              <FaCut className="text-2xl md:text-3xl animate-spin-slow" style={{ color: gold }} />
              <div className="flex flex-col">
                <span className="text-lg md:text-2xl lg:text-3xl font-bold text-white tracking-wide">Me & Guys</span>
                <span className="text-xs tracking-widest font-normal" style={{ color: gold }}>S H O P</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-4 xl:ml-10 flex items-baseline space-x-4 xl:space-x-8">
              {categories.map((category) => (
                <div key={category.name} className="relative group">
                  <button
                    onClick={() => toggleDropdown(category.name)}
                    className="text-gray-300 hover:text-[#D9C27B] px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium flex items-center gap-1 transition-colors duration-200"
                  >
                    {category.name}
                    <FaChevronDown className={`text-xs transition-transform duration-200 ${
                      activeDropdown === category.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {activeDropdown === category.name && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-[#D9C27B]/20 rounded-lg shadow-xl z-50">
                      <div className="py-2">
                        {category.items.map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 transition-colors duration-200"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search - Hidden on small screens, shown on medium+ */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-1 focus:ring-[#D9C27B] transition-all w-48 lg:w-64"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Search Icon for mobile */}
            <button className="md:hidden text-gray-300 hover:text-[#D9C27B] p-2 transition-colors duration-200">
              <FaSearch className="text-lg" />
            </button>

            {/* Cart */}
            <div className="relative">
              <button className="text-gray-300 hover:text-[#D9C27B] p-2 transition-colors duration-200">
                <FaShoppingCart className="text-lg md:text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D9C27B] text-black text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* User Account */}
            <button className="text-gray-300 hover:text-[#D9C27B] p-2 transition-colors duration-200">
              <FaUser className="text-lg md:text-xl" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-[#D9C27B] p-2 transition-colors duration-200"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-[#D9C27B]/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-1 focus:ring-[#D9C27B] transition-all"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Mobile Categories */}
            {categories.map((category) => (
              <div key={category.name}>
                <button
                  onClick={() => toggleDropdown(category.name)}
                  className="w-full text-left text-gray-300 hover:text-[#D9C27B] block px-3 py-2 text-base font-medium flex items-center justify-between transition-colors duration-200"
                >
                  {category.name}
                  <FaChevronDown className={`text-xs transition-transform duration-200 ${
                    activeDropdown === category.name ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {activeDropdown === category.name && (
                  <div className="pl-6 space-y-1">
                    {category.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-3 py-2 text-sm text-gray-400 hover:text-[#D9C27B] transition-colors duration-200"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Actions */}
            <div className="flex items-center justify-around pt-4 border-t border-gray-700 mt-4">
              <button className="flex items-center gap-2 text-gray-300 hover:text-[#D9C27B] transition-colors duration-200">
                <FaShoppingCart />
                <span>Cart ({cartCount})</span>
              </button>
              <button className="flex items-center gap-2 text-gray-300 hover:text-[#D9C27B] transition-colors duration-200">
                <FaUser />
                <span>Account</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
