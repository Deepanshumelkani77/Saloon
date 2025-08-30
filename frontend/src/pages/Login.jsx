import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaCut, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import {useNavigate} from 'react-router-dom'


const gold = '#D9C27B';

const Login = ({ onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });

  //import from AppContext
  const navigate = useNavigate();
  const { signup } = useContext(AppContext);
  const { login } = useContext(AppContext);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(formData.fullName, formData.email, formData.password, formData.phone);
        onClose(); // Close the modal
        navigate("/");
      } else {
        await login(formData.email, formData.password);
        onClose(); // Close the modal
        navigate("/");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({
      email: '',
      password: '',
      fullName: '',
      phone: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-black/95 backdrop-blur-xl border border-[#D9C27B]/30 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="text-center py-8 px-6 border-b border-[#D9C27B]/20 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-[#D9C27B] transition-colors text-xl"
          >
            <FaTimes />
          </button>
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaCut className="text-3xl animate-spin-slow" style={{ color: gold }} />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white tracking-wide">Me & Guys</span>
              <span className="text-xs tracking-widest font-normal" style={{ color: gold }}>
                UNISEX SALON
              </span>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isSignup 
              ? 'Join us for premium salon services' 
              : 'Login to book your appointment'
            }
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D9C27B]" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-1 focus:ring-[#D9C27B] transition-all"
                  required={isSignup}
                />
              </div>
            )}

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D9C27B]" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-1 focus:ring-[#D9C27B] transition-all"
                required
              />
            </div>

            {isSignup && (
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D9C27B]" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-1 focus:ring-[#D9C27B] transition-all"
                  required={isSignup}
                />
              </div>
            )}

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D9C27B]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-1 focus:ring-[#D9C27B] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#D9C27B] transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>


            {!isSignup && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-[#D9C27B] hover:text-[#F4E4A6] transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
              style={{
                backgroundColor: gold,
                color: '#000',
              }}
              onMouseOver={e => { e.currentTarget.style.backgroundColor = '#F4E4A6'; }}
              onMouseOut={e => { e.currentTarget.style.backgroundColor = gold; }}
            >
              {isSignup ? 'Create Account' : 'Login'}
            </button>
          </form>

          {/* Toggle Form */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={toggleForm}
                className="ml-2 text-[#D9C27B] hover:text-[#F4E4A6] font-semibold transition-colors"
              >
                {isSignup ? 'Login' : 'Signup'}
              </button>
            </p>
          </div>

          {/* Social Login Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white hover:bg-gray-800/50 transition-all"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white hover:bg-gray-800/50 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
