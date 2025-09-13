import React, { useState } from 'react';
import { FaArrowRight, FaStar, FaHeart } from 'react-icons/fa';
import { assets } from "../assets/assets.js";

const Category = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const gold = '#D9C27B';

  const categories = [
    {
      id: 1,
      name: 'Hair Care',
      image: assets.hair,
      description: 'Professional hair treatments & styling products',
      productCount: '150+ Products',
      popular: true,
      gradient: 'from-purple-600/20 to-pink-600/20'
    },
    {
      id: 2,
      name: 'Skin Care',
      image: assets.skin,
      description: 'Premium skincare for radiant, healthy skin',
      productCount: '120+ Products',
      popular: true,
      gradient: 'from-blue-600/20 to-cyan-600/20'
    },
    {
      id: 3,
      name: 'Men\'s Grooming',
      image: assets.men,
      description: 'Complete grooming solutions for modern men',
      productCount: '90+ Products',
      popular: false,
      gradient: 'from-gray-600/20 to-slate-600/20'
    },
    {
      id: 4,
      name: 'Women\'s Beauty',
      image: assets.women,
      description: 'Luxury beauty essentials & cosmetics',
      productCount: '200+ Products',
      popular: true,
      gradient: 'from-rose-600/20 to-red-600/20'
    },
    {
      id: 5,
      name: 'Accessories',
      image: assets.accessories,
      description: 'Professional tools & beauty accessories',
      productCount: '80+ Products',
      popular: false,
      gradient: 'from-emerald-600/20 to-green-600/20'
    }
  ];

  return (
    <div className="w-full bg-black py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B]/30 rounded-full px-6 py-2 mb-6">
            <FaStar className="text-[#D9C27B] text-sm" />
            <span className="text-[#D9C27B] font-semibold text-sm">PREMIUM CATEGORIES</span>
            <FaStar className="text-[#D9C27B] text-sm" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] bg-clip-text text-transparent">
              Explore Our
            </span>
            <br />
            <span className="text-white">Premium Collection</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Shop 100% authentic products directly from your most loved salon chain. 
            <span className="text-[#D9C27B] font-semibold"> Me & Guys Salon</span> brings you professional-grade 
            beauty and grooming essentials for every need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.gradient} backdrop-blur-sm border border-[#D9C27B]/20 hover:border-[#D9C27B]/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl cursor-pointer`}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Popular Badge */}
              {category.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <FaHeart className="text-xs" />
                    Popular
                  </div>
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#D9C27B]/30 to-transparent transition-opacity duration-500 ${
                  hoveredCategory === category.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  {/* Category Name */}
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2 group-hover:text-[#D9C27B] transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm md:text-base mb-3 leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Product Count */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#D9C27B] font-semibold text-sm">
                      {category.productCount}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-[#D9C27B] text-xs" />
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button className={`w-full bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B] text-[#D9C27B] py-3 px-6 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-[#D9C27B] group-hover:to-[#F4E4A6] group-hover:text-black transform ${
                    hoveredCategory === category.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    Shop Now
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                   style={{
                     background: `linear-gradient(45deg, ${gold}, #F4E4A6, ${gold})`,
                     padding: '2px',
                     borderRadius: '1rem'
                   }}>
                <div className="w-full h-full bg-black rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-[#D9C27B]/30 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Our beauty experts are here to help you find the perfect products for your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black px-8 py-4 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg">
                Contact Expert
              </button>
              <button className="border-2 border-[#D9C27B] text-[#D9C27B] px-8 py-4 rounded-full font-bold hover:bg-[#D9C27B] hover:text-black transition-all duration-300 text-lg">
                View All Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
