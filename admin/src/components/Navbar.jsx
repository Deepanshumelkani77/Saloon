import React, { useState, useEffect, useRef } from 'react'
import { User, LogOut, Menu, X, Scissors, Settings } from 'lucide-react'

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileMenuRef = useRef(null)

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-black shadow-lg border-b border-[#D9C27B]/30 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-[#D9C27B] hover:text-[#F4E4A6] hover:bg-[#D9C27B]/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#D9C27B] lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#D9C27B] to-[#bfa14a] rounded-lg flex items-center justify-center">
                <Scissors className="text-black text-lg animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">Me & Guys Admin</h1>
                <p className="text-sm text-[#D9C27B] tracking-widest">S A L O N  M A N A G E M E N T</p>
              </div>
            </div>
          </div>


          {/* Right side - Profile */}
          <div className="flex items-center space-x-4">

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 p-2 text-[#D9C27B] hover:text-[#F4E4A6] hover:bg-[#D9C27B]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9C27B]"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#D9C27B] to-[#bfa14a] rounded-full flex items-center justify-center">
                  <User size={16} className="text-black" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-[#D9C27B]/70">admin@salon.com</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-xl rounded-lg shadow-lg border border-[#D9C27B]/30 py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#D9C27B]/30">
                    <p className="text-sm font-medium text-white">Admin User</p>
                    <p className="text-xs text-[#D9C27B]/70">admin@salon.com</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-[#D9C27B] hover:bg-[#D9C27B]/10 hover:text-[#F4E4A6] flex items-center space-x-2">
                    <User size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-[#D9C27B] hover:bg-[#D9C27B]/10 hover:text-[#F4E4A6] flex items-center space-x-2">
                    <Settings size={16} />
                    <span>Account Settings</span>
                  </button>
                  <hr className="my-2 border-[#D9C27B]/30" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center space-x-2">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar
