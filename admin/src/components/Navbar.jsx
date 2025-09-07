import React, { useState } from 'react'
import { FaCut, FaUserCircle, FaBell, FaCog, FaSignOutAlt, FaChartBar, FaCalendarAlt, FaUsers, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [user, setUser] = useState(true) // Set to true for demo, replace with actual auth state
  const [profileDropdown, setProfileDropdown] = useState(false)
  const [notificationDropdown, setNotificationDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const gold = '#D9C27B'

  const adminUser = {
    name: 'Admin User',
    email: 'admin@meandguys.com',
    role: 'Super Admin',
    avatar: null
  }

  const notifications = [
    { id: 1, message: 'New appointment booked', time: '5 min ago', unread: true },
    { id: 2, message: 'Payment received', time: '1 hour ago', unread: true },
    { id: 3, message: 'Staff member checked in', time: '2 hours ago', unread: false },
  ]

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...')
    setUser(false)
  }

  return (
    <div className="bg-black shadow-lg border-b border-[#D9C27B]/20 sticky top-0 z-50">
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
            
            {/* Quick Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1 bg-[#D9C27B]/10 rounded-full">
                <FaCalendarAlt className="text-[#D9C27B]" />
                <span className="text-white">12 Today</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full">
                <FaChartBar className="text-green-400" />
                <span className="text-white">₹15,240</span>
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationDropdown(!notificationDropdown)}
                className="relative p-2 text-gray-300 hover:text-[#D9C27B] transition-colors duration-200 rounded-full hover:bg-[#D9C27B]/10"
              >
                <FaBell className="text-xl" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-black/95 backdrop-blur-xl border border-[#D9C27B]/30 rounded-xl shadow-2xl z-50 animate-fade-in">
                  <div className="p-4 border-b border-[#D9C27B]/20">
                    <h3 className="text-white font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-700/50 hover:bg-[#D9C27B]/5 transition-colors ${
                          notification.unread ? 'bg-[#D9C27B]/5' : ''
                        }`}
                      >
                        <p className="text-white text-sm">{notification.message}</p>
                        <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-[#D9C27B]/20">
                    <button className="text-[#D9C27B] text-sm hover:text-[#F4E4A6] transition-colors">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#D9C27B]/10 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center">
                    <FaUserCircle className="text-black text-lg" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-white text-sm font-medium">{adminUser.name}</p>
                    <p className="text-[#D9C27B] text-xs">{adminUser.role}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-[#D9C27B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-[#D9C27B]/30 rounded-xl shadow-2xl z-50 animate-fade-in">
                    {/* User Info */}
                    <div className="p-4 border-b border-[#D9C27B]/20">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center">
                          <FaUserCircle className="text-black text-xl" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{adminUser.name}</p>
                          <p className="text-gray-400 text-sm">{adminUser.email}</p>
                          <span className="inline-block px-2 py-1 bg-[#D9C27B]/20 text-[#D9C27B] text-xs rounded-full mt-1">
                            {adminUser.role}
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
                  </div>
                )}
              </div>
            ) : (
              <button
                className="px-6 py-2 border-2 border-[#D9C27B] text-[#D9C27B] rounded-full font-semibold hover:bg-[#D9C27B] hover:text-black transition-all duration-200"
              >
                Admin Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {user && (
              <button
                onClick={() => setNotificationDropdown(!notificationDropdown)}
                className="relative p-2 text-gray-300 hover:text-[#D9C27B] transition-colors duration-200"
              >
                <FaBell className="text-lg" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </button>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#D9C27B] hover:bg-[#D9C27B]/10 rounded-lg transition-colors duration-200"
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#D9C27B]/20 py-4 animate-fade-in">
            {user ? (
              <div className="space-y-4">
                {/* Mobile User Info */}
                <div className="flex items-center gap-3 p-3 bg-[#D9C27B]/5 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center">
                    <FaUserCircle className="text-black text-lg" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{adminUser.name}</p>
                    <p className="text-[#D9C27B] text-sm">{adminUser.role}</p>
                  </div>
                </div>

                {/* Mobile Menu Items */}
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 rounded-lg transition-all duration-200">
                    <FaUserCircle />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 rounded-lg transition-all duration-200">
                    <FaCog />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10 rounded-lg transition-all duration-200">
                    <FaChartBar />
                    <span>Analytics</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  >
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <button className="w-full px-4 py-2 border-2 border-[#D9C27B] text-[#D9C27B] rounded-full font-semibold hover:bg-[#D9C27B] hover:text-black transition-all duration-200">
                Admin Login
              </button>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(profileDropdown || notificationDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setProfileDropdown(false)
            setNotificationDropdown(false)
          }}
        />
      )}
    </div>
  )
}

export default Navbar
