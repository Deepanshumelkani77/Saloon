import React, { useState } from 'react';
import { FaBars, FaTimes, FaUserCircle, FaCut } from 'react-icons/fa';

const navLinks = [
  'HOME',
  'SERVICES',
  'E-SHOP',
  'OFFER',
  'ABOUT',
  'CONTACT',
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useState(true);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  return (
    <div className="flex flex-row justify-between px-6 bg-black md:justify-around md:px-0 items-center shadow-lg fixed w-full z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 py-4">
        <FaCut className="text-yellow-600 text-3xl animate-spin-slow" />
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-white tracking-wide">Me & Guys</span>
          <span className="text-xs tracking-widest font-normal text-yellow-600">U N I S E X  S A L O O N</span>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex flex-col gap-2">
        <div className="flex justify-end">
          <div className="px-4 py-1 text-yellow-600 border border-2 border-yellow-600 rounded-full cursor-pointer font-semibold hover:bg-yellow-600 hover:text-black transition shadow-md">
            Book Appointment
          </div>
        </div>
        <div className="flex flex-row gap-6 text-white cursor-pointer">
          {navLinks.map((link) => (
            <p
              key={link}
              className="hover:text-yellow-600 transition duration-200 relative group"
            >
              {link}
              <span className="block h-0.5 bg-yellow-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </p>
          ))}
        </div>
      </div>

      {/* Profile Dropdown Desktop */}
      <div className="hidden md:block relative">
        {user ? (
          <div className="relative group">
            <div className="text-white cursor-pointer flex items-center gap-1 hover:text-yellow-600 transition">
              <FaUserCircle className="text-2xl" />
              <span>Profile</span>
            </div>
            {/* dropdown menu */}
            <div className="absolute top-full right-0 mt-2 w-44 bg-black bg-opacity-95 text-white text-base font-medium rounded-md shadow-lg transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
              <ul className="flex flex-col gap-2 p-3">
                <li className="hover:text-yellow-600 cursor-pointer">My Profile</li>
                <li className="hover:text-yellow-600 cursor-pointer">My Appointment</li>
                <li className="hover:text-yellow-600 cursor-pointer">Logout</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-white cursor-pointer hover:text-yellow-600 transition">Signup/Login</div>
        )}
      </div>

      {/* Mobile Menu Button & Dropdown */}
      <div className="md:hidden flex flex-row gap-3 items-center">
        {user && (
          <div className="relative">
            <button
              className="text-white flex items-center focus:outline-none"
              onClick={() => setMobileDropdown((prev) => !prev)}
            >
              <FaUserCircle className="text-2xl" />
            </button>
            {/* Mobile dropdown menu */}
            {mobileDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-black bg-opacity-95 text-white text-base font-medium rounded-md shadow-lg z-50 animate-fade-in">
                <ul className="flex flex-col gap-2 p-3">
                  <li className="hover:text-yellow-600 cursor-pointer">My Profile</li>
                  <li className="hover:text-yellow-600 cursor-pointer">My Appointment</li>
                  <li className="hover:text-yellow-600 cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        )}
        <button onClick={() => setIsOpen(true)} className="text-yellow-600 text-3xl focus:outline-none">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 w-3/4 h-full bg-black bg-opacity-50 text-white z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-row justify-between items-center px-4 py-4 border-b border-yellow-600">
          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold text-yellow-600">Me & Guys</span>
            <span className="text-xs tracking-widest font-normal text-yellow-600">UNISEX SALOON</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-yellow-600 text-2xl">
            <FaTimes />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4 items-start px-6">
          {navLinks.map((link) => (
            <p
              key={link}
              className="text-lg font-medium hover:text-yellow-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </p>
          ))}
          <div
            className="w-full text-center text-yellow-600 border border-yellow-600 px-4 py-2 rounded-full font-semibold hover:bg-yellow-600 hover:text-black transition mt-4 shadow"
            onClick={() => setIsOpen(false)}
          >
            Book Appointment
          </div>
        </div>
      </div>



      
      {/* Overlay for sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;

// theme: {
//   extend: {
//     animation: {
//       'spin-slow': 'spin 3s linear infinite',
//       'fade-in': 'fadeIn 0.3s ease-in',
//     },
//     keyframes: {
//       fadeIn: {
//         '0%': { opacity: 0, transform: 'translateY(-10px)' },
//         '100%': { opacity: 1, transform: 'translateY(0)' },
//       },
//     },
//   },
// }