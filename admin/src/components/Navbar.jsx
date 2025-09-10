import React, { useState, useContext } from 'react'
import { FaCut, FaUserCircle, FaCog, FaSignOutAlt, FaChartBar, FaCalendarAlt, FaUsers, FaBars, FaTimes } from 'react-icons/fa'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { admin, setAdmin, sidebarOpen, setSidebarOpen, setOpenLogin, setInitialMode, logout } = useContext(AppContext)
  const [profileDropdown, setProfileDropdown] = useState(false)

  const gold = '#D9C27B'

  const adminUser = {
    name: 'Admin User',
    email: 'admin@meandguys.com',
    role: 'Super Admin',
    avatar: null
  }

  const handleLogout = () => {
    logout()
    setProfileDropdown(false)
  }

  const handleLogin = () => {
    setInitialMode('login')
    setOpenLogin(true)
    setProfileDropdown(false)
  }

  const handleSignup = () => {
    setInitialMode('signup')
    setOpenLogin(true)
    setProfileDropdown(false)
  }

  return (
    <div className="  bg-black shadow-lg border-b border-[#D9C27B]/20 sticky top-0 z-50 h-[10vh]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FaCut className="text-2xl animate-spin-slow text-[#D9C27B]" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-wide">Me & Guys</span>
                <span className="text-xs tracking-widest font-normal text-[#D9C27B]">ADMIN PANEL</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Quick Stats - Only show when admin is logged in */}
            {admin && (
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1 bg-[#D9C27B]/10 rounded-full">
                  <FaCalendarAlt className="text-[#D9C27B]" />
                  <span className="text-white">12 Today</span>
                </div>
                
              </div>
            )}

            {/* Profile Section */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#D9C27B]/10 transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center">
                  <FaUserCircle className="text-black text-lg" />
                </div>
                
                  <div className="hidden lg:block text-left">
                    <p className="text-white text-sm font-medium">{admin ? admin.name || admin.username : 'Guest'}</p>
                    <p className="text-[#D9C27B] text-xs">{admin ? 'Admin' : 'Not logged in'}</p>
                  </div>
                
                <svg className="w-4 h-4 text-gray-400 group-hover:text-[#D9C27B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-[#D9C27B]/30 rounded-xl shadow-2xl z-50 animate-fade-in">
                  {admin ? (
                    <>
                      {/* User Info */}
                      <div className="p-4 border-b border-[#D9C27B]/20">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center">
                            <FaUserCircle className="text-black text-xl" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{admin.name || admin.username}</p>
                            <p className="text-gray-400 text-sm">{admin.email}</p>
                            <span className="inline-block px-2 py-1 bg-[#D9C27B]/20 text-[#D9C27B] text-xs rounded-full mt-1">
                              Admin
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 transition-all duration-200">
                          <FaUserCircle className="text-lg" />
                          <span>My Profile</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 transition-all duration-200">
                          <FaCog className="text-lg" />
                          <span>Settings</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 transition-all duration-200">
                          <FaChartBar className="text-lg" />
                          <span>Analytics</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 transition-all duration-200">
                          <FaUsers className="text-lg" />
                          <span>Manage Staff</span>
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-[#D9C27B]/20 py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                        >
                          <FaSignOutAlt className="text-lg" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Login/Signup Options */
                    <div className="py-3">
                      <div className="px-4 pb-3 border-b border-[#D9C27B]/20">
                        <p className="text-white font-semibold text-center">Welcome to Admin Panel</p>
                        <p className="text-gray-400 text-sm text-center mt-1">Please sign in to continue</p>
                      </div>
                      <div className="p-4 space-y-3">
                        <button
                          onClick={handleLogin}
                          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-[#D9C27B] text-[#D9C27B] rounded-full font-semibold hover:bg-[#D9C27B] hover:text-black transition-all duration-200"
                        >
                          <FaUserCircle className="text-lg" />
                          <span>Login</span>
                        </button>
                        <button
                          onClick={handleSignup}
                          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#D9C27B] text-black rounded-full font-semibold hover:bg-[#F4E4A6] transition-all duration-200"
                        >
                          <FaUserCircle className="text-lg" />
                          <span>Sign Up</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button & Profile */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Profile Icon */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="p-2 text-[#D9C27B] hover:bg-[#D9C27B]/10 rounded-lg transition-colors duration-200"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center">
                  <FaUserCircle className="text-black text-sm" />
                </div>
              </button>

              {/* Mobile Profile Dropdown */}
              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-[#D9C27B]/30 rounded-xl shadow-2xl z-50 animate-fade-in">
                  {admin ? (
                    <>
                      {/* User Info */}
                      <div className="p-4 border-b border-[#D9C27B]/20">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center">
                            <FaUserCircle className="text-black text-xl" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{admin.name || admin.username}</p>
                            <p className="text-gray-400 text-sm">{admin.email}</p>
                            <span className="inline-block px-2 py-1 bg-[#D9C27B]/20 text-[#D9C27B] text-xs rounded-full mt-1">
                              Admin
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 transition-all duration-200">
                          <FaUserCircle className="text-lg" />
                          <span>My Profile</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 transition-all duration-200">
                          <FaCog className="text-lg" />
                          <span>Settings</span>
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-[#D9C27B]/20 py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                        >
                          <FaSignOutAlt className="text-lg" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Login/Signup Options */
                    <div className="py-3">
                      <div className="px-4 pb-3 border-b border-[#D9C27B]/20">
                        <p className="text-white font-semibold text-center">Welcome to Admin Panel</p>
                        <p className="text-gray-400 text-sm text-center mt-1">Please sign in to continue</p>
                      </div>
                      <div className="p-4 space-y-3">
                        <button
                          onClick={handleLogin}
                          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-[#D9C27B] text-[#D9C27B] rounded-full font-semibold hover:bg-[#D9C27B] hover:text-black transition-all duration-200"
                        >
                          <FaUserCircle className="text-lg" />
                          <span>Login</span>
                        </button>
                        <button
                          onClick={handleSignup}
                          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#D9C27B] text-black rounded-full font-semibold hover:bg-[#F4E4A6] transition-all duration-200"
                        >
                          <FaUserCircle className="text-lg" />
                          <span>Sign Up</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Sidebar Toggle Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-[#D9C27B] hover:bg-[#D9C27B]/10 rounded-lg transition-colors duration-200"
            >
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>

      </div>

      {/* Click outside to close dropdowns */}
      {profileDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileDropdown(false)}
        />
      )}
    </div>
  )
}

export default Navbar
