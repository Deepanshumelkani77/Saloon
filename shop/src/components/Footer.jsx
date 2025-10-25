import React from 'react';
import { 
  FaCut, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaWhatsapp,
  FaStar,
  FaHeart,
  FaShoppingBag,
  FaGift,
  FaCreditCard,
  FaTruck,
  FaShieldAlt,
  FaArrowUp
} from 'react-icons/fa';

const Footer = () => {
  const gold = '#D9C27B';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Hair Care', href: '#' },
    { name: 'Skin Care', href: '#' },
    { name: 'Men\'s Grooming', href: '#' },
    { name: 'Women\'s Beauty', href: '#' },
    { name: 'Accessories', href: '#' },
    { name: 'Best Sellers', href: '#' }
  ];

  const customerService = [
    { name: 'Contact Us', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Returns & Exchanges', href: '#' },
    { name: 'Size Guide', href: '#' },
    { name: 'Track Your Order', href: '#' }
  ];

  const aboutLinks = [
    { name: 'Our Story', href: '#' },
    { name: 'Salon Locations', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Wholesale', href: '#' },
    { name: 'Affiliate Program', href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-br from-black via-[#23211b] to-[#181818] text-white">
      
      {/* Newsletter Section */}
      <div className="border-b border-[#D9C27B]/20">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B]/30 rounded-full px-6 py-2 mb-6">
              <FaGift className="text-[#D9C27B] text-sm" />
              <span className="text-[#D9C27B] font-semibold text-sm">EXCLUSIVE OFFERS</span>
              <FaStar className="text-[#D9C27B] text-sm animate-pulse" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with <span className="text-[#D9C27B]">Beauty Trends</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to get exclusive offers, new product launches, and professional beauty tips directly to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-gray-800/50 border border-gray-600 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:border-[#D9C27B] focus:outline-none focus:ring-2 focus:ring-[#D9C27B]/50 transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-bold py-4 px-8 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
            
            <p className="text-gray-400 text-sm mt-4">
              Join 50,000+ beauty enthusiasts. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <FaCut className="text-3xl text-[#D9C27B] animate-spin-slow" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-wide">Me & Guys</span>
                <span className="text-sm tracking-widest font-normal text-[#D9C27B]">S H O P</span>
              </div>
            </div>
            
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Your trusted destination for premium beauty and grooming products. 
              Professional salon quality, delivered to your doorstep.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <FaMapMarkerAlt className="text-[#D9C27B] text-sm" />
                <span className="text-sm">123 Beauty Street, Salon City, SC 12345</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaPhone className="text-[#D9C27B] text-sm" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaEnvelope className="text-[#D9C27B] text-sm" />
                <span className="text-sm">shop@meandguys.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaClock className="text-[#D9C27B] text-sm" />
                <span className="text-sm">Mon-Sat: 9AM-8PM, Sun: 10AM-6PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaShoppingBag className="text-[#D9C27B] text-lg" />
              Shop Categories
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-[#D9C27B] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#D9C27B] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaHeart className="text-[#D9C27B] text-lg" />
              Customer Care
            </h3>
            <ul className="space-y-3">
              {customerService.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-[#D9C27B] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#D9C27B] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Social */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaStar className="text-[#D9C27B] text-lg" />
              About Us
            </h3>
            <ul className="space-y-3 mb-8">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-[#D9C27B] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#D9C27B] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: FaFacebookF, href: '#', color: '#1877F2' },
                  { icon: FaInstagram, href: '#', color: '#E4405F' },
                  { icon: FaTwitter, href: '#', color: '#1DA1F2' },
                  { icon: FaYoutube, href: '#', color: '#FF0000' },
                  { icon: FaWhatsapp, href: '#', color: '#25D366' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="group bg-gray-800 hover:bg-[#D9C27B] p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="text-gray-300 group-hover:text-black text-lg transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-[#D9C27B]/20">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FaTruck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: FaCreditCard, title: 'Secure Payment', desc: '100% protected' },
              { icon: FaShieldAlt, title: 'Quality Guarantee', desc: 'Authentic products' },
              { icon: FaHeart, title: '24/7 Support', desc: 'Always here to help' }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B]/30 rounded-2xl p-4 mb-3 group-hover:border-[#D9C27B]/50 transition-all duration-300">
                  <feature.icon className="text-[#D9C27B] text-2xl mx-auto mb-2" />
                  <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-gray-400 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#D9C27B]/20">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Me & Guys Shop. All rights reserved. | 
              <a href="#" className="text-[#D9C27B] hover:text-white transition-colors duration-300 ml-1">Privacy Policy</a> | 
              <a href="#" className="text-[#D9C27B] hover:text-white transition-colors duration-300 ml-1">Terms of Service</a>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Made with</span>
              <FaHeart className="text-red-500 text-sm animate-pulse" />
              <span className="text-gray-400 text-sm">for beauty lovers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="cursor-pointer fixed bottom-8 right-8 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black p-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-lg" />
      </button>
    </footer>
  );
};

export default Footer;
