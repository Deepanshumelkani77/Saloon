import React, { useState, useContext, useRef } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCamera, FaEdit, FaSave, FaTimes, FaUpload, FaUserCircle } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Profile = () => {
  const { admin, setAdmin, token } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: admin?.username || '',
    email: admin?.email || '',
    phone_no: admin?.phone_no || '',
    bio: admin?.bio || '',
    image: admin?.image || '',
    address: admin?.address || '',
    gender: admin?.gender || '',
    dob: admin?.dob || ''
  });

  const gold = '#D9C27B';
  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload";
  const uploadPreset = "Saloon";

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', uploadPreset);
      formDataUpload.append('folder', 'admin_profiles');

      const response = await axios.post(cloudinaryUrl, formDataUpload);
      
      if (response.data.secure_url) {
        setFormData(prev => ({
          ...prev,
          profileImage: response.data.secure_url
        }));
        setSuccess('Image uploaded successfully!');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.put(
        'http://localhost:1000/admin/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.admin) {
        setAdmin(response.data.admin);
        // Update cookies
        const Cookies = require('js-cookie');
        Cookies.set('admin', JSON.stringify(response.data.admin), { expires: 1 });
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: admin?.name || admin?.username || '',
      email: admin?.email || '',
      phone: admin?.phone || '',
      bio: admin?.bio || '',
      profileImage: admin?.profileImage || ''
    });
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-[#23211b] p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaUser className="text-3xl text-[#D9C27B]" />
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Profile</h1>
              <p className="text-gray-400">Manage your profile information and settings</p>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-500/20 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <FaSave className="text-green-400" />
              <p className="text-green-400">{success}</p>
              <button 
                onClick={() => setSuccess(null)}
                className="ml-auto text-green-400 hover:text-green-300"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

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

        {/* Profile Card */}
        <div className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl overflow-hidden">
          
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-[#D9C27B]/10 to-[#F4E4A6]/10 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#D9C27B]/30 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6]">
                  {formData.profileImage ? (
                    <img 
                      src={formData.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaUserCircle className="text-6xl text-black" />
                    </div>
                  )}
                </div>
                
                {/* Image Upload Button */}
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={imageUploading}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-[#D9C27B] rounded-full flex items-center justify-center text-black hover:bg-[#F4E4A6] transition-colors disabled:opacity-50"
                  >
                    {imageUploading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    ) : (
                      <FaCamera />
                    )}
                  </button>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {admin?.name || admin?.username || 'Admin User'}
                </h2>
                <p className="text-[#D9C27B] font-medium mb-2">Administrator</p>
                <p className="text-gray-400">
                  {admin?.bio || 'Salon Administrator - Managing operations and services'}
                </p>
              </div>

              {/* Edit Button */}
              <div className="flex gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-[#D9C27B] text-black rounded-lg font-semibold hover:bg-[#F4E4A6] transition-colors flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <FaSave />
                      )}
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <FaTimes />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <h3 className="text-xl font-semibold text-white mb-6">Profile Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D9C27B]" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-1 focus:ring-[#D9C27B] transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg">
                    <FaUser className="text-[#D9C27B]" />
                    <span className="text-white">{admin?.name || admin?.username || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D9C27B]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-1 focus:ring-[#D9C27B] transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg">
                    <FaEnvelope className="text-[#D9C27B]" />
                    <span className="text-white">{admin?.email || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D9C27B]" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-1 focus:ring-[#D9C27B] transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg">
                    <FaPhone className="text-[#D9C27B]" />
                    <span className="text-white">{admin?.phone || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-1 focus:ring-[#D9C27B] transition-all resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="p-3 bg-gray-900/30 rounded-lg">
                    <p className="text-white">{admin?.bio || 'No bio provided'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          {/* Account Status */}
          <div className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Account Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Role</span>
                <span className="text-[#D9C27B]">Administrator</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Stats</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Appointments</span>
                <span className="text-white font-semibold">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">This Month</span>
                <span className="text-[#D9C27B] font-semibold">24</span>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-black backdrop-blur-xl border border-[#D9C27B]/20 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Security</h4>
            <div className="space-y-3">
              <button className="w-full text-left text-gray-400 hover:text-[#D9C27B] transition-colors">
                Change Password
              </button>
              <button className="w-full text-left text-gray-400 hover:text-[#D9C27B] transition-colors">
                Two-Factor Auth
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;