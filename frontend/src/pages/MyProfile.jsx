import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { FaUser, FaEdit, FaSave, FaTimes, FaCamera, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUserCircle } from 'react-icons/fa';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const { user, setUser } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
 const [userInfo, setUserInfo] = useState(null);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    bio: ''
  });


   const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  
  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload";
  const uploadPreset = "Saloon";

  useEffect(() => {
    if (user && user.id) {
      axios.get(`http://localhost:5000/user/info/${user.id}`)
        .then((res) => {
          const data = res.data;
          setUserInfo(data);
          setProfileData({
            name: data.username || data.name || 'Your Name',
            email: data.email || 'your.email@example.com',
            phone: data.phone || '+91 XXXXX XXXXX',
            address: data.address || 'Your Address, City, State',
            dateOfBirth: data.dateOfBirth || '',
            bio: data.bio || 'Tell us about yourself...'
          });
          setImage(data.image || '');
        })
        .catch((err) => {
          console.error('Error fetching user info:', err);
        });
    }
  }, [user]);


  


  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

   const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = image;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

     try {
  const res = await axios.post(cloudinaryUrl, formData);
  console.log("Cloudinary response:", res.data);
  imageUrl = res.data.secure_url;
} catch (err) {
  console.error("Image upload failed:", err.response ? err.response.data : err.message);
  alert("Image upload failed");
  setLoading(false);
  return;
}
    }

    const updatedData = {
      username: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address,
      dateOfBirth: profileData.dateOfBirth,
      bio: profileData.bio,
      image: imageUrl
    };

    try {
      const res = await axios.put(`http://localhost:5000/user/profile/${user.id}`, updatedData);
      
      if (res.status === 200) {
        alert("Profile updated successfully!");
        setUserInfo({ ...userInfo, ...updatedData });
        setImage(imageUrl);
        setFile(null);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to original user data
    if (userInfo) {
      setProfileData({
        name: userInfo.username || userInfo.name || 'Your Name',
        email: userInfo.email || 'your.email@example.com',
        phone: userInfo.phone || '+91 XXXXX XXXXX',
        address: userInfo.address || 'Your Address, City, State',
        dateOfBirth: userInfo.dateOfBirth || '',
        bio: userInfo.bio || 'Tell us about yourself...'
      });
      setImage(userInfo.image || '');
    }
    setFile(null);
    setIsEditing(false);
  };



  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-300">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] text-white">
    

      {/* Profile Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] rounded-3xl border border-[#D9C27B]/20 p-8 sm:p-12">
            
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12">

              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#D9C27B] bg-gradient-to-br from-[#D9C27B]/20 to-[#F4E4A6]/10">
                  {image ? (
                    <img 
                      src={userInfo.image} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaUserCircle className="text-6xl sm:text-7xl text-[#D9C27B]" />
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-[#D9C27B] hover:bg-[#F4E4A6] text-black p-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110">
                    <FaCamera />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="mb-4">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="text-3xl font-bold bg-transparent border-b-2 border-[#D9C27B] focus:outline-none focus:border-[#F4E4A6] text-white w-full"
                      placeholder="Your Name"
                    />
                  ) : (
                    <h2 className="text-3xl font-bold text-white mb-2">{ }</h2>
                  )}
                </div>
                
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <FaEnvelope className="text-[#D9C27B]" />
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="bg-transparent border-b border-[#D9C27B]/50 focus:outline-none focus:border-[#D9C27B] text-white flex-1"
                        placeholder="your.email@example.com"
                      />
                    ) : (
                      <span>{}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <FaPhone className="text-[#D9C27B]" />
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="bg-transparent border-b border-[#D9C27B]/50 focus:outline-none focus:border-[#D9C27B] text-white flex-1"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    ) : (
                      <span>{}</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4 justify-center sm:justify-start">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <FaSave />
                        )}
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        <FaTimes />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black px-6 py-3 rounded-full font-semibold hover:from-[#F4E4A6] hover:to-[#D9C27B] transition-all duration-300 transform hover:scale-105"
                    >
                      <FaEdit />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Details */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#D9C27B] mb-6">Personal Details</h3>
                
                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-[#D9C27B] mb-2">
                    <FaMapMarkerAlt className="inline mr-2" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#D9C27B]/30 rounded-lg focus:border-[#D9C27B] focus:outline-none text-white placeholder-gray-400 resize-none"
                      placeholder="Your Address, City, State, PIN"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-[#2a2a2a] border border-[#D9C27B]/30 rounded-lg text-white min-h-[80px] flex items-center">
                      {profileData.address}
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-[#D9C27B] mb-2">
                    <FaCalendarAlt className="inline mr-2" />
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#D9C27B]/30 rounded-lg focus:border-[#D9C27B] focus:outline-none text-white"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-[#2a2a2a] border border-[#D9C27B]/30 rounded-lg text-white">
                      {profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Not specified'}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#D9C27B] mb-6">About Me</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-[#D9C27B] mb-2">
                    <FaUser className="inline mr-2" />
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#D9C27B]/30 rounded-lg focus:border-[#D9C27B] focus:outline-none text-white placeholder-gray-400 resize-none"
                      placeholder="Tell us about yourself, your preferences, or anything you'd like us to know..."
                    />
                  ) : (
                    <div className="px-4 py-3 bg-[#2a2a2a] border border-[#D9C27B]/30 rounded-lg text-white min-h-[140px] flex items-start">
                      <p className="leading-relaxed">{profileData.bio}</p>
                    </div>
                  )}
                </div>

                {/* Account Info */}
                <div className="bg-gradient-to-r from-[#D9C27B]/10 to-[#F4E4A6]/5 p-6 rounded-xl border border-[#D9C27B]/20">
                  <h4 className="text-lg font-semibold text-[#D9C27B] mb-4">Account Information</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><strong>Member since:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                    <p><strong>Account Type:</strong> Premium Customer</p>
                    <p><strong>Status:</strong> <span className="text-green-400">Active</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyProfile;
