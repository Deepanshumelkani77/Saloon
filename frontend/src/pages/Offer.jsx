import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { FaCrown, FaCheck, FaStar, FaGift, FaPercent, FaCalendarAlt } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'

const Offer = () => {
  const { user, token, updateUser } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)

  const premiumFeatures = [
    { icon: <FaPercent />, title: "10% Discount", description: "Get 10% off on all salon services for a full year" },
    { icon: <FaStar />, title: "Priority Booking", description: "Skip the queue with priority appointment scheduling" },
    { icon: <FaGift />, title: "Exclusive Offers", description: "Access to member-only deals and seasonal promotions" },
    { icon: <FaCalendarAlt />, title: "Flexible Scheduling", description: "Book appointments up to 30 days in advance" }
  ]

  const handlePurchasePremium = async () => {
    if (!user) {
      toast.warning('Please login to purchase premium membership')
      return
    }

    if (user.premiumUser) {
      toast.info('You are already a premium member!')
      return
    }

    setLoading(true)
    try {
      // Create Razorpay order
      const orderResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/payment/create-order`, { 
        amount: 999 // Premium card price
      })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: "INR",
        name: "Me & Guys Salon",
        description: "Premium Membership Purchase",
        order_id: orderResponse.data.id,
        handler: async function (response) {
          try {
            // After successful payment, update user to premium
            const premiumResponse = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/user/purchase-premium`,
              { 
                userId: user.id,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )

            if (premiumResponse.data.success) {
              setPurchaseSuccess(true)
              // Update user context to reflect premium status
              updateUser({ 
                premiumUser: true,
                premiumPurchaseDate: premiumResponse.data.user.premiumPurchaseDate,
                premiumExpiryDate: premiumResponse.data.user.premiumExpiryDate
              })
              toast.success('🎉 Congratulations! You are now a Premium Member! ✨ Enjoy 10% discount on all services for 1 year!', { autoClose: 5000 })
            }
          } catch (error) {
            console.error('Error updating premium status:', error)
            toast.error('Payment successful, but failed to activate premium membership. Please contact support.')
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#D9C27B", // Using your website's gold color
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        }
      }

      const razor = new window.Razorpay(options)
      razor.open()
    } catch (error) {
      console.error('Premium purchase error:', error)
      toast.error(error.response?.data?.message || 'Failed to initiate payment. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <FaCrown className="text-6xl text-[#D9C27B] mr-4" />
            <h1 className="text-5xl font-extrabold text-white">
              Premium <span className="text-[#D9C27B]">Membership</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Elevate your salon experience with exclusive benefits, priority services, and year-round savings
          </p>
        </div>

        {/* Premium Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] p-1 rounded-3xl shadow-2xl">
            <div className="bg-black rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Side - Pricing */}
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-6">
                    <FaCrown className="text-4xl text-[#D9C27B] mr-3" />
                    <h2 className="text-3xl font-bold text-white">Premium Card</h2>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-6xl font-extrabold text-[#D9C27B] mb-2">₹999</div>
                    <div className="text-gray-400 text-lg">Valid for 1 Year</div>
                    <div className="text-sm text-gray-500 line-through">Regular Price: ₹1999</div>
                  </div>

                  <div className="bg-[#D9C27B]/10 border border-[#D9C27B]/30 rounded-2xl p-4 mb-6">
                    <div className="text-[#D9C27B] font-bold text-lg mb-2">🎉 Limited Time Offer</div>
                    <div className="text-white text-sm">Save ₹1000 + Get 10% off all services!</div>
                  </div>

                  {user?.premiumUser ? (
                    <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-4 text-center">
                      <FaCheck className="text-green-400 text-2xl mx-auto mb-2" />
                      <div className="text-green-400 font-bold">You're Already Premium!</div>
                    </div>
                  ) : (
                    <button
                      onClick={handlePurchasePremium}
                      disabled={loading || !user}
                      className="w-full bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black py-4 px-8 rounded-2xl font-extrabold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#D9C27B]/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                          Processing...
                        </div>
                      ) : !user ? (
                        'Login to Purchase'
                      ) : (
                        '💳 Pay ₹999 - Get Premium'
                      )}
                    </button>
                  )}
                  
                  {!user?.premiumUser && (
                    <div className="text-xs text-gray-400 mt-3 text-center">
                      🔒 Secure Razorpay Payment • 💯 Instant Activation • 📞 24/7 Support
                    </div>
                  )}
                </div>

                {/* Right Side - Features */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center md:text-left">
                    Premium Benefits
                  </h3>
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-black/30 rounded-2xl border border-[#D9C27B]/20 hover:border-[#D9C27B]/40 transition-all duration-300">
                      <div className="text-[#D9C27B] text-2xl mt-1 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">{feature.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-black backdrop-blur-sm border-2 border-[#D9C27B]/30 rounded-2xl p-6 text-center hover:border-[#D9C27B]/60 transition-all duration-300">
            <div className="text-[#D9C27B] text-4xl mb-4">💰</div>
            <h3 className="text-white font-bold text-xl mb-3">Save More</h3>
            <p className="text-gray-300 text-sm">Average savings of ₹2000+ per year with 10% discount on all services</p>
          </div>
          
          <div className="bg-black backdrop-blur-sm border-2 border-[#D9C27B]/30 rounded-2xl p-6 text-center hover:border-[#D9C27B]/60 transition-all duration-300">
            <div className="text-[#D9C27B] text-4xl mb-4">⚡</div>
            <h3 className="text-white font-bold text-xl mb-3">Priority Access</h3>
            <p className="text-gray-300 text-sm">Skip waiting lists and get preferred appointment slots</p>
          </div>
          
          <div className="bg-black backdrop-blur-sm border-2 border-[#D9C27B]/30 rounded-2xl p-6 text-center hover:border-[#D9C27B]/60 transition-all duration-300">
            <div className="text-[#D9C27B] text-4xl mb-4">🎁</div>
            <h3 className="text-white font-bold text-xl mb-3">Exclusive Perks</h3>
            <p className="text-gray-300 text-sm">Member-only events, early access to new services, and special gifts</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black backdrop-blur-sm border border-[#D9C27B]/30 rounded-2xl p-6">
              <h4 className="text-[#D9C27B] font-bold text-lg mb-2">How long is the premium membership valid?</h4>
              <p className="text-gray-300">Your premium membership is valid for exactly 365 days from the date of purchase.</p>
            </div>
            
            <div className="bg-black backdrop-blur-sm border border-[#D9C27B]/30 rounded-2xl p-6">
              <h4 className="text-[#D9C27B] font-bold text-lg mb-2">Can I use the discount on all services?</h4>
              <p className="text-gray-300">Yes! The 10% discount applies to all salon services including haircuts, styling, treatments, and spa services.</p>
            </div>
            
            <div className="bg-black backdrop-blur-sm border border-[#D9C27B]/30 rounded-2xl p-6">
              <h4 className="text-[#D9C27B] font-bold text-lg mb-2">Is the membership transferable?</h4>
              <p className="text-gray-300">Premium memberships are personal and non-transferable. They are linked to your account and cannot be shared.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Offer
