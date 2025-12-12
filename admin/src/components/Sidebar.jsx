import React, { useState, useContext } from 'react'
import {useContext} from 'react'
import {AppContext} from '../context/AppContext'
import { useLocation, Link, NavLink } from 'react-router-dom'

import { 
  FaTachometerAlt, 
  FaCalendarAlt, 
  FaCut, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaUserCircle,
  FaComments,
  FaStore,
  FaBell,
  FaTimes,
  FaHome,
  FaClipboardList,
  FaCommentAlt,
  FaUser,
  FaBox
} from 'react-icons/fa'

const Sidebar = ({ }) => {

   const { setOpenLogin,admin, sidebarOpen, closeSidebar,logout } = useContext(AppContext);
  const location = useLocation()
  const gold = '#D9C27B'

  // Navigation items
  const navItems = [
    { to: '/', icon: <FaHome className="mr-3" />, text: 'Dashboard' },
    { to: '/appointments', icon: <FaCalendarAlt className="mr-3" />, text: 'Appointments' },
    { to: '/services', icon: <FaCut className="mr-3" />, text: 'Services' },
    { to: '/staff', icon: <FaUsers className="mr-3" />, text: 'Staff Management' },
    { to: '/orders', icon: <FaClipboardList className="mr-3" />, text: 'Orders' },
    { to: '/inventory', icon: <FaBox className="mr-3" />, text: 'Inventory' },
    { to: '/feedback', icon: <FaCommentAlt className="mr-3" />, text: 'Feedback' },
  ];

  // Check if a nav item is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleItemClick = () => {
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      closeSidebar()
    }
  }

  const handleLogout = () => {
    console.log('Logging out...')
    // Add logout logic here
    closeSidebar()
  }

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
       h-[100vh] w-full fixed top-0 left-0 md:h-[90vh] md:w-64 bg-black backdrop-blur-xl border-r border-[#D9C27B]/20 z-50 transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:z-auto
      `}>
        
       

    
          <div className="p-4 border-b border-[#D9C27B]/20 ">
          <div className="flex justify-between items-center  rounded-lg">
          

          <div className="flex items-center gap-3 p-3   ">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center">
                <FaUserCircle className="text-black text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Admin User</p>
                <p className="text-[#D9C27B] text-xs">Super Admin</p>
              </div>
            </div>


 
          {/* Close button for mobile */}
          <button
            onClick={closeSidebar}
            className="md:hidden p-2 text-[#D9C27B] hover:bg-[#D9C27B]/10 rounded-lg transition-colors duration-200"
          >
            <FaTimes className="text-lg" />
          </button>
            
          
          </div>
            
          </div>
       

      

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to} onClick={handleItemClick}>
                <NavLink
                  to={item.to}
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive(item.to)
                      ? 'bg-[#D9C27B]/20 text-[#D9C27B]'
                      : 'text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10'
                  }`}
                >
                  {React.cloneElement(item.icon, {
                    className: `text-lg ${isActive(item.to) ? 'text-[#D9C27B]' : 'text-gray-400 group-hover:text-[#D9C27B]'}`,
                  })}
                  <span className="ml-3">{item.text}</span>
                </NavLink>
              </li>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-[#D9C27B]/20">
        {
          admin? <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-medium">Sign Out</span>
          </button>:
          <button onClick={()=>{setOpenLogin(true)}} className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-[#D9C27B] text-black font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:from-[#F4E4A6] hover:via-[#D9C27B] hover:to-[#F4E4A6] group">
            <FaUserCircle className="text-lg group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-semibold tracking-wide">Signup/Login</span>
            <div className="w-2 h-2 bg-black/30 rounded-full animate-pulse"></div>
          </button>
        }
         
        </div>





      </div>
    </>
  )
}

export default Sidebar
