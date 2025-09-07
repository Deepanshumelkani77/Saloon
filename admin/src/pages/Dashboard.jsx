import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaCut, 
  FaMoneyBillWave,
  FaChartLine,
  FaClock,
  FaUserCheck,
  FaEye,
  FaCalendarCheck,
  FaStar,
  FaArrowUp,
  FaArrowDown,
  FaChartBar
} from 'react-icons/fa'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalCustomers: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    monthlyRevenue: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    recentAppointments: [],
    popularServices: []
  })
  const [loading, setLoading] = useState(true)

  // Frontend color scheme
  const gold = '#D9C27B'
  const lightGold = '#F4E4A6'

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, appointmentsRes] = await Promise.all([
          axios.get('http://localhost:1000/user/stats'),
          axios.get('http://localhost:1000/appointment/stats')
        ])
        
        setDashboardData({
          totalCustomers: usersRes.data?.totalUsers || 156,
          totalAppointments: appointmentsRes.data?.totalAppointments || 342,
          todayAppointments: appointmentsRes.data?.todayAppointments || 12,
          monthlyRevenue: appointmentsRes.data?.monthlyRevenue || 45600,
          pendingAppointments: appointmentsRes.data?.pendingAppointments || 8,
          completedAppointments: appointmentsRes.data?.completedAppointments || 298,
          recentAppointments: appointmentsRes.data?.recentAppointments || [
            { id: 1, customerName: 'Priya Sharma', service: 'Hair Cut & Style', time: '10:30 AM', status: 'confirmed' },
            { id: 2, customerName: 'Rahul Kumar', service: 'Beard Trim', time: '11:00 AM', status: 'pending' },
            { id: 3, customerName: 'Anita Singh', service: 'Facial Treatment', time: '2:00 PM', status: 'completed' },
            { id: 4, customerName: 'Vikash Gupta', service: 'Hair Wash', time: '3:30 PM', status: 'confirmed' }
          ],
          popularServices: appointmentsRes.data?.popularServices || [
            { _id: 'Hair Cut & Style', count: 45 },
            { _id: 'Beard Trim', count: 32 },
            { _id: 'Facial Treatment', count: 28 }
          ]
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        // Use mock data if API fails
        setDashboardData({
          totalCustomers: 156,
          totalAppointments: 342,
          todayAppointments: 12,
          monthlyRevenue: 45600,
          pendingAppointments: 8,
          completedAppointments: 298,
          recentAppointments: [
            { id: 1, customerName: 'Priya Sharma', service: 'Hair Cut & Style', time: '10:30 AM', status: 'confirmed' },
            { id: 2, customerName: 'Rahul Kumar', service: 'Beard Trim', time: '11:00 AM', status: 'pending' },
            { id: 3, customerName: 'Anita Singh', service: 'Facial Treatment', time: '2:00 PM', status: 'completed' },
            { id: 4, customerName: 'Vikash Gupta', service: 'Hair Wash', time: '3:30 PM', status: 'confirmed' }
          ],
          popularServices: [
            { _id: 'Hair Cut & Style', count: 45 },
            { _id: 'Beard Trim', count: 32 },
            { _id: 'Facial Treatment', count: 28 }
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend, trendValue }) => (
    <div className="bg-black/90 backdrop-blur-xl border border-[#D9C27B]/30 rounded-2xl p-6 hover:border-[#D9C27B]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D9C27B]/20 group hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-4 rounded-xl bg-gradient-to-br ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="text-2xl text-black" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-3xl font-bold text-white group-hover:text-[#D9C27B] transition-colors duration-300">
          {loading ? '...' : value}
        </h3>
        <p className="text-gray-300 text-sm font-medium">{title}</p>
        {subtitle && <p className="text-[#D9C27B] text-xs font-medium">{subtitle}</p>}
      </div>
    </div>
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/20 border-green-400/30'
      case 'pending': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      case 'completed': return 'text-blue-400 bg-blue-400/20 border-blue-400/30'
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30'
    }
  }

  return (
    <div className="min-h-screen bg-[#23211b] py-4 px-8 pb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-[#D9C27B] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-300 flex items-center gap-2 text-lg">
              <FaEye className="text-[#D9C27B]" />
              Welcome back! Here's your salon overview for today.
            </p>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/10 rounded-xl border border-[#D9C27B]/40 backdrop-blur-xl">
            <FaCalendarCheck className="text-[#D9C27B] text-xl" />
            <span className="text-white font-semibold text-lg">
              {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FaUsers}
          title="Total Customers"
          value={dashboardData.totalCustomers}
          subtitle="Registered users"
          color="from-[#D9C27B] to-[#F4E4A6]"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          icon={FaCalendarAlt}
          title="Today's Appointments"
          value={dashboardData.todayAppointments}
          subtitle="Scheduled today"
          color="from-blue-400 to-blue-500"
          trend="up"
          trendValue="+5%"
        />
        <StatCard
          icon={FaMoneyBillWave}
          title="Monthly Revenue"
          value={`₹${dashboardData.monthlyRevenue.toLocaleString()}`}
          subtitle="This month"
          color="from-green-400 to-green-500"
          trend="up"
          trendValue="+18%"
        />
        <StatCard
          icon={FaCut}
          title="Total Services"
          value={dashboardData.totalAppointments}
          subtitle="All time bookings"
          color="from-purple-400 to-purple-500"
          trend="up"
          trendValue="+8%"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={FaClock}
          title="Pending Appointments"
          value={dashboardData.pendingAppointments}
          subtitle="Awaiting confirmation"
          color="from-yellow-400 to-orange-400"
        />
        <StatCard
          icon={FaUserCheck}
          title="Completed Services"
          value={dashboardData.completedAppointments}
          subtitle="Successfully finished"
          color="from-[#D9C27B] to-[#F4E4A6]"
        />
        <StatCard
          icon={FaStar}
          title="Customer Rating"
          value="4.8"
          subtitle="Average rating"
          color="from-pink-400 to-rose-400"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Appointments */}
        <div className="bg-black/90 backdrop-blur-xl border border-[#D9C27B]/30 rounded-2xl p-6 hover:border-[#D9C27B]/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FaCalendarAlt className="text-[#D9C27B]" />
              Recent Appointments
            </h2>
            <button className="px-4 py-2 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {dashboardData.recentAppointments.map((appointment) => (
              <div 
                key={appointment.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl border border-gray-700/50 hover:border-[#D9C27B]/30 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex items-center gap-4 mb-3 md:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center shadow-lg">
                    <FaUsers className="text-black text-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-[#D9C27B] transition-colors duration-300">
                      {appointment.customerName}
                    </h3>
                    <p className="text-gray-400 text-sm">{appointment.service}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-white font-medium">{appointment.time}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Services */}
        <div className="bg-black/90 backdrop-blur-xl border border-[#D9C27B]/30 rounded-2xl p-6 hover:border-[#D9C27B]/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FaChartBar className="text-[#D9C27B]" />
              Popular Services
            </h2>
          </div>
          
          <div className="space-y-4">
            {dashboardData.popularServices.map((service, index) => (
              <div 
                key={service._id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl border border-gray-700/50 hover:border-[#D9C27B]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center text-black font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{service._id}</h3>
                    <p className="text-gray-400 text-sm">{service.count} bookings</p>
                  </div>
                </div>
                <div className="text-[#D9C27B] font-bold text-lg">
                  {service.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: FaCalendarAlt, title: 'New Appointment', color: 'from-blue-500 to-blue-600' },
          { icon: FaUsers, title: 'Add Customer', color: 'from-green-500 to-green-600' },
          { icon: FaCut, title: 'Manage Services', color: 'from-purple-500 to-purple-600' },
          { icon: FaChartLine, title: 'View Reports', color: 'from-[#D9C27B] to-[#F4E4A6]' }
        ].map((action, index) => (
          <button
            key={index}
            className={`p-4 bg-gradient-to-r ${action.color} rounded-xl text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 group`}
          >
            <action.icon className="text-lg group-hover:scale-110 transition-transform duration-300" />
            {action.title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
