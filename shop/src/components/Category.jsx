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
    <div className="w-full py-16 md:py-20 lg:py-24">
      <div className=" w-full mx-auto px-4 sm:px-6 lg:px-20">
        
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
        <div className="flex justify-center gap-4 md:gap-6 lg:gap-8 flex-wrap lg:flex-nowrap">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.gradient} backdrop-blur-sm border border-[#D9C27B]/20 hover:border-[#D9C27B]/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl cursor-pointer w-full sm:w-[100%]  md:w-[45%] lg:flex-1 lg:max-w-[300px] xl:max-w-[300px] 2xl:max-w-[320px] flex-shrink-0`}
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
              <div className="relative h-100 sm:h-100 md:h-[20rem] lg:h-[25rem] xl:h-[30rem] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 "></div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0  transition-opacity duration-500 ${
                  hoveredCategory === category.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  {/* Category Name */}
                  <h3 className="text-white font-bold text-xl md:text-2xl lg:text-3xl mb-3 group-hover:text-[#D9C27B] transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm md:text-base lg:text-lg mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Product Count */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[#D9C27B] font-semibold text-sm md:text-base">
                      {category.productCount}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-[#D9C27B] text-xs md:text-sm" />
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button className={`w-full bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B] text-[#D9C27B] py-3 md:py-4 px-6 md:px-8 rounded-full font-semibold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-[#D9C27B] group-hover:to-[#F4E4A6] group-hover:text-black transform ${
                    hoveredCategory === category.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    Shop Now
                    <FaArrowRight className="text-xs md:text-sm transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Animated Border */}
             
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default Category;
