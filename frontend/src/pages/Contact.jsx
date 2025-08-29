import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [reviewData, setReviewData] = useState({
    name: '',
    rating: 5,
    review: ''
  });

  const [activeTab, setActiveTab] = useState('contact');

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReviewChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Contact Form:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Handle review submission logic here
    console.log('Review:', reviewData);
    alert('Thank you for your feedback! Your review has been submitted.');
    setReviewData({ name: '', rating: 5, review: '' });
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Address",
      details: "Kaladhungi Road Kusumkhera",
      subDetails: "Haldwani (263139)"
    },
    {
      icon: "📞",
      title: "Phone",
      details: "+91 7997135893",
      subDetails: "Call us anytime"
    },
    {
      icon: "👨‍💼",
      title: "Owner",
      details: "Ansar Salmani",
      subDetails: "Founder & Head Stylist"
    },
    {
      icon: "🕒",
      title: "Hours",
      details: "Mon - Sun: 9:00 AM - 9:00 PM",
      subDetails: "Always here for you"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] text-white">
      {/* Map Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Find Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Salon</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Located in the heart of Haldwani - Easy to find and convenient parking available
            </p>
          </div>
          
          {/* Map Container - Space for real map integration */}
          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] p-8 rounded-3xl border border-[#D9C27B]/20">
            <div className="aspect-video bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-[#D9C27B]/10 relative overflow-hidden">
              {/* Placeholder for actual map - you can replace this div with your map component */}
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-[#D9C27B] font-semibold text-xl mb-2">Map Integration Area</p>
                <p className="text-gray-400 mb-4">
                  Kaladhungi Road, Kusumkhera<br />
                  Haldwani (263139), Uttarakhand
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-semibold py-2 px-6 rounded-full hover:from-[#F4E4A6] hover:to-[#D9C27B] transition-all duration-300">
                    Get Directions
                  </button>
                  <a
                    href="tel:+917997135893"
                    className="border-2 border-[#D9C27B] text-[#D9C27B] font-semibold py-2 px-6 rounded-full hover:bg-[#D9C27B] hover:text-black transition-all duration-300"
                  >
                    📞 Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Visit Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Salon</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Located in the heart of Haldwani, we're easily accessible and ready to serve you with premium styling services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-black p-8 rounded-2xl border border-[#D9C27B]/20 hover:border-[#D9C27B]/40 transition-all duration-300 hover:transform hover:scale-105 text-center"
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-bold text-[#D9C27B] mb-2">{info.title}</h3>
                <p className="text-white font-semibold mb-1">{info.details}</p>
                <p className="text-gray-400 text-sm">{info.subDetails}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback/Review Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Feedback</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We value your opinion! Share your experience with us and help others discover our premium services.
            </p>
          </div>

          <div className="bg-black p-8 sm:p-12 rounded-3xl border border-[#D9C27B]/20">
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#D9C27B] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={reviewData.name}
                    onChange={handleReviewChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D9C27B]/30 rounded-lg focus:border-[#D9C27B] focus:outline-none text-white placeholder-gray-400"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#D9C27B] mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D9C27B]/30 rounded-lg focus:border-[#D9C27B] focus:outline-none text-white placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#D9C27B] mb-4">
                  Rate Your Experience *
                </label>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className={`text-4xl transition-all duration-200 ${
                        star <= reviewData.rating ? 'text-[#D9C27B] scale-110' : 'text-gray-600'
                      } hover:text-[#D9C27B] hover:scale-110`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                <p className="text-center text-white font-semibold">
                  {reviewData.rating} out of 5 stars
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#D9C27B] mb-2">
                  Your Feedback *
                </label>
                <textarea
                  name="review"
                  value={reviewData.review}
                  onChange={handleReviewChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#D9C27B]/30 rounded-lg focus:border-[#D9C27B] focus:outline-none text-white placeholder-gray-400 resize-none"
                  placeholder="Tell us about your experience with our services, staff, ambiance, and overall satisfaction. Your feedback helps us improve and helps others make informed decisions..."
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-bold py-4 px-12 rounded-full hover:from-[#F4E4A6] hover:to-[#D9C27B] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Services Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Us?</span>
            </h2>
            <p className="text-gray-300">
              Experience premium styling services in the heart of Haldwani with convenient location and expert stylists.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-2xl border border-[#D9C27B]/20 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-[#D9C27B] mb-2">Easy Parking</h3>
              <p className="text-gray-300">Convenient parking available right outside our salon</p>
            </div>
            <div className="bg-black p-8 rounded-2xl border border-[#D9C27B]/20 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-[#D9C27B] mb-2">Expert Team</h3>
              <p className="text-gray-300">Professional stylists with years of experience</p>
            </div>
            <div className="bg-black p-8 rounded-2xl border border-[#D9C27B]/20 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold text-[#D9C27B] mb-2">Premium Quality</h3>
              <p className="text-gray-300">High-quality products and luxurious treatments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black p-12 rounded-3xl border border-[#D9C27B]/20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Look?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Book your appointment today and experience the premium styling services that have made us Haldwani's favorite salon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+917997135893"
                className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-bold py-4 px-8 rounded-full hover:from-[#F4E4A6] hover:to-[#D9C27B] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                📞 Call Now
              </a>
              <button
                onClick={() => setActiveTab('contact')}
                className="border-2 border-[#D9C27B] text-[#D9C27B] font-bold py-4 px-8 rounded-full hover:bg-[#D9C27B] hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                💬 Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
