import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Appointment = () => {
  const { user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    stylist: '',
    date: '',
    time: '',
    notes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Fetch services and stylists on component mount
  useEffect(() => {
    fetchServices();
    fetchStylists();
  }, []);

  // Check availability when stylist, date, or service changes
  useEffect(() => {
    if (formData.stylist && formData.date && formData.service) {
      checkAvailability();
    }
  }, [formData.stylist, formData.date, formData.service]);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:1000/appointment/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchStylists = async () => {
    try {
      const response = await axios.get('http://localhost:1000/appointment/stylists');
      setStylists(response.data);
    } catch (error) {
      console.error('Error fetching stylists:', error);
    }
  };

  const checkAvailability = async () => {
    setCheckingAvailability(true);
    try {
      const response = await axios.post('http://localhost:1000/appointment/check-availability', {
        stylistId: formData.stylist,
        date: formData.date,
        serviceId: formData.service
      });
      setAvailableSlots(response.data.availableSlots);
      setBookedSlots(response.data.bookedSlots);
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailableSlots([]);
      setBookedSlots([]);
    }
    setCheckingAvailability(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to book an appointment');
      return;
    }

    setLoading(true);
    try {
      const appointmentData = {
        userId: user._id,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        serviceId: formData.service,
        stylistId: formData.stylist,
        appointmentDate: formData.date,
        startTime: formData.time,
        notes: formData.notes
      };

      await axios.post('http://localhost:1000/appointment/book', appointmentData);
      
      alert('Your appointment has been booked successfully! We will contact you soon to confirm.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        stylist: '',
        date: '',
        time: '',
        notes: ''
      });
      setCurrentStep(1);
      setAvailableSlots([]);
      setBookedSlots([]);
    } catch (error) {
      console.error('Error booking appointment:', error);
      if (error.response?.status === 409) {
        alert('This time slot is no longer available. Please choose another time.');
        checkAvailability(); // Refresh availability
      } else {
        alert('Error booking appointment. Please try again.');
      }
    }
    setLoading(false);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={assets.about} 
            alt="Book Appointment" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Appointment</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Schedule your premium styling session with our expert team at Me & Guys Unisex Salon
            </p>
          </div>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Mobile Progress Indicator */}
          <div className="flex md:hidden justify-center items-center">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-8 h-1 mx-1 ${
                      currentStep > step ? 'bg-[#D9C27B]' : 'bg-gray-600'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Step Labels */}
          <div className="flex md:hidden justify-center mt-3">
            <span className={`text-sm font-semibold ${
              currentStep >= 1 ? 'text-[#D9C27B]' : 'text-gray-400'
            }`}>
              {currentStep === 1 ? 'Choose Service' : currentStep === 2 ? 'Set Details' : 'Confirm Booking'}
            </span>
          </div>

          {/* Desktop Progress Indicator */}
          <div className="hidden md:flex justify-center items-center space-x-6 lg:space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {step}
                </div>
                <span className={`ml-2 lg:ml-3 font-semibold text-sm lg:text-base ${
                  currentStep >= step ? 'text-[#D9C27B]' : 'text-gray-400'
                }`}>
                  {step === 1 ? 'Service' : step === 2 ? 'Details' : 'Confirm'}
                </span>
                {step < 3 && (
                  <div className={`w-12 lg:w-16 h-1 ml-3 lg:ml-4 ${
                    currentStep > step ? 'bg-[#D9C27B]' : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="bg-black p-8 sm:p-12 rounded-3xl border border-[#D9C27B]/20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Service</span>
                  </h2>
                  <p className="text-gray-300">
                    Select the service you'd like to book from our premium offerings
                  </p>
                </div>

                {/* Service Categories */}
                <div className="mb-8">
                  {/* Category Tabs */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {['All', ...new Set(services.map(s => s.category))].map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(selectedCategory === 'All' 
                      ? services 
                      : services.filter(s => s.category === selectedCategory)
                    ).map((service) => (
                        <div
                          key={service.serviceId}
                          onClick={() => setFormData({ ...formData, service: service.serviceId })}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 ${
                            formData.service === service.serviceId
                              ? 'border-[#D9C27B] bg-gradient-to-br from-[#D9C27B]/20 to-[#F4E4A6]/10'
                              : 'border-gray-600 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:border-[#D9C27B]/50'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-white flex-1">{service.name}</h3>
                            <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full ml-2">
                              {service.category.split("'s ")[1] || service.category}
                            </span>
                          </div>
                          <p className="text-[#D9C27B] font-semibold text-xl mb-1">{service.price}</p>
                          <p className="text-gray-400 text-sm">{service.duration} min</p>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.service}
                    className={`py-4 px-12 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                      formData.service
                        ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black hover:from-[#F4E4A6] hover:to-[#D9C27B] shadow-lg hover:shadow-xl'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Continue to Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Appointment Details */}
            {currentStep === 2 && (
              <div className="bg-black p-8 sm:p-12 rounded-3xl border border-[#D9C27B]/20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Appointment <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Details</span>
                  </h2>
                  <p className="text-gray-300">
                    Choose your preferred stylist, date, and time
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Stylist Selection */}
                  <div>
                    <label className="block text-lg font-semibold text-[#D9C27B] mb-4">
                      Choose Your Stylist
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {stylists.map((stylist) => (
                        <div
                          key={stylist.stylistId}
                          onClick={() => setFormData({ ...formData, stylist: stylist.stylistId })}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.stylist === stylist.stylistId
                              ? 'border-[#D9C27B] bg-gradient-to-br from-[#D9C27B]/20 to-[#F4E4A6]/10'
                              : 'border-gray-600 bg-[#1a1a1a] hover:border-[#D9C27B]/50'
                          }`}
                        >
                          <h3 className="text-white font-bold mb-1">{stylist.name}</h3>
                          <p className="text-[#D9C27B] text-sm mb-1">{stylist.specialty}</p>
                          <p className="text-gray-400 text-xs">{stylist.experience}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-lg font-semibold text-[#D9C27B] mb-4">
                      Select Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D9C27B]/30 rounded-lg focus:border-[#D9C27B] focus:outline-none text-white"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-lg font-semibold text-[#D9C27B] mb-4">
                      Select Time
                      {checkingAvailability && (
                        <span className="ml-2 text-sm text-gray-400">Checking availability...</span>
                      )}
                    </label>
                    
                    {formData.stylist && formData.date && formData.service ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                        {/* Available Slots */}
                        {availableSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setFormData({ ...formData, time: slot.time })}
                            className={`py-2 px-3 rounded-lg font-semibold transition-all duration-300 ${
                              formData.time === slot.time
                                ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black'
                                : 'bg-green-600 border border-green-500 text-white hover:bg-green-500'
                            }`}
                            title={`Available until ${slot.endTime}`}
                          >
                            {slot.time}
                          </button>
                        ))}
                        
                        {/* Booked Slots */}
                        {bookedSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            disabled
                            className="py-2 px-3 rounded-lg font-semibold bg-red-600 text-red-200 cursor-not-allowed opacity-50"
                            title={slot.reason}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <p>Please select a service, stylist, and date to view available time slots</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-12">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="py-4 px-8 border-2 border-[#D9C27B] text-[#D9C27B] font-bold rounded-full hover:bg-[#D9C27B] hover:text-black transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.stylist || !formData.date || !formData.time}
                    className={`py-4 px-12 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                      formData.stylist && formData.date && formData.time
                        ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black hover:from-[#F4E4A6] hover:to-[#D9C27B] shadow-lg hover:shadow-xl'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Continue to Confirm
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information & Confirmation */}
            {currentStep === 3 && (
              <div className="bg-black p-8 sm:p-12 rounded-3xl border border-[#D9C27B]/20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Confirm Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Booking</span>
                  </h2>
                  <p className="text-gray-300">
                    Please provide your contact details to complete the booking
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Contact Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#D9C27B] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D9C27B]/30 rounded-lg focus:border-[#D9C27B] focus:outline-none text-white placeholder-gray-400"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#D9C27B] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D9C27B]/30 rounded-lg focus:border-[#D9C27B] focus:outline-none text-white placeholder-gray-400"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#D9C27B] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D9C27B]/30 rounded-lg focus:border-[#D9C27B] focus:outline-none text-white placeholder-gray-400"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#D9C27B] mb-2">
                        Special Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D9C27B]/30 rounded-lg focus:border-[#D9C27B] focus:outline-none text-white placeholder-gray-400 resize-none"
                        placeholder="Any special requests or notes..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-6 rounded-2xl border border-[#D9C27B]/20">
                    <h3 className="text-xl font-bold text-[#D9C27B] mb-6">Booking Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Service:</span>
                        <span className="text-white font-semibold">
                          {services.find(s => s.id === formData.service)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Price:</span>
                        <span className="text-[#D9C27B] font-bold">
                          {services.find(s => s.id === formData.service)?.price}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Duration:</span>
                        <span className="text-white">
                          {services.find(s => s.id === formData.service)?.duration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Stylist:</span>
                        <span className="text-white">
                          {stylists.find(s => s.id === formData.stylist)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Date:</span>
                        <span className="text-white">{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Time:</span>
                        <span className="text-white">{formData.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-12">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="py-4 px-8 border-2 border-[#D9C27B] text-[#D9C27B] font-bold rounded-full hover:bg-[#D9C27B] hover:text-black transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.name || !formData.email || !formData.phone}
                    className={`py-4 px-12 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                      formData.name && formData.email && formData.phone
                        ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black hover:from-[#F4E4A6] hover:to-[#D9C27B] shadow-lg hover:shadow-xl'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Need Help? <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Contact Us</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-black border border-[#D9C27B]/20">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-lg font-bold text-[#D9C27B] mb-2">Call Us</h3>
              <p className="text-white">+91 7997135893</p>
            </div>
            <div className="p-6 rounded-2xl bg-black border border-[#D9C27B]/20">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-lg font-bold text-[#D9C27B] mb-2">Visit Us</h3>
              <p className="text-white">Kaladhungi Road, Kusumkhera<br />Haldwani (263139)</p>
            </div>
            <div className="p-6 rounded-2xl bg-black border border-[#D9C27B]/20">
              <div className="text-4xl mb-4">🕒</div>
              <h3 className="text-lg font-bold text-[#D9C27B] mb-2">Hours</h3>
              <p className="text-white">Mon - Sun<br />9:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;




//i want to make logic for appointment .in my website i want user come to website choose service and than choose specialist ,date and slot. if this time specialist not free(he has already another srvice ) tahn the slot already booken user can choose another time or another specialist .if user choose 11am and service take 1 hour so specialist not free from 11 am to 12 pm than he will free.make this logic handle appointment frontend and backend both.