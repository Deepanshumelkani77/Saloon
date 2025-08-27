import React, { useState } from 'react';
import { FaBars, FaTimes, FaUserCircle, FaCut } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; 

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'SERVICES', path: '/services' },
  { name: 'E-SHOP', path: '/shop' },
  { name: 'OFFER', path: '/offers' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', path: '/contact' },
];

const gold = '#D9C27B';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  return (
    <div className=" flex flex-row justify-between px-6 bg-black md:justify-around md:px-0 items-center shadow-lg fixed w-full z-50">
      {/* Logo */}
      <div className=" flex items-center gap-2 py-4">
        <FaCut className="text-3xl animate-spin-slow" style={{ color: gold }} />
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-white tracking-wide">Me & Guys</span>
          <span className="text-xs tracking-widest font-normal" style={{ color: gold }}>U N I S E X  S A L O O N</span>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex flex-col gap-2">
        <div className="flex justify-end">
          <div
            className="px-4 py-1 border border-2 rounded-full cursor-pointer font-semibold hover:text-black transition shadow-md"
            style={{
              color: gold,
              borderColor: gold,
              backgroundColor: 'transparent',
            }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = gold; e.currentTarget.style.color = '#000'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = gold; }}
          >
            Book Appointment
          </div>
        </div>
        <div className="flex flex-row gap-6 text-white cursor-pointer">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="transition duration-200 relative group"
            >
              <NavLink 
                to={link.path}
                className={({ isActive }) => 
                  `hover:text-[#D9C27B] transition-colors duration-200 ${isActive ? 'text-[#D9C27B]' : 'text-white'}`
                }
              >
                {link.name}
              </NavLink>
              <span
                className="block h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                style={{ backgroundColor: gold }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Profile Dropdown Desktop */}
      <div className="hidden md:block relative">
        {user ? (
          <div className="relative group">
            <div className="text-white cursor-pointer flex items-center gap-1 transition"
              onMouseOver={e => { e.currentTarget.style.color = gold; }}
              onMouseOut={e => { e.currentTarget.style.color = '#fff'; }}
            >
              <FaUserCircle className="text-2xl" />
              <span>Profile</span>
            </div>
            {/* dropdown menu */}
            <div className="absolute top-full right-0 mt-2 w-44 bg-black bg-opacity-95 text-white text-base font-medium rounded-md shadow-lg transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
              <ul className="flex flex-col gap-2 p-3">
                <li className="cursor-pointer" style={{ color: gold }}>My Profile</li>
                <li className="cursor-pointer" style={{ color: gold }}>My Appointment</li>
                <li className="cursor-pointer" style={{ color: gold }}>Logout</li>
              </ul>
            </div>
          </div>
        ) : (
          <div
            className="text-white cursor-pointer transition px-4 py-1 border rounded-full font-semibold shadow-md"
            style={{
              color: gold,
              borderColor: gold,
              backgroundColor: 'transparent',
              borderWidth: '1.5px',
              borderStyle: 'solid',
            }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = gold; e.currentTarget.style.color = '#000'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = gold; }}
          >
            Signup/Login
          </div>
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
                  <li className="cursor-pointer" style={{ color: gold }}>My Profile</li>
                  <li className="cursor-pointer" style={{ color: gold }}>My Appointment</li>
                  <li className="cursor-pointer" style={{ color: gold }}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        )}
        <button onClick={() => setIsOpen(true)} className="text-3xl focus:outline-none" style={{ color: gold }}>
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full z-50 transition-transform duration-300
        bg-black/85 backdrop-blur-xl text-white
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ maxWidth: '400px' }}
      >
        <div className="mt-1 flex flex-row justify-between items-center px-4 py-4 border-b" style={{ borderColor: gold }}>
          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold" style={{ color: gold }}>Me & Guys</span>
            <span className="text-xs tracking-widest font-normal" style={{ color: gold }}>UNISEX SALOON</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-2xl" style={{ color: gold }}>
            <FaTimes />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4 items-start px-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `text-lg font-medium transition-colors duration-200 ${
                  isActive ? 'text-[#D9C27B]' : 'text-white hover:text-[#D9C27B]'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <div
            className="w-full text-center border border-2 px-4 py-2 rounded-full font-semibold transition mt-4 shadow"
            style={{
              color: gold,
              borderColor: gold,
              backgroundColor: 'transparent',
            }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = gold; e.currentTarget.style.color = '#000'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = gold; }}
            onClick={() => setIsOpen(false)}
          >
            Book Appointment
          </div>
        </div>
      </div>

      {/* Overlay for sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'transparent' }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;