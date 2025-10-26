import React, { useState } from 'react';
import { FaBars, FaTimes, FaUserCircle, FaCut } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; 
import { AppContext } from '../context/AppContext'
import {useContext} from 'react'

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'SERVICES' },
  { name: 'E-SHOP', path: 'https://saloon-shop-s0r5.onrender.com' },
  { name: 'OFFER', path: '/offer' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', path: '/contact' },
];

const gold = '#D9C27B';

const Navbar = ({ setLogin, setLoginMode }) => {
  const { user, logout, sidebarOpen, toggleSidebar, closeSidebar } = useContext(AppContext);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  return (
    <div className=" flex flex-row justify-between px-6 bg-black md:justify-around md:px-0 items-center shadow-lg fixed w-full z-50">
      {/* Logo */}
      <a href="/">
      
       <div className=" flex items-center gap-2 py-4 cursor-pointer">
        <FaCut className="text-3xl animate-spin-slow" style={{ color: gold }} />
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-white tracking-wide">Me & Guys</span>
          <span className="text-xs tracking-widest font-normal" style={{ color: gold }}>U N I S E X  S A L  O N</span>
        </div>
      </div>
      
      </a>
     

      {/* Desktop Nav */}
      <div className="hidden md:flex flex-col gap-2">
        <div className="flex justify-end">
         

<a href="/appointment">
 <button 
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
          </button>
</a>

        </div>
        <div className="flex flex-row gap-6 text-white cursor-pointer">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="transition duration-200 relative group"
            >
              {link.name === 'SERVICES' ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                >
                  <span className="hover:text-[#D9C27B] transition-colors duration-200 text-white cursor-pointer">
                    {link.name}
                  </span>
                  <span
                    className="block h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                    style={{ backgroundColor: gold }}
                  />
                  
                  {/* Services Dropdown */}
                  {servicesDropdown && (
                    <div className="absolute top-full left-0  w-48 bg-black/95 backdrop-blur-xl border border-[#D9C27B]/30 rounded-xl shadow-2xl z-50 overflow-hidden">
                      <div className="py-3">
                        <NavLink
                          to="/ladies"
                          className="block px-6 py-3 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 transition-all duration-200 border-b border-[#D9C27B]/20"
                          onClick={() => setServicesDropdown(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-[#D9C27B]">👩</span>
                            <span className="font-medium">Ladies Services</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 ml-6">Hair, Beauty & Spa</p>
                        </NavLink>
                        <NavLink
                          to="/gents"
                          className="block px-6 py-3 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 transition-all duration-200"
                          onClick={() => setServicesDropdown(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-[#D9C27B]">👨</span>
                            <span className="font-medium">Gents Services</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 ml-6">Haircut, Beard & Grooming</p>
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Profile Dropdown Desktop */}
      <div className="hidden md:block relative w-32">
        {user ? (
          <div className="relative group">
            <div className="text-white cursor-pointer flex items-center gap-1 transition justify-center h-10"
              onMouseOver={e => { e.currentTarget.style.color = gold; }}
              onMouseOut={e => { e.currentTarget.style.color = '#fff'; }}
            >
              <FaUserCircle className="text-2xl" />
              <span>Profile</span>
            </div>
            {/* dropdown menu */}
            <div className="absolute top-full right-0 mt-2 w-44 bg-black bg-opacity-95 text-white text-base font-medium rounded-md shadow-lg transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
              <ul className="flex flex-col gap-1 p-2">
                <NavLink to="/my-profile" className="cursor-pointer px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#D9C27B]/20 hover:text-[#F4E4A6]" style={{ color: gold }}>My Profile</NavLink>
                <NavLink to="/my-appointments" className="cursor-pointer px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#D9C27B]/20 hover:text-[#F4E4A6]" style={{ color: gold }}>My Appointments</NavLink>
                <li onClick={logout} className="cursor-pointer px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#D9C27B]/20 hover:text-[#F4E4A6]" style={{ color: gold }}>Logout</li>
              </ul>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setLoginMode('login');
              setLogin(true);
            }}
            className="text-white cursor-pointer transition px-4 py-2 rounded-full font-semibold shadow-md flex items-center justify-center h-10 w-full"
            style={{
              color: gold,
              borderColor: gold,
              backgroundColor: 'transparent',
              borderWidth: '2px',
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
                <ul className="flex flex-col gap-1 p-2">
                  <NavLink to="/my-profile" className="cursor-pointer px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#D9C27B]/20 hover:text-[#F4E4A6]" style={{ color: gold }} onClick={() => setMobileDropdown(false)}>My Profile</NavLink>
                  <NavLink to="/my-appointments" className="cursor-pointer px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#D9C27B]/20 hover:text-[#F4E4A6]" style={{ color: gold }} onClick={() => setMobileDropdown(false)}>My Appointments</NavLink>
                  <li onClick={logout} className="cursor-pointer px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#D9C27B]/20 hover:text-[#F4E4A6]" style={{ color: gold }}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        )}
        <button onClick={toggleSidebar} className="text-3xl focus:outline-none" style={{ color: gold }}>
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full z-50 transition-transform duration-300
        bg-black/85 backdrop-blur-xl text-white
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ maxWidth: '400px' }}
      >
        <div className="mt-1 flex flex-row justify-between items-center px-4 py-4 border-b" style={{ borderColor: gold }}>
          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold" style={{ color: gold }}>Me & Guys</span>
            <span className="text-xs tracking-widest font-normal" style={{ color: gold }}>UNISEX SALON</span>
          </div>
          <button onClick={closeSidebar} className="text-2xl" style={{ color: gold }}>
            <FaTimes />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4 items-start px-6">
          {navLinks.map((link) => (
            link.name === 'SERVICES' ? (
              <div key={link.name} className="w-full">
                <div 
                  className="text-lg font-medium text-white hover:text-[#D9C27B] transition-colors duration-200 cursor-pointer flex items-center justify-between"
                  onClick={() => setServicesDropdown(!servicesDropdown)}
                >
                  <span>{link.name}</span>
                  <span className={`transform transition-transform duration-200 ${servicesDropdown ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
                
                {/* Mobile Services Dropdown */}
                {servicesDropdown && (
                  <div className="mt-3 ml-4 space-y-2">
                    <NavLink
                      to="/ladies"
                      className="block py-2 px-4 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 rounded-lg transition-all duration-200"
                      onClick={() => {
                        closeSidebar();
                        setServicesDropdown(false);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-[#D9C27B]">👩</span>
                        <span>Ladies Services</span>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/gents"
                      className="block py-2 px-4 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 rounded-lg transition-all duration-200"
                      onClick={() => {
                        closeSidebar();
                        setServicesDropdown(false);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-[#D9C27B]">👨</span>
                        <span>Gents Services</span>
                      </div>
                    </NavLink>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-lg font-medium transition-colors duration-200 ${
                    isActive ? 'text-[#D9C27B]' : 'text-white hover:text-[#D9C27B]'
                  }`
                }
                onClick={closeSidebar}
              >
                {link.name}
              </NavLink>
            )
          ))}
          <a href="/appointment" className="w-full">
            <div
              className="w-full text-center border border-2 px-4 py-2 rounded-full font-semibold transition mt-4 shadow"
              style={{
                color: gold,
                borderColor: gold,
                backgroundColor: 'transparent',
              }}
              onMouseOver={e => { e.currentTarget.style.backgroundColor = gold; e.currentTarget.style.color = '#000'; }}
              onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = gold; }}
              onClick={closeSidebar}
            >
              Book Appointment
            </div>
          </a>
          
          {/* Signup/Login Buttons for Mobile */}
          {!user && (
            <div className="w-full space-y-3 mt-6 pt-6 border-t" style={{ borderColor: gold + '40' }}>
              <button
                className="w-full text-center border border-2 px-4 py-2 rounded-full font-semibold transition shadow"
                style={{
                  color: gold,
                  borderColor: gold,
                  backgroundColor: 'transparent',
                }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = gold; e.currentTarget.style.color = '#000'; }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = gold; }}
                onClick={() => {
                  closeSidebar();
                  setLoginMode('login');
                  setLogin(true);
                }}
              >
                Login
              </button>
              <button
                className="w-full text-center px-4 py-2 rounded-full font-semibold transition shadow"
                style={{
                  color: '#000',
                  backgroundColor: gold,
                }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = '#F4E4A6'; }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = gold; }}
                onClick={() => {
                  closeSidebar();
                  setLoginMode('signup');
                  setLogin(true);
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'transparent' }}
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default Navbar;