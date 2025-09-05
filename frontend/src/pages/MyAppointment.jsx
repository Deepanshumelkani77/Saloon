import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { FaCalendarAlt, FaClock, FaUser, FaCut, FaMoneyBillWave, FaTimes, FaCheckCircle, FaHourglassHalf, FaBan } from 'react-icons/fa';
import { assets } from '../assets/assets';

const MyAppointment = () => {
  const { user } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:1000/appointment/user/${user.id || user._id}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    setCancellingId(appointmentId);
    try {
      await axios.put(`http://localhost:1000/appointment/cancel/${appointmentId}`);
      // Refresh appointments
      fetchAppointments();
      alert('Appointment cancelled successfully');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="text-green-500" />;
      case 'pending':
        return <FaHourglassHalf className="text-yellow-500" />;
      case 'completed':
        return <FaCheckCircle className="text-blue-500" />;
      case 'cancelled':
        return <FaBan className="text-red-500" />;
      default:
        return <FaHourglassHalf className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-300">You need to be logged in to view your appointments.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={assets.about} 
            alt="My Appointments" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Appointments</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Manage your bookings, view appointment details, and track your salon visits
            </p>
          </div>
        </div>
      </section>

      {/* Appointments Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9C27B]"></div>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-20">
              <FaCalendarAlt className="text-6xl text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-300 mb-4">No Appointments Found</h3>
              <p className="text-gray-400 mb-8">You haven't booked any appointments yet.</p>
              <a 
                href="/appointment" 
                className="inline-block bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black px-8 py-3 rounded-full font-bold hover:from-[#F4E4A6] hover:to-[#D9C27B] transition-all duration-300"
              >
                Book Your First Appointment
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Appointments</span>
                </h2>
                <p className="text-gray-300">Total Appointments: {appointments.length}</p>
              </div>

              {/* Appointments Table/Cards */}
              <div className="overflow-x-auto">
                <div className="min-w-full space-y-4">
                  {appointments.map((appointment) => (
                    <div 
                      key={appointment._id}
                      className="bg-black rounded-2xl border border-[#D9C27B]/20 p-6 hover:border-[#D9C27B]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#D9C27B]/10"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        {/* Appointment Info */}
                        <div className="lg:col-span-3">
                          <div className="flex items-center space-x-3 mb-2">
                            <FaCalendarAlt className="text-[#D9C27B]" />
                            <div>
                              <p className="font-bold text-white">{formatDate(appointment.appointmentDate)}</p>
                              <p className="text-sm text-gray-400">
                                <FaClock className="inline mr-1" />
                                {appointment.startTime} - {appointment.endTime}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Service Details */}
                        <div className="lg:col-span-3">
                          <div className="flex items-center space-x-3 mb-2">
                            <FaCut className="text-[#D9C27B]" />
                            <div>
                              <p className="font-bold text-white">{appointment.serviceName}</p>
                              <p className="text-sm text-gray-400">{appointment.serviceDuration} minutes</p>
                            </div>
                          </div>
                        </div>

                        {/* Stylist Info */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center space-x-3 mb-2">
                            <FaUser className="text-[#D9C27B]" />
                            <div>
                              <p className="font-bold text-white">{appointment.stylistName}</p>
                              <p className="text-sm text-gray-400">Stylist</p>
                            </div>
                          </div>
                        </div>

                        {/* Price & Status */}
                        <div className="lg:col-span-2">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <FaMoneyBillWave className="text-[#D9C27B]" />
                              <span className="font-bold text-[#D9C27B] text-lg">{appointment.servicePrice}</span>
                            </div>
                            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                              {getStatusIcon(appointment.status)}
                              <span className="capitalize">{appointment.status}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="lg:col-span-2">
                          <div className="flex flex-col sm:flex-row gap-2">
                            {/* Payment Button */}
                            <button
                              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                              title="Make Payment"
                            >
                              <FaMoneyBillWave />
                              <span className="hidden sm:inline">Pay</span>
                            </button>

                            {/* Cancel Button */}
                            {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                              <button
                                onClick={() => cancelAppointment(appointment._id)}
                                disabled={cancellingId === appointment._id}
                                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Cancel Appointment"
                              >
                                {cancellingId === appointment._id ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                ) : (
                                  <>
                                    <FaTimes />
                                    <span className="hidden sm:inline">Cancel</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Additional Details */}
                      {appointment.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <p className="text-gray-300 text-sm">
                            <strong className="text-[#D9C27B]">Notes:</strong> {appointment.notes}
                          </p>
                        </div>
                      )}

                      {/* Booking Date */}
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-gray-400 text-xs">
                          Booked on: {new Date(appointment.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      
    </div>
  );
};

export default MyAppointment;
