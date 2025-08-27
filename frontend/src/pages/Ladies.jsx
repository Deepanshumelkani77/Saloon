import React from 'react';
import { assets } from '../assets/assets.js';

const Ladies = () => {
  const services = [
    {
      title: "Hair Styling",
      icon: "💇‍♀️",
      items: [
        "Hair Cut", "Ironing", "Global Colouring", "Blow Dry", 
        "Root Touch Up", "Shampoo & Conditioning", "Head Massage", 
        "Roller Setting", "Oiling"
      ]
    },
    {
      title: "Make Up",
      icon: "💄",
      items: [
        "Party Make Up", "Engagement Make Up", "Bridal & Reception Make Up",
        "Base Make Up", "Eye Make Up"
      ]
    },
    {
      title: "Hair Treatments",
      icon: "✨",
      items: [
        "Volumizing", "Spa Treatments", "Advanced Hair Moisturising", 
        "Scalp Treatments"
      ]
    },
    {
      title: "Hair Texture",
      icon: "🌊",
      items: [
        "Rebonding", "Perming", "Keratin", "Colour Protection", "Smoothening"
      ]
    },
    {
      title: "Facials & Rituals",
      icon: "🧴",
      items: [
        "Bleach", "Luxury Facials/Rituals", "Clean Ups", 
        "Body Polishing/Rejuvenation", "Threading"
      ]
    },
    {
      title: "Hand & Feet",
      icon: "💅",
      items: [
        "Manicure", "Spa Pedicure", "Pedicure", "Waxing", "Spa Manicure"
      ]
    },
    {
      title: "Nail Care",
      icon: "💎",
      items: [
        "Nail Paint", "Nail Art", "Nail Filling"
      ]
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-black via-[#23211b] to-[#181818] min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={assets.ladies} 
            alt="Ladies Services" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#D9C27B] tracking-widest mb-6 drop-shadow-2xl">
            LADIES SERVICES
          </h1>
          <div className="w-32 sm:w-40 h-1 bg-gradient-to-r from-transparent via-[#D9C27B] to-transparent rounded-full shadow-lg mb-6" />
          <p className="text-gray-200 text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed">
            Indulge in luxury beauty treatments designed exclusively for the modern woman
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D9C27B] tracking-wide mb-4">
              OUR PREMIUM SERVICES
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience the finest in beauty and wellness with our comprehensive range of services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-black/90 via-[#1a1a1a] to-black/80 rounded-3xl p-6 shadow-2xl hover:shadow-[#D9C27B]/20 transition-all duration-500 border border-[#D9C27B]/20 hover:border-[#D9C27B]/60 backdrop-blur-sm hover:scale-105 hover:-translate-y-2"
              >
                {/* Service Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">{service.icon}</span>
                  <h3 className="text-xl font-bold text-[#D9C27B] tracking-wide">
                    {service.title}
                  </h3>
                </div>

                {/* Service Items */}
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center space-x-3 text-gray-300 hover:text-[#D9C27B] transition-colors duration-200 group-hover:translate-x-1"
                    >
                      <span className="w-2 h-2 bg-[#D9C27B] rounded-full flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#D9C27B]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#D9C27B]/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-black/95 via-[#1a1a1a] to-black/90 rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#D9C27B]/30 backdrop-blur-sm">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D9C27B] tracking-wide mb-6">
              Ready for Your Perfect Look?
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed">
              Don't wait for the perfect moment - create it! Book your appointment today and let our experts transform your style.
            </p>
            
            <button className="group relative bg-[#D9C27B] text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:bg-[#bfa14a] transition-all duration-300 hover:scale-105 hover:shadow-[#D9C27B]/50 overflow-hidden">
              <span className="relative z-10">Book Appointment Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D9C27B] to-[#bfa14a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            {/* Decorative elements */}
            <div className="flex items-center justify-center space-x-3 mt-8">
              <div className="w-3 h-3 bg-[#D9C27B] rounded-full animate-pulse" />
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#D9C27B]/60 to-transparent" />
              <div className="w-4 h-4 border-2 border-[#D9C27B] rounded-full animate-spin-slow" />
              <div className="w-20 h-0.5 bg-gradient-to-l from-[#D9C27B]/60 to-transparent" />
              <div className="w-3 h-3 bg-[#D9C27B] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ladies;
