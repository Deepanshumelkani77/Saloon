import React from 'react';
import { assets } from '../assets/assets.js';

const About = () => {
  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "5000+", label: "Happy Clients" },
    { number: "50+", label: "Services Offered" },
    { number: "15+", label: "Expert Stylists" }
  ];

  const values = [
    {
      icon: "✨",
      title: "Excellence",
      description: "We strive for perfection in every service we provide, ensuring you leave feeling confident and beautiful."
    },
    {
      icon: "💎",
      title: "Luxury",
      description: "Experience premium treatments in an elegant atmosphere designed for your comfort and relaxation."
    },
    {
      icon: "🤝",
      title: "Trust",
      description: "Building lasting relationships with our clients through honest service and exceptional results."
    },
    {
      icon: "🌟",
      title: "Innovation",
      description: "Staying ahead with the latest trends, techniques, and premium products in beauty and grooming."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Senior Hair Stylist",
      experience: "8+ Years",
      specialty: "Bridal & Color"
    },
    {
      name: "Michael Chen",
      role: "Master Barber",
      experience: "12+ Years", 
      specialty: "Classic & Modern Cuts"
    },
    {
      name: "Emma Rodriguez",
      role: "Beauty Specialist",
      experience: "6+ Years",
      specialty: "Facials & Makeup"
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-black via-[#23211b] to-[#181818] min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={assets.imgd} 
            alt="About Me & Guys Salon" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#D9C27B] tracking-widest mb-6 drop-shadow-2xl">
            ABOUT US
          </h1>
          <div className="w-32 sm:w-40 h-1 bg-gradient-to-r from-transparent via-[#D9C27B] to-transparent rounded-full shadow-lg mb-6" />
          <p className="text-gray-200 text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed">
            Where beauty meets excellence - Your trusted partner in style and grooming
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D9C27B] tracking-wide mb-6">
                OUR STORY
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded with a passion for beauty and excellence, <span className="text-[#D9C27B] font-semibold">Me & Guys Unisex Salon</span> has been transforming lives through exceptional grooming and styling services for over a decade.
                </p>
                <p>
                  What started as a small dream has grown into a premier destination for both men and women seeking professional beauty treatments. Our commitment to quality, innovation, and customer satisfaction has made us a trusted name in the industry.
                </p>
                <p>
                  We believe that everyone deserves to look and feel their best. That's why we've created a welcoming space where traditional techniques meet modern trends, ensuring every client receives personalized care and attention.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-black/90 via-[#1a1a1a] to-black/80 rounded-3xl p-8 shadow-2xl border border-[#D9C27B]/30 backdrop-blur-sm">
                <img 
                  src={assets.imgb} 
                  alt="Salon Interior" 
                  className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-2xl font-bold text-[#D9C27B] mb-4 text-center">
                  Premium Experience
                </h3>
                <p className="text-gray-300 text-center">
                  Step into our luxurious salon and experience the perfect blend of comfort, style, and professional expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#D9C27B]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#D9C27B] tracking-wide mb-4">
              OUR ACHIEVEMENTS
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Numbers that speak to our commitment and success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black/90 via-[#1a1a1a] to-black/80 rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D9C27B]/30 backdrop-blur-sm text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D9C27B] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#D9C27B]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#D9C27B] tracking-wide mb-4">
              OUR VALUES
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-black/90 via-[#1a1a1a] to-black/80 rounded-3xl p-6 shadow-2xl border border-[#D9C27B]/20 hover:border-[#D9C27B]/60 backdrop-blur-sm hover:scale-105 hover:-translate-y-2 transition-all duration-500 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#D9C27B] mb-4 tracking-wide">
                  {value.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#D9C27B]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#D9C27B] tracking-wide mb-4">
              MEET OUR TEAM
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Skilled professionals dedicated to making you look and feel amazing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black/90 via-[#1a1a1a] to-black/80 rounded-3xl p-8 shadow-2xl border border-[#D9C27B]/30 backdrop-blur-sm text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-24 h-24 bg-[#D9C27B]/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                  👤
                </div>
                <h3 className="text-2xl font-bold text-[#D9C27B] mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-300 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-[#D9C27B] text-sm mb-2">
                  {member.experience}
                </p>
                <p className="text-gray-400 text-sm">
                  Specialty: {member.specialty}
                </p>
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
              Ready to Experience Excellence?
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed">
              Join thousands of satisfied clients who trust us with their beauty and grooming needs. Book your appointment today!
            </p>
            
            <button className="group relative bg-[#D9C27B] text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:bg-[#bfa14a] transition-all duration-300 hover:scale-105 hover:shadow-[#D9C27B]/50 overflow-hidden">
              <span className="relative z-10">Book Your Appointment</span>
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

export default About;
