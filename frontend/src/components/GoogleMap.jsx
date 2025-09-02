import React from 'react';

const GoogleMap = () => {
  return (
    <div className="pb-20 md:pb-30">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-3xl">📍</span>
          <h2 className="text-3xl font-bold text-white">
            Find Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Salon</span>
          </h2>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] mx-auto mb-4"></div>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Located in the heart of Haldwani - Easy to find with convenient parking available
        </p>
      </div>
      
      {/* Interactive Map Section */}
      <div className="bg-black p-8 rounded-3xl border border-[#D9C27B]/20">
        <div className="h-100 bg-[#1a1a1a] rounded-2xl border border-[#D9C27B]/10 relative overflow-hidden">
          {/* Google Maps Embed */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.123456789!2d79.50632!3d29.22235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDEzJzIwLjUiTiA3OcKwMzAnMjIuOCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '16px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Me & Guys Unisex Salon Location"
          ></iframe>
          
          {/* Overlay with salon info */}
          <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm p-4 rounded-xl border border-[#D9C27B]/30 max-w-xs">
            <h3 className="text-lg font-bold text-[#D9C27B] mb-2 flex items-center gap-2">
              ✂️ Me & Guys Unisex Salon
            </h3>
            <div className="space-y-1 text-sm text-white">
              <p className="flex items-center gap-2">
                <span className="text-[#D9C27B]">📍</span>
                Kaladhungi Road, Kusumkhera
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#D9C27B]">📞</span>
                +91 7997135893
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#D9C27B]">🕒</span>
                9:00 AM - 9:00 PM
              </p>
            </div>
          </div>
          
          {/* Action buttons overlay */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=29.22235,79.50632`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black p-3 rounded-full shadow-lg hover:from-[#F4E4A6] hover:to-[#D9C27B] transition-all duration-300 hover:scale-110"
              title="Get Directions"
            >
              🧭
            </a>
            <a
              href="tel:+917997135893"
              className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black p-3 rounded-full shadow-lg hover:from-[#F4E4A6] hover:to-[#D9C27B] transition-all duration-300 hover:scale-110"
              title="Call Now"
            >
              📞
            </a>
          </div>
        </div>
        
        {/* Quick info cards below map */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-black/50 p-4 rounded-xl border border-[#D9C27B]/20 text-center hover:border-[#D9C27B]/40 transition-all duration-300">
            <div className="text-2xl mb-2">📍</div>
            <h4 className="font-semibold text-[#D9C27B] mb-1">Address</h4>
            <p className="text-sm text-gray-300">Kaladhungi Road, Kusumkhera</p>
            <p className="text-sm text-gray-400">Haldwani (263139)</p>
          </div>
          
          <div className="bg-black/50 p-4 rounded-xl border border-[#D9C27B]/20 text-center hover:border-[#D9C27B]/40 transition-all duration-300">
            <div className="text-2xl mb-2">📞</div>
            <h4 className="font-semibold text-[#D9C27B] mb-1">Contact</h4>
            <p className="text-sm text-gray-300">+91 7997135893</p>
            <p className="text-sm text-gray-400">Call us anytime</p>
          </div>
          
          <div className="bg-black/50 p-4 rounded-xl border border-[#D9C27B]/20 text-center hover:border-[#D9C27B]/40 transition-all duration-300">
            <div className="text-2xl mb-2">🕒</div>
            <h4 className="font-semibold text-[#D9C27B] mb-1">Hours</h4>
            <p className="text-sm text-gray-300">Mon - Sun</p>
            <p className="text-sm text-gray-400">9:00 AM - 9:00 PM</p>
          </div>
        </div>
        
        {/* Main action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=29.22235,79.50632`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-semibold py-3 px-8 rounded-full hover:from-[#F4E4A6] hover:to-[#D9C27B] transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
          >
            🧭 Get Directions
          </a>
          <a
            href="tel:+917997135893"
            className="border-2 border-[#D9C27B] text-[#D9C27B] font-semibold py-3 px-8 rounded-full hover:bg-[#D9C27B] hover:text-black transition-all duration-300 transform hover:scale-105 text-center"
          >
            📞 Call Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
