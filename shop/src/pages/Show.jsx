import React, { useEffect, useMemo, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaShoppingCart, FaHeart, FaShareAlt, FaShieldAlt, FaTruck, FaSyncAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';

const Show = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const { user } = useContext(AppContext);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:1000/product/show/${id}`);
      if (res.data && res.data.success) {
        setProduct(res.data.data);
      } else {
        setError('Failed to fetch product');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const images = useMemo(() => {
    if (!product) return [];
    // Support either an array of images or a single image field
    if (Array.isArray(product.images) && product.images.length) return product.images;
    if (product.image) return [product.image];
    return ['/api/placeholder/600/800'];
  }, [product]);

  const price = product?.price ?? 0;
  const mrp = product ? Math.round(price * 1.2) : 0;
  const discount = product?.discount ?? (price ? 20 : 0);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please login to add to cart!');
      return;
    }
    try {
      const productId = product?._id || id;
      const res = await axios.post('http://localhost:1000/cart/add', {
        userId: user?.id,
        productId,
        quantity: qty,
      });
      if (res.data?.success) {
        alert('Added to cart!');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart');
    }
  };

  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (!user) {
      alert('Please login to buy!');
      return;
    }
    if (!product) return;
    
    navigate('/order', {
      state: {
        buyNow: true,
        product: {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: qty,
          image: product.image
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D9C27B]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] flex items-center justify-center">
        <div className="text-center text-red-400">
          <p className="text-xl mb-4">{error || 'Product not found'}</p>
          <button
            onClick={fetchProduct}
            className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] bg-gradient-to-br from-black via-[#23211b] to-[#181818] relative overflow-hidden">
      {/* Ambient decorative glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl bg-[#D9C27B]/10"></div>
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl bg-[#F4E4A6]/10"></div>

      <div className="w-full h-full mx-auto px-4 sm:px-6 lg:px-20 py-6 lg:py-6 overflow-auto lg:overflow-hidden">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-6">
          <span className="hover:text-[#D9C27B] cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-[#D9C27B] cursor-pointer">{product.category || 'Category'}</span>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Gallery */}
          <div className="bg-black/70 backdrop-blur-md border-2 border-[#D9C27B]/30 rounded-3xl p-3 lg:p-4 relative shadow-[0_0_40px_-10px_rgba(217,194,123,0.25)] h-full flex flex-col lg:sticky lg:top-4 lg:h-[82vh]">
            {/* Corner shine */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#D9C27B]/40 to-transparent rounded-t-3xl"/>
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl flex-1 min-h-[320px]">
              <img
                src={images[activeIndex]}
                alt={product.name}
                className="w-full h-full object-cover lg:object-contain transition-all duration-700 lg:hover:scale-[1.0] hover:scale-[1.03] bg-black"
              />
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D9C27B]/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              {/* Badges */}
              {discount ? (
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    -{discount}% OFF
                  </div>
                </div>
              ) : null}
              {/* Best Seller badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Best Seller
                </div>
              </div>
              {/* Overlay thumbnails for lg+ */}
              <div className="hidden lg:block absolute left-3 right-3 bottom-3 bg-black/40 backdrop-blur-sm rounded-xl p-2">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={`lgthumb-${idx}`}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-14 w-14 flex-shrink-0 rounded-lg overflow-hidden border transition-all duration-300 ${
                        activeIndex === idx ? 'border-[#D9C27B] ring-2 ring-[#D9C27B]/40' : 'border-[#D9C27B]/30 hover:border-[#D9C27B]'
                      }`}
                    >
                      <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Overlay prev/next for lg+ */}
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 items-center gap-2 px-3 py-2 rounded-full border border-[#D9C27B]/40 text-gray-200 hover:text-black hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] transition"
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
                className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-2 px-3 py-2 rounded-full border border-[#D9C27B]/40 text-gray-200 hover:text-black hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] transition"
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Thumbnails for mobile/tablet */}
            <div className="mt-3 grid grid-cols-5 sm:grid-cols-6 gap-2 lg:gap-3 h-16 lg:hidden">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border transition-all duration-300 ${
                    activeIndex === idx ? 'border-[#D9C27B] ring-2 ring-[#D9C27B]/40' : 'border-[#D9C27B]/30 hover:border-[#D9C27B]'
                  }`}
                >
                  <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Prev/Next for mobile/tablet */}
            <div className="hidden sm:flex lg:hidden justify-between mt-4">
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9C27B]/40 text-gray-200 hover:text-black hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] transition"
              >
                <FaChevronLeft /> Prev
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9C27B]/40 text-gray-200 hover:text-black hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] transition"
              >
                Next <FaChevronRight />
              </button>
            </div>
          </div>

          {/* Right: Details */}
          <div className="h-full flex flex-col lg:h-[82vh] lg:overflow-auto lg:pr-2">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-white via-[#F4E4A6] to-[#D9C27B] bg-clip-text text-transparent">
                {product.name}
              </span>
            </h1>
            <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
              <span className="px-3 py-1 rounded-full bg-[#D9C27B]/10 border border-[#D9C27B]/30 text-[#D9C27B] font-semibold">
                {product.category || 'Category'}
              </span>
              {product.subCategory ? (
                <span className="px-3 py-1 rounded-full bg-gray-800/60 border border-gray-700 text-gray-300">
                  {product.subCategory}
                </span>
              ) : null}
              <span className="flex items-center gap-1 text-[#D9C27B]"><FaStar /> 4.8 • 234 reviews</span>
            </div>

            {/* Price */}
            <div className="mt-6 bg-gradient-to-r from-gray-800/60 to-gray-900/60 rounded-2xl p-5 border border-[#D9C27B]/30 shadow-[0_0_30px_-12px_rgba(217,194,123,0.25)]">
              <div className="flex items-end gap-4">
                <div className="text-3xl font-extrabold text-[#D9C27B]">₹{price}</div>
                <div className="text-lg text-gray-500 line-through">₹{mrp}</div>
                <div className="text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded-full">SAVE ₹{mrp - price}</div>
              </div>
              <div className="text-xs text-gray-400 mt-2">Inclusive of all taxes • Free shipping over ₹999</div>
            </div>

            {/* Description */}
            <div className="mt-6 text-gray-300 leading-relaxed bg-black/40 border border-[#D9C27B]/20 rounded-2xl p-4">
              {product.description || 'Premium quality product curated by professionals. Experience salon-grade results at home with safe and effective ingredients.'}
            </div>

            {/* Features */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 bg-black/70 backdrop-blur-sm border border-[#D9C27B]/30 rounded-xl p-3">
                <FaTruck className="text-[#D9C27B]" />
                <div className="text-gray-300 text-sm">Fast Delivery</div>
              </div>
              <div className="flex items-center gap-3 bg-black/70 backdrop-blur-sm border border-[#D9C27B]/30 rounded-xl p-3">
                <FaSyncAlt className="text-[#D9C27B]" />
                <div className="text-gray-300 text-sm">Easy Returns</div>
              </div>
              <div className="flex items-center gap-3 bg-black/70 backdrop-blur-sm border border-[#D9C27B]/30 rounded-xl p-3">
                <FaShieldAlt className="text-[#D9C27B]" />
                <div className="text-gray-300 text-sm">Secure Payments</div>
              </div>
            </div>

            {/* Quantity + Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center bg-black border border-[#D9C27B]/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-white hover:text-black hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] transition shadow hover:shadow-[#D9C27B]/30"
                >
                  -
                </button>
                <div className="px-6 py-3 text-[#D9C27B] font-bold">{qty}</div>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="px-4 py-3 text-white hover:text-black hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] transition shadow hover:shadow-[#D9C27B]/30"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="flex-1 bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black py-3 rounded-xl font-extrabold transition-all duration-300 hover:shadow-2xl hover:shadow-[#D9C27B]/30 hover:scale-[1.03]"
              >
                💳 Buy Now
              </button>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border-2 border-[#D9C27B] text-[#D9C27B] py-3 rounded-xl font-extrabold transition-all duration-300 hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] hover:text-black hover:shadow-2xl hover:shadow-[#D9C27B]/20"
              >
                <span className="inline-flex items-center gap-2"><FaShoppingCart /> Add to Cart</span>
              </button>

              <button
                className="px-4 py-3 bg-black/70 backdrop-blur-sm border border-[#D9C27B]/30 rounded-xl text-gray-300 hover:text-white hover:border-[#D9C27B]"
                title="Add to Wishlist"
              >
                <FaHeart />
              </button>

              <button
                className="px-4 py-3 bg-black/70 backdrop-blur-sm border border-[#D9C27B]/30 rounded-xl text-gray-300 hover:text-white hover:border-[#D9C27B]"
                title="Share"
              >
                <FaShareAlt />
              </button>
            </div>

            {/* Info Blocks */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/60 backdrop-blur-md border border-[#D9C27B]/30 rounded-2xl p-5 shadow-[0_0_25px_-12px_rgba(217,194,123,0.25)]">
                <h3 className="text-[#D9C27B] font-bold mb-3">Highlights</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-1 text-sm">
                  <li>Premium, salon-grade formulation</li>
                  <li>Dermatologically tested and safe</li>
                  <li>Suitable for daily use</li>
                  <li>Best results with regular use</li>
                </ul>
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-[#D9C27B]/30 rounded-2xl p-5 shadow-[0_0_25px_-12px_rgba(217,194,123,0.25)]">
                <h3 className="text-[#D9C27B] font-bold mb-3">Delivery & Returns</h3>
                <p className="text-gray-300 text-sm">Estimated delivery in 2-5 working days. Free returns within 7 days of delivery in original condition.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
