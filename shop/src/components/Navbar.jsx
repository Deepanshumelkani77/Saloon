import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaChevronDown, FaCut, FaUserCircle } from 'react-icons/fa';
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);

  const gold = '#D9C27B';

  const categories = [
    {
      name: 'Hair Care',
      path:'/hair',
      items: [   "Shampoo",
    "Conditioner", 
    "Hair Oil",
    "Treatments & Serums",
    "Hair Masks",
    "Dry Shampoo",
    "Travel Size",
    "Gifts & Bundles"]
    },
    {
      name: 'Skin Care',
      path:'/skin',
      items: ["Moisturisers",
    "Cleansers", 
    "Suncare & Spf",
    "Eyecare & Creams",
    "Face Serums",
    "Face & Sheet Masks",
    "Toners",
    "Face Oils"]
    },
    {
      name: 'Accessories',
      path:'/accessories',
      items: [   "Hair Dryers",
    "Hair Straighteners", 
    "Hair Curler",
    "Hair Brush",
    "Trimmers & Clippers",
    "Cosmetic Lenses"]
    },
    {
      name: 'Men',
      path:'/men',
      items: ['Beard Oil', 'Aftershave', 'Hair Gel', 'Face Wash', 'Cologne', 'Shaving Cream', 'Beard Balm']
    },
    {
      name: 'Women',
      path:'/women',
      items: ['Makeup', 'Nail Care', 'Perfume', 'Hair Accessories', 'Beauty Tools', 'Lipstick', 'Foundation']
    }
  ];

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    setActiveDropdown(activeDropdown === categoryName ? null : categoryName);
  };

  const handleCategoryHover = (categoryName) => {
    setActiveCategory(categoryName);
    setActiveDropdown(categoryName);
  };

  const handleCategoryLeave = () => {
    setActiveDropdown(null);
    setActiveCategory("");
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };


  const {user, logout}=useContext(AppContext)
  console.log(user);

  // Load cart count from backend
  useEffect(() => {
    const fetchCount = async () => {
      try {
        if (!user?.id) { setCartCount(0); return; }
        const res = await axios.get(`http://localhost:1000/cart/${user.id}`)
        if (res.data?.success) {
          const items = res.data.cart?.items || []
          const count = items.reduce((sum, it) => sum + (it.quantity || 1), 0)
          setCartCount(count)
        } else {
          setCartCount(0)
        }
      } catch {
        setCartCount(0)
      }
    }
    fetchCount()
  }, [user])
  return (
    <nav className="bg-black border-b border-[#D9C27B]/20 sticky top-0 z-50 backdrop-blur-xl h-[10vh]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          
       
  
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
                <div 
                  key={`${category.name}-${index}`} 
                  className="relative"
                  onMouseEnter={() => handleCategoryHover(category.name)}
                  onMouseLeave={handleCategoryLeave}
                >

                  <a href={category.path}> <button
                    type="button"
                    className={`cursor-pointer px-4 py-3 text-lg font-semibold flex items-center gap-2 transition-all duration-200 whitespace-nowrap rounded-lg ${
                      activeCategory === category.name
                        ? 'text-[#D9C27B] bg-[#D9C27B]/10 border-b-2 border-[#D9C27B]'
                        : 'text-white hover:text-[#D9C27B] hover:bg-[#D9C27B]/5'
                    }`}
                  >
                    {category.name}
                    <FaChevronDown className={`text-sm transition-transform duration-200 ${
                      activeDropdown === category.name ? 'rotate-180' : ''
                    }`} />
                  </button></a>
                 
                  
                  {/* Enhanced Dropdown Menu */}
                  {activeDropdown === category.name && (
                    <div className="absolute top-10.5 left-1/2 transform -translate-x-1/2 mt-3 w-80 bg-gradient-to-br from-black/98 to-gray-900/98 backdrop-blur-xl border-2 border-[#D9C27B]/30 rounded-2xl shadow-2xl z-50 overflow-hidden">
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
                          <Link
                            key={`${item}-${itemIndex}`}
                            to={`${category.path}?sub=${encodeURIComponent(item)}`}
                            onClick={closeAllDropdowns}
                            className="group flex items-center gap-4 px-6 py-4 mx-2 text-base text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#D9C27B]/20 hover:to-[#D9C27B]/10 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                          >
                            <div className="w-3 h-3 bg-gradient-to-br from-[#D9C27B] to-yellow-600 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="font-medium group-hover:font-semibold transition-all duration-200">{item}</span>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-[#D9C27B] text-sm">→</span>
                            </div>
                          </Link>
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
            {/* Cart */}
            <div className="relative">
              <Link to="/cart">
              <button className="text-gray-300 hover:text-[#D9C27B] p-3 transition-colors duration-200">
                <FaShoppingCart className="text-xl md:text-2xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D9C27B] text-black text-sm rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              </Link>
            </div>

            {/* Profile */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="text-gray-300 hover:text-[#D9C27B] p-3 transition-colors duration-200 flex items-center gap-2"
              >
                <FaUserCircle className="text-2xl" />
                <span className="hidden xl:block text-sm">
                  {user ? ( user.name || 'Account') : 'Account'}
                </span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-black/98 to-gray-900/98 backdrop-blur-xl border-2 border-[#D9C27B]/30 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#D9C27B]/20">
                    <div className="text-sm text-gray-400">Signed in as</div>
                    <div className="text-white font-semibold truncate">{user ? (user.email || user.name) : 'Guest'}</div>
                  </div>
                  <div className="py-2">
                    <Link to="/my-order" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-[#D9C27B]/10">My Orders</Link>
                    <Link to="/cart" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-[#D9C27B]/10">View Cart</Link>
                  </div>
                  <div className="border-t border-[#D9C27B]/20">
                    {user ? (
                      <button onClick={logout} className="w-full text-left px-4 py-3 text-red-400 hover:text-white hover:bg-red-500/10">Logout</button>
                    ) : (
                      <Link to="/login" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-[#D9C27B]/10">Login</Link>
                    )}
                  </div>
                </div>
              )}
            </div>

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
            
            {/* Mobile Search removed */}

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
                      <Link
                        key={`mobile-${item}-${itemIndex}`}
                        to={`${category.path}?sub=${encodeURIComponent(item)}`}
                        onClick={toggleMobileMenu}
                        className="block px-4 py-3 text-base text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/5 rounded-lg transition-colors duration-200"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Actions */}
            <div className="flex items-center justify-around pt-6 border-t border-gray-700 mt-6">
              <Link to="/cart" className="flex items-center gap-3 text-gray-300 hover:text-[#D9C27B] transition-colors duration-200 p-3">
                <FaShoppingCart className="text-xl" />
                <span className="text-lg font-medium">Cart ({cartCount})</span>
              </Link>
              <div className="flex items-center gap-3 text-gray-300 p-3">
                <FaUserCircle className="text-xl" />
                {user ? (
                  <Link to="/my-order" onClick={toggleMobileMenu} className="text-lg hover:text-[#D9C27B]">My Orders</Link>
                ) : (
                  <Link to="/login" onClick={toggleMobileMenu} className="text-lg hover:text-[#D9C27B]">Login</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay removed (search disabled) */}
    </nav>
  );
};

export default Navbar;
