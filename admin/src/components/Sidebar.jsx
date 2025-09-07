import React, { useState } from 'react'
import { 
  FaTachometerAlt, 
  FaCalendarAlt, 
  FaCut, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaUserCircle,
  FaMoneyBillWave,
  FaStore,
  FaBell,
  FaTimes
} from 'react-icons/fa'

const Sidebar = ({ isOpen, onClose, user }) => {
  const [activeItem, setActiveItem] = useState('dashboard')
  const gold = '#D9C27B'

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: FaTachometerAlt, path: '/' },
    { id: 'appointments', name: 'Appointments', icon: FaCalendarAlt, path: '/appointments' },
    { id: 'services', name: 'Services', icon: FaCut, path: '/services' },
    { id: 'staff', name: 'Staff Management', icon: FaUsers, path: '/staff' },
    { id: 'analytics', name: 'Analytics', icon: FaChartBar, path: '/analytics' },
    { id: 'payments', name: 'Payments', icon: FaMoneyBillWave, path: '/payments' },
    { id: 'inventory', name: 'Inventory', icon: FaStore, path: '/inventory' },
    { id: 'notifications', name: 'Notifications', icon: FaBell, path: '/notifications' },
    { id: 'settings', name: 'Settings', icon: FaCog, path: '/settings' },
  ]

  const handleItemClick = (itemId) => {
    setActiveItem(itemId)
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  const handleLogout = () => {
    console.log('Logging out...')
    // Add logout logic here
    onClose()
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-black/95 backdrop-blur-xl border-r border-[#D9C27B]/20 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:z-auto
      `}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#D9C27B]/20">
          <div className="flex items-center gap-2">
            <FaCut className="text-2xl animate-spin-slow text-[#D9C27B]" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-wide">Me & Guys</span>
              <span className="text-xs tracking-widest font-normal text-[#D9C27B]">ADMIN PANEL</span>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="md:hidden p-2 text-[#D9C27B] hover:bg-[#D9C27B]/10 rounded-lg transition-colors duration-200"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* User Profile Section */}
        {user && (
          <div className="p-4 border-b border-[#D9C27B]/20">
            <div className="flex items-center gap-3 p-3 bg-[#D9C27B]/5 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center">
                <FaUserCircle className="text-black text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Admin User</p>
                <p className="text-[#D9C27B] text-xs">Super Admin</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {user && (
          <div className="p-4 border-b border-[#D9C27B]/20">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#D9C27B]/10 p-3 rounded-lg text-center">
                <FaCalendarAlt className="text-[#D9C27B] mx-auto mb-1" />
                <p className="text-white font-semibold">12</p>
                <p className="text-gray-400">Today</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg text-center">
                <FaMoneyBillWave className="text-green-400 mx-auto mb-1" />
                <p className="text-white font-semibold">₹15K</p>
                <p className="text-gray-400">Revenue</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left group
                    ${isActive 
                      ? 'bg-[#D9C27B]/20 text-[#D9C27B] border-l-4 border-[#D9C27B]' 
                      : 'text-gray-300 hover:text-[#D9C27B] hover:bg-[#D9C27B]/10'
                    }
                  `}
                >
                  <Icon className={`text-lg ${isActive ? 'text-[#D9C27B]' : 'group-hover:text-[#D9C27B]'}`} />
                  <span className="font-medium">{item.name}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-[#D9C27B] rounded-full animate-pulse" />
                  )}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-[#D9C27B]/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
