import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaSearch, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaUser, 
  FaClock, 
  FaPhone, 
  FaEnvelope,
  FaTimes,
  FaCheck,
  FaFilter,
  FaToggleOn,
  FaToggleOff,
  FaStar,
  FaUserTie,
  FaUpload,
  FaImage
} from 'react-icons/fa';

const Specialist = () => {
  const [stylists, setStylists] = useState([]);
  const [filteredStylists, setFilteredStylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experience: '',
    phone: '',
    email: '',
    image: '',
    isActive: true,
    workingHours: {
      start: '9:00 AM',
      end: '8:00 PM'
    },
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  });

  const API_BASE_URL = 'http://localhost:1000/stylist';
  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload";
  const uploadPreset = "Saloon";

  const specialties = [
    "Hair Cutting", "Hair Coloring", "Hair Styling", "Beard Grooming", 
    "Facial Treatments", "Massage Therapy", "Makeup Artist", "Nail Technician",
    "Eyebrow Threading", "Hair Extensions", "Bridal Specialist", "Men's Grooming"
  ];

  const workingDaysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Fetch stylists from backend
  const fetchStylists = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/all`);
      setStylists(response.data);
      setFilteredStylists(response.data);
    } catch (err) {
      console.error('Error fetching stylists:', err);
      setError('Failed to fetch stylists. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStylists();
  }, []);

  // Filter stylists
  useEffect(() => {
    let filtered = stylists;

    if (searchTerm) {
      filtered = filtered.filter(stylist => 
        (stylist.name && stylist.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (stylist.specialty && stylist.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterSpecialty !== 'all') {
      filtered = filtered.filter(stylist => stylist.specialty === filterSpecialty);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(stylist => 
        filterStatus === 'active' ? stylist.isActive : !stylist.isActive
      );
    }

    setFilteredStylists(filtered);
  }, [stylists, searchTerm, filterSpecialty, filterStatus]);

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setImageUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'salon/stylists');

      const response = await axios.post(cloudinaryUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.secure_url;
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }));
      setImagePreview(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'workingDays') {
      const updatedDays = checked 
        ? [...formData.workingDays, value]
        : formData.workingDays.filter(day => day !== value);
      setFormData(prev => ({
        ...prev,
        workingDays: updatedDays
      }));
    } else if (name.includes('workingHours')) {
      const timeType = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [timeType]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Modal handlers
  const handleAddStylist = () => {
    setModalMode('add');
    setFormData({
      name: '',
      specialty: '',
      experience: '',
      phone: '',
      email: '',
      image: '',
      isActive: true,
      workingHours: { start: '9:00 AM', end: '8:00 PM' },
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const handleEditStylist = (stylist) => {
    setModalMode('edit');
    setSelectedStylist(stylist);
    setFormData({
      name: stylist.name || '',
      specialty: stylist.specialty || '',
      experience: stylist.experience || '',
      phone: stylist.phone || '',
      email: stylist.email || '',
      image: stylist.image || '',
      isActive: stylist.isActive !== undefined ? stylist.isActive : true,
      workingHours: stylist.workingHours || { start: '9:00 AM', end: '8:00 PM' },
      workingDays: stylist.workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    });
    setImagePreview(stylist.image || null);
    setShowModal(true);
  };

  const handleViewStylist = (stylist) => {
    setModalMode('view');
    setSelectedStylist(stylist);
    setShowModal(true);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalMode === 'add') {
        await axios.post(`${API_BASE_URL}/create`, formData);
      } else if (modalMode === 'edit') {
        await axios.put(`${API_BASE_URL}/update/${selectedStylist._id}`, formData);
      }
      setShowModal(false);
      fetchStylists();
    } catch (err) {
      console.error('Error saving stylist:', err);
      setError('Failed to save stylist. Please try again.');
    }
  };

  // Delete stylist
  const handleDeleteStylist = async (stylistId) => {
    if (window.confirm('Are you sure you want to delete this stylist?')) {
      try {
        await axios.delete(`${API_BASE_URL}/delete/${stylistId}`);
        fetchStylists();
      } catch (err) {
        console.error('Error deleting stylist:', err);
        setError('Failed to delete stylist. Please try again.');
      }
    }
  };

  // Toggle status
  const handleToggleStatus = async (stylistId) => {
    try {
      await axios.patch(`${API_BASE_URL}/toggle/${stylistId}`);
      fetchStylists();
    } catch (err) {
      console.error('Error toggling stylist status:', err);
      setError('Failed to update stylist status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#23211b] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9C27B] mx-auto mb-4"></div>
          <p className="text-white">Loading specialists...</p>
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
              <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-300">
                <FaTimes />
              </button>
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaUserTie className="text-3xl text-[#D9C27B]" />
              <div>
                <h1 className="text-3xl font-bold text-white">Specialist Management</h1>
                <p className="text-gray-400">Manage salon staff and stylists</p>
              </div>
            </div>
            
            <button
              onClick={handleAddStylist}
              className="px-6 py-3 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <FaPlus />
              Add New Specialist
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#D9C27B]/20 rounded-lg flex items-center justify-center">
                  <FaUserTie className="text-[#D9C27B] text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stylists.length}</p>
                  <p className="text-gray-400 text-sm">Total Specialists</p>
                </div>
              </div>
            </div>

            <div className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FaToggleOn className="text-green-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {stylists.filter(s => s.isActive).length}
                  </p>
                  <p className="text-gray-400 text-sm">Active</p>
                </div>
              </div>
            </div>

            <div className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <FaToggleOff className="text-red-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {stylists.filter(s => !s.isActive).length}
                  </p>
                  <p className="text-gray-400 text-sm">Inactive</p>
                </div>
              </div>
            </div>

            <div className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <FaStar className="text-purple-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {new Set(stylists.map(s => s.specialty)).size}
                  </p>
                  <p className="text-gray-400 text-sm">Specialties</p>
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
                  placeholder="Search specialists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D9C27B] transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaFilter className="text-[#D9C27B]" />
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
              >
                <option value="all">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Specialists List */}
        <div className="space-y-4">
          {filteredStylists.length === 0 ? (
            <div className="text-center py-12">
              <FaUserTie className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No specialists found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredStylists.map((stylist) => (
              <div
                key={stylist._id}
                className="group relative bg-black border border-[#D9C27B]/30 rounded-2xl p-6 hover:border-[#D9C27B]/60 hover:shadow-xl hover:shadow-[#D9C27B]/20 transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  {/* Staff Image */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                      {stylist.image ? (
                        <img 
                          src={stylist.image} 
                          alt={stylist.name}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <FaUser className="text-2xl text-black" />
                      )}
                    </div>
                  </div>

                  {/* Staff Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#D9C27B] transition-colors duration-300">
                          {stylist.name}
                        </h3>
                        <p className="text-[#D9C27B] font-semibold text-sm">{stylist.specialty}</p>
                      </div>
                      
                      {/* Status Badge */}
                      <button
                        onClick={() => handleToggleStatus(stylist._id)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          stylist.isActive 
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        }`}
                      >
                        {stylist.isActive ? <FaToggleOn /> : <FaToggleOff />}
                        {stylist.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </div>

                    {/* Details Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaClock className="text-sm text-[#D9C27B]" />
                        <span className="text-sm">{stylist.experience}</span>
                      </div>
                      
                      {stylist.phone && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <FaPhone className="text-sm text-[#D9C27B]" />
                          <span className="text-sm">{stylist.phone}</span>
                        </div>
                      )}
                      
                      {stylist.email && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <FaEnvelope className="text-sm text-[#D9C27B]" />
                          <span className="text-sm truncate">{stylist.email}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaClock className="text-sm text-[#D9C27B]" />
                        <span className="text-sm">
                          {stylist.workingHours?.start} - {stylist.workingHours?.end}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewStylist(stylist)}
                        className="px-4 py-2 bg-[#D9C27B]/20 text-[#D9C27B] rounded-lg hover:bg-[#D9C27B]/30 border border-[#D9C27B]/20 hover:border-[#D9C27B]/40 transition-all duration-200 flex items-center gap-2 text-sm font-medium group/btn"
                      >
                        <FaUser className="group-hover/btn:scale-110 transition-transform" />
                        View
                      </button>
                      <button
                        onClick={() => handleEditStylist(stylist)}
                        className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-200 flex items-center gap-2 text-sm font-medium group/btn"
                      >
                        <FaEdit className="group-hover/btn:scale-110 transition-transform" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStylist(stylist._id)}
                        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 border border-red-500/20 hover:border-red-500/40 transition-all duration-200 flex items-center gap-2 group/btn"
                      >
                        <FaTrash className="group-hover/btn:scale-110 transition-transform" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D9C27B]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black/95 backdrop-blur-xl border border-[#D9C27B]/30 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {modalMode === 'add' ? 'Add New Specialist' : 
                   modalMode === 'edit' ? 'Edit Specialist' : 'Specialist Details'}
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
                  {/* Profile Image Display */}
                  {selectedStylist?.image && (
                    <div className="flex justify-center mb-6">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#D9C27B]/30">
                        <img 
                          src={selectedStylist.image} 
                          alt={selectedStylist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-400 text-sm">Name</p>
                      <p className="text-white font-medium text-lg">{selectedStylist?.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Specialty</p>
                      <p className="text-[#D9C27B] font-medium">{selectedStylist?.specialty}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Experience</p>
                      <p className="text-white font-medium">{selectedStylist?.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Status</p>
                      <p className={`font-medium ${selectedStylist?.isActive ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedStylist?.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                    {selectedStylist?.phone && (
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white font-medium">{selectedStylist?.phone}</p>
                      </div>
                    )}
                    {selectedStylist?.email && (
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white font-medium">{selectedStylist?.email}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Working Hours</p>
                    <p className="text-white font-medium">
                      {selectedStylist?.workingHours?.start} - {selectedStylist?.workingHours?.end}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Working Days</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedStylist?.workingDays?.map(day => (
                        <span key={day} className="px-3 py-1 bg-[#D9C27B]/20 text-[#D9C27B] rounded-full text-sm">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Add/Edit Form
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                        placeholder="Enter specialist name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Specialty *</label>
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                      >
                        <option value="">Select specialty</option>
                        {specialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Experience *</label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                        placeholder="e.g., 5 years"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                        placeholder="Enter phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                        placeholder="Enter email address"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm mb-2">Profile Image</label>
                      
                      {/* Image Preview */}
                      {(imagePreview || formData.image) && (
                        <div className="mb-4 flex justify-center">
                          <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#D9C27B]/30">
                            <img 
                              src={imagePreview || formData.image} 
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, image: '' }));
                                setImagePreview(null);
                              }}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <FaTimes className="text-xs" />
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Upload Button */}
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                          <div className={`w-full px-4 py-3 border-2 border-dashed rounded-lg text-center transition-all duration-200 ${
                            imageUploading 
                              ? 'border-[#D9C27B]/50 bg-[#D9C27B]/10' 
                              : 'border-[#D9C27B]/20 hover:border-[#D9C27B]/40 hover:bg-[#D9C27B]/5'
                          }`}>
                            {imageUploading ? (
                              <div className="flex items-center justify-center gap-2 text-[#D9C27B]">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#D9C27B]"></div>
                                <span>Uploading...</span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2 text-gray-400 hover:text-[#D9C27B] transition-colors">
                                <FaUpload />
                                <span>Click to upload image</span>
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={imageUploading}
                          />
                        </label>
                        
                        {/* Manual URL Input */}
                        <div className="flex-1">
                          <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/20 rounded-lg text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                            placeholder="Or paste image URL"
                          />
                        </div>
                      </div>
                      
                      <p className="text-gray-500 text-xs mt-2">
                        Upload an image (max 5MB) or paste an image URL
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-gray-400 text-sm">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleInputChange}
                          className="rounded"
                        />
                        Active Status
                      </label>
                    </div>
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
                      {modalMode === 'add' ? 'Add Specialist' : 'Update Specialist'}
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

export default Specialist;
