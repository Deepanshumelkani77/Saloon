import React, { useState, useEffect } from 'react'
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaCut, 
  FaPhone, 
  FaEnvelope, 
  FaCheck, 
  FaTimes, 
  FaMoneyBillWave,
  FaEye,
  FaFilter,
  FaSearch,
  FaUserTie
} from 'react-icons/fa'

const Appointment = () => {
  const [appointments, setAppointments] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const gold = '#D9C27B'

  // Mock appointment data - replace with actual API call
  const mockAppointments = [
    {
      id: 1,
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      service: 'Haircut & Beard Trim',
      stylist: 'Alex Johnson',
      date: '2025-01-08',
      time: '10:00 AM',
      duration: '45 min',
      price: 800,
      status: 'pending',
      paid: false,
      notes: 'Regular customer, prefers short cut'
    },
    {
      id: 2,
      customerName: 'Sarah Smith',
      email: 'sarah@example.com',
      phone: '+91 9876543211',
      service: 'Hair Color & Styling',
      stylist: 'Maria Garcia',
      date: '2025-01-08',
      time: '2:00 PM',
      duration: '2 hours',
      price: 2500,
      status: 'confirmed',
      paid: false,
      notes: 'Wants blonde highlights'
    },
    {
      id: 3,
      customerName: 'Mike Wilson',
      email: 'mike@example.com',
      phone: '+91 9876543212',
      service: 'Facial & Massage',
      stylist: 'Lisa Brown',
      date: '2025-01-08',
      time: '4:30 PM',
      duration: '90 min',
      price: 1500,
      status: 'completed',
      paid: true,
      notes: 'Anti-aging facial requested'
    },
    {
      id: 4,
      customerName: 'Emma Davis',
      email: 'emma@example.com',
      phone: '+91 9876543213',
      service: 'Bridal Makeup',
      stylist: 'Priya Sharma',
      date: '2025-01-09',
      time: '9:00 AM',
      duration: '3 hours',
      price: 5000,
      status: 'confirmed',
      paid: false,
      notes: 'Wedding on Jan 10th, trial session'
    },
    {
      id: 5,
      customerName: 'David Brown',
      email: 'david@example.com',
      phone: '+91 9876543214',
      service: 'Hair Wash & Cut',
      stylist: 'Alex Johnson',
      date: '2025-01-09',
      time: '11:30 AM',
      duration: '30 min',
      price: 500,
      status: 'cancelled',
      paid: false,
      notes: 'Cancelled due to emergency'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setAppointments(mockAppointments)
    setFilteredAppointments(mockAppointments)
  }, [])

  useEffect(() => {
    let filtered = appointments

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(apt => apt.status === filterStatus)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(apt => 
        apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.stylist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredAppointments(filtered)
  }, [appointments, filterStatus, searchTerm])

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ))
  }

  const togglePaymentStatus = (id) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, paid: !apt.paid } : apt
    ))
  }

  const handleConfirm = (id) => {
    updateAppointmentStatus(id, 'confirmed')
  }

  const handleComplete = (id) => {
    updateAppointmentStatus(id, 'completed')
    // Automatically mark as paid when completed
    setTimeout(() => {
      togglePaymentStatus(id)
    }, 500)
  }

  const handleCancel = (id) => {
    updateAppointmentStatus(id, 'cancelled')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'confirmed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaClock />
      case 'confirmed': return <FaCheck />
      case 'completed': return <FaCheck />
      case 'cancelled': return <FaTimes />
      default: return <FaClock />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaCalendarAlt className="text-3xl text-[#D9C27B]" />
            <div>
              <h1 className="text-3xl font-bold text-white">Appointment Management</h1>
              <p className="text-gray-400">Manage and track all salon appointments</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-black/50 backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <FaClock className="text-yellow-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {appointments.filter(apt => apt.status === 'pending').length}
                  </p>
                  <p className="text-gray-400 text-sm">Pending</p>
                </div>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FaCheck className="text-blue-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {appointments.filter(apt => apt.status === 'confirmed').length}
                  </p>
                  <p className="text-gray-400 text-sm">Confirmed</p>
                </div>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FaCheck className="text-green-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {appointments.filter(apt => apt.status === 'completed').length}
                  </p>
                  <p className="text-gray-400 text-sm">Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#D9C27B]/20 rounded-lg flex items-center justify-center">
                  <FaMoneyBillWave className="text-[#D9C27B] text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    ₹{appointments.filter(apt => apt.paid).reduce((sum, apt) => sum + apt.price, 0).toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-sm">Revenue</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D9C27B] transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaFilter className="text-[#D9C27B]" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <FaCalendarAlt className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No appointments found</p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-black/50 backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-6 hover:border-[#D9C27B]/40 transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Appointment Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      
                      {/* Customer Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center">
                            <FaUser className="text-black text-sm" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">{appointment.customerName}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <FaPhone className="text-xs" />
                                {appointment.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaEnvelope className="text-xs" />
                                {appointment.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Service Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaCut className="text-[#D9C27B]" />
                            <span>{appointment.service}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaUserTie className="text-[#D9C27B]" />
                            <span>{appointment.stylist}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaCalendarAlt className="text-[#D9C27B]" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaClock className="text-[#D9C27B]" />
                            <span>{appointment.time} ({appointment.duration})</span>
                          </div>
                        </div>

                        {/* Notes */}
                        {appointment.notes && (
                          <div className="mt-3 p-3 bg-[#D9C27B]/5 rounded-lg">
                            <p className="text-gray-300 text-sm italic">"{appointment.notes}"</p>
                          </div>
                        )}
                      </div>

                      {/* Status and Price */}
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#D9C27B]">₹{appointment.price.toLocaleString()}</p>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs ${appointment.paid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {appointment.paid ? 'Paid' : 'Unpaid'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 lg:flex-col lg:w-auto">
                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment)
                        setShowModal(true)
                      }}
                      className="px-4 py-2 bg-[#D9C27B]/20 text-[#D9C27B] rounded-lg hover:bg-[#D9C27B]/30 transition-colors flex items-center gap-2"
                    >
                      <FaEye />
                      <span className="hidden sm:inline">View</span>
                    </button>

                    {appointment.status === 'pending' && (
                      <button
                        onClick={() => handleConfirm(appointment.id)}
                        className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2"
                      >
                        <FaCheck />
                        <span className="hidden sm:inline">Confirm</span>
                      </button>
                    )}

                    {appointment.status === 'confirmed' && (
                      <button
                        onClick={() => handleComplete(appointment.id)}
                        className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2"
                      >
                        <FaCheck />
                        <span className="hidden sm:inline">Complete</span>
                      </button>
                    )}

                    {appointment.status === 'completed' && !appointment.paid && (
                      <button
                        onClick={() => togglePaymentStatus(appointment.id)}
                        className="px-4 py-2 bg-[#D9C27B]/20 text-[#D9C27B] rounded-lg hover:bg-[#D9C27B]/30 transition-colors flex items-center gap-2"
                      >
                        <FaMoneyBillWave />
                        <span className="hidden sm:inline">Mark Paid</span>
                      </button>
                    )}

                    {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
                      >
                        <FaTimes />
                        <span className="hidden sm:inline">Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for appointment details */}
        {showModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black/95 backdrop-blur-xl border border-[#D9C27B]/30 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Appointment Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Customer Details */}
                <div>
                  <h3 className="text-lg font-semibold text-[#D9C27B] mb-3">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Name</p>
                      <p className="text-white font-medium">{selectedAppointment.customerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-medium">{selectedAppointment.phone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">{selectedAppointment.email}</p>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div>
                  <h3 className="text-lg font-semibold text-[#D9C27B] mb-3">Service Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Service</p>
                      <p className="text-white font-medium">{selectedAppointment.service}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Stylist</p>
                      <p className="text-white font-medium">{selectedAppointment.stylist}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Date</p>
                      <p className="text-white font-medium">{selectedAppointment.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Time</p>
                      <p className="text-white font-medium">{selectedAppointment.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Duration</p>
                      <p className="text-white font-medium">{selectedAppointment.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Price</p>
                      <p className="text-[#D9C27B] font-bold text-xl">₹{selectedAppointment.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Status and Payment */}
                <div>
                  <h3 className="text-lg font-semibold text-[#D9C27B] mb-3">Status & Payment</h3>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(selectedAppointment.status)}`}>
                      {getStatusIcon(selectedAppointment.status)}
                      {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                    </span>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${selectedAppointment.paid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {selectedAppointment.paid ? 'Payment Completed' : 'Payment Pending'}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {selectedAppointment.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#D9C27B] mb-3">Notes</h3>
                    <div className="p-4 bg-[#D9C27B]/5 rounded-lg">
                      <p className="text-gray-300 italic">"{selectedAppointment.notes}"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Appointment
