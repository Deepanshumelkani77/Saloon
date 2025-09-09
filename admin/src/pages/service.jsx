import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaSearch, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCut, 
  FaMoneyBillWave, 
  FaClock, 
  FaEye,
  FaTimes,
  FaCheck,
  FaFilter
} from 'react-icons/fa';

const Service = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    description: ''
  });

  const API_BASE_URL = 'http://localhost:1000/service';
  const categories = ['Hair Cut', 'Hair Color', 'Facial', 'Massage', 'Manicure', 'Pedicure', 'Makeup', 'Skincare'];

  // Fetch services from backend
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/all`);
      setServices(response.data);
      setFilteredServices(response.data);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to fetch services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Filter services based on search and category
  useEffect(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(service => service.category === filterCategory);
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, filterCategory]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open modal for adding new service
  const handleAddService = () => {
    setModalMode('add');
    setFormData({
      name: '',
      category: '',
      price: '',
      duration: '',
      description: ''
    });
    setShowModal(true);
  };

  // Open modal for editing service
  const handleEditService = (service) => {
    if (!service) {
      console.error('Service object is undefined');
      setError('Service data not found. Please refresh the page.');
      return;
    }
    
    console.log('Editing service:', service);
    
    setModalMode('edit');
    setSelectedService(service);
    setFormData({
      name: service.name || '',
      category: service.category || '',
      price: (service.price !== undefined && service.price !== null) ? String(service.price) : '',
      duration: (service.duration !== undefined && service.duration !== null) ? String(service.duration) : '',
      description: service.description || ''
    });
    setShowModal(true);
  };

  // Open modal for viewing service details
  const handleViewService = (service) => {
    setModalMode('view');
    setSelectedService(service);
    setShowModal(true);
  };

  // Submit form (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const serviceData = {
        ...formData,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration)
      };

      if (modalMode === 'add') {
        await axios.post(`${API_BASE_URL}/create`, serviceData);
      } else if (modalMode === 'edit') {
        await axios.put(`${API_BASE_URL}/update/${selectedService._id}`, serviceData);
      }

      setShowModal(false);
      fetchServices();
    } catch (err) {
      console.error('Error saving service:', err);
      setError('Failed to save service. Please try again.');
    }
  };

  // Delete service
  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${API_BASE_URL}/delete/${serviceId}`);
        fetchServices();
      } catch (err) {
        console.error('Error deleting service:', err);
        setError('Failed to delete service. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#23211b] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9C27B] mx-auto mb-4"></div>
          <p className="text-white">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#23211b] p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <FaTimes className="text-red-400" />
              <p className="text-red-400">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaCut className="text-3xl text-[#D9C27B]" />
              <div>
                <h1 className="text-3xl font-bold text-white">Service Management</h1>
                <p className="text-gray-400">Manage salon services and pricing</p>
              </div>
            </div>
            
            <button
              onClick={handleAddService}
              className="px-6 py-3 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <FaPlus />
              Add New Service
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#D9C27B]/20 rounded-lg flex items-center justify-center">
                  <FaCut className="text-[#D9C27B] text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{services.length}</p>
                  <p className="text-gray-400 text-sm">Total Services</p>
                </div>
              </div>
            </div>

            <div className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FaMoneyBillWave className="text-blue-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    ₹{services.length > 0 ? Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length) : 0}
                  </p>
                  <p className="text-gray-400 text-sm">Avg. Price</p>
                </div>
              </div>
            </div>

            <div className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FaClock className="text-green-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {services.length > 0 ? Math.round(services.reduce((sum, s) => sum + s.duration, 0) / services.length) : 0}m
                  </p>
                  <p className="text-gray-400 text-sm">Avg. Duration</p>
                </div>
              </div>
            </div>

            <div className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <FaFilter className="text-purple-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {new Set(services.map(s => s.category)).size}
                  </p>
                  <p className="text-gray-400 text-sm">Categories</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D9C27B] transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaFilter className="text-[#D9C27B]" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FaCut className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No services found</p>
            </div>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl overflow-hidden hover:border-[#D9C27B]/40 transition-all duration-200 group"
              >
                {/* Service Header */}
                <div className="relative h-15 bg-black/20 flex items-center justify-center">
                  <FaCut className="text-3xl text-[#D9C27B]" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#D9C27B]/90 text-black text-xs font-semibold rounded-full">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Service Info */}
                <div className="p-6">
                  <h3 className="text-3xl font-bold  text-white mb-2 group-hover:text-[#D9C27B] transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-[#D9C27B]">
                        <FaMoneyBillWave className="text-sm" />
                        <span className="font-semibold">₹{service.price}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <FaClock className="text-sm" />
                        <span className="text-sm">{service.duration}m</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewService(service)}
                      className="flex-1 px-3 py-2 bg-[#D9C27B]/20 text-[#D9C27B] rounded-lg hover:bg-[#D9C27B]/30 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <FaEye />
                      View
                    </button>
                    <button
                      onClick={() => {
                        console.log('Service object:', service);
                        handleEditService(service);
                      }}
                      className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <FaEdit />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black/95 backdrop-blur-xl border border-[#D9C27B]/30 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {modalMode === 'add' ? 'Add New Service' : 
                   modalMode === 'edit' ? 'Edit Service' : 'Service Details'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {modalMode === 'view' ? (
                // View Mode
                <div className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Service Name</p>
                      <p className="text-white font-medium text-lg">{selectedService?.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Category</p>
                      <p className="text-[#D9C27B] font-medium">{selectedService?.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Price</p>
                      <p className="text-white font-bold text-xl">₹{selectedService?.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Duration</p>
                      <p className="text-white font-medium">{selectedService?.duration} minutes</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Description</p>
                    <p className="text-gray-300">{selectedService?.description}</p>
                  </div>
                </div>
              ) : (
                // Add/Edit Form
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Service Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                        placeholder="Enter service name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                      >
                        <option value="">Select category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Price (₹) *</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                        placeholder="Enter price"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Duration (minutes) *</label>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                        placeholder="Enter duration"
                      />
                    </div>
                  </div>
                  
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors resize-none"
                      placeholder="Enter service description"
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <FaCheck />
                      {modalMode === 'add' ? 'Add Service' : 'Update Service'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Service;
