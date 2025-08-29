import React from 'react';
import { FaCut, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    'Hair Cut & Styling',
    'Beard Grooming',
    'Hair Coloring',
    'Facial Treatments',
    'Massage Therapy',
    'Bridal Makeup'
  ];

  const quickLinks = [
    {links:"Home",path:"/"},
    {links:"Services",path:"/ladies"},
    {links:"About Us",path:"/about"},
    {links:"Gallery",path:"/gallery"},
    {links:"Contact",path:"/contact"},
    {links:"Book Appointment",path:"/book"}
  ];

  return (
    <footer className="bg-gradient-to-br from-black via-[#23211b] to-[#181818] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <FaCut className="text-4xl text-[#D9C27B] animate-pulse" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-wide">Me & Guys</span>
                <span className="text-xs tracking-widest font-normal text-[#D9C27B]">U N I S E X  S A L O O N</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Experience premium grooming and beauty services in a luxurious environment. We blend traditional techniques with modern trends to give you the perfect look.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, href: '#' },
                { icon: FaInstagram, href: 'https://www.instagram.com/me_and_guys_unisex_salon/?hl=en' },
                { icon: FaTwitter, href: '#' },
                { icon: FaYoutube, href: '#' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 bg-[#D9C27B]/20 rounded-full flex items-center justify-center text-[#D9C27B] hover:bg-[#D9C27B] hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-[#D9C27B] mb-6 tracking-wide">OUR SERVICES</h3>
            <div className="space-y-3">
              {services.map((service, idx) => (
                <a
                  key={idx}
                  href=""
                  className="block text-gray-300 hover:text-[#D9C27B] transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {service}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-[#D9C27B] mb-6 tracking-wide">QUICK LINKS</h3>
            <div className="space-y-3">
              {quickLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.path}
                  className="block text-gray-300 hover:text-[#D9C27B] transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {link.links}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-[#D9C27B] mb-6 tracking-wide">GET IN TOUCH</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-[#D9C27B] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Kaladhungi Road, Kusumkhera</p>
                  <p className="text-gray-300">Haldwani-(263139)</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaPhone className="text-[#D9C27B] flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-[#D9C27B] transition-colors">
                  +1 (234) 567-8900
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-[#D9C27B] flex-shrink-0" />
                <a href="mailto:info@meandguys.com" className="text-gray-300 hover:text-[#D9C27B] transition-colors">
                  info@meandguys.com
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <FaClock className="text-[#D9C27B] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p className="text-gray-300">Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-[#D9C27B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-[#D9C27B] mb-2">Stay Updated</h4>
              <p className="text-gray-300">Subscribe to get special offers and updates</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-black/50 border border-[#D9C27B]/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#D9C27B] transition-colors w-full sm:w-64"
              />
              <button className="px-6 py-2 bg-[#D9C27B] text-black font-semibold rounded-full hover:bg-[#bfa14a] transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#D9C27B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <p>&copy; {currentYear} Me & Guys Unisex Saloon. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#D9C27B] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#D9C27B] transition-colors">Terms of Service</a>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made by</span>
              <span className="text-[#D9C27B] animate-pulse">♥</span>
              <span>Dev Melkani</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
