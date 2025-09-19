import React, { useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { FaTrash, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { user } = useContext(AppContext)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const fetchCart = async () => {
    try {
      setLoading(true)
      setError(null)
      // Expecting backend route to return cart items with populated product details
      // Adjust the endpoint if your API differs
      const res = await axios.get(`http://localhost:1000/cart/${user?.id}`)
      if (res.data?.success) {
        setItems(res.data.data || [])
      } else {
        setError('Failed to load cart')
      }
    } catch (err) {
      console.error('Error loading cart:', err)
      setError('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + (it.product?.price || 0) * (it.quantity || 1), 0),
    [items]
  )

  const updateQty = async (productId, nextQty) => {
    if (!user) return alert('Please login first')
    if (nextQty < 1 || nextQty > 10) return
    try {
      setUpdating(true)
      const res = await axios.post('http://localhost:1000/cart/update', {
        userId: user?.id,
        productId,
        quantity: nextQty,
      })
      if (res.data?.success) {
        setItems((prev) => prev.map((it) => (it.product?._id === productId ? { ...it, quantity: nextQty } : it)))
      }
    } catch (err) {
      console.error('Error updating quantity:', err)
      alert('Failed to update quantity')
    } finally {
      setUpdating(false)
    }
  }

  const removeItem = async (productId) => {
    if (!user) return alert('Please login first')
    try {
      setUpdating(true)
      const res = await axios.post('http://localhost:1000/cart/remove', {
        userId: user?.id,
        productId,
      })
      if (res.data?.success) {
        setItems((prev) => prev.filter((it) => it.product?._id !== productId))
      }
    } catch (err) {
      console.error('Error removing item:', err)
      alert('Failed to remove item')
    } finally {
      setUpdating(false)
    }
  }

  const proceedToPayment = async () => {
    if (!user) return alert('Please login first')
    if (!items.length) return alert('Your cart is empty')
    try {
      // Placeholder for payment flow integration (e.g., Razorpay)
      // You may replace this with your backend order creation and payment SDK
      alert('Proceeding to payment...')
    } catch (err) {
      console.error('Payment init failed:', err)
      alert('Payment initialization failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-[#D9C27B] text-2xl"><FaShoppingCart /></div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Your Cart</h1>
          </div>
          <Link
            to="/"
            className="text-sm text-gray-300 hover:text-[#D9C27B] transition"
          >
            Continue Shopping →
          </Link>
        </div>

        {/* States */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-[#D9C27B]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-16">
            {error}
          </div>
        ) : !items.length ? (
          <div className="text-center py-16">
            <div className="text-gray-300 text-lg mb-4">Your cart is empty</div>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((it) => {
                const p = it.product || {}
                const qty = it.quantity || 1
                const price = p.price || 0
                const total = price * qty
                return (
                  <div
                    key={p._id}
                    className="bg-black/70 backdrop-blur-sm border-2 border-[#D9C27B]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 hover:border-[#D9C27B]/60 transition"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-32 h-40 sm:h-28 rounded-xl overflow-hidden border border-[#D9C27B]/30 bg-black flex-shrink-0">
                      <img
                        src={p.image || '/api/placeholder/200/200'}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-white font-bold truncate">{p.name}</h3>
                          <div className="text-sm text-gray-400 mt-1 truncate">
                            {p.category}{p.subCategory ? ` • ${p.subCategory}` : ''}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(p._id)}
                          className="text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 p-2 rounded-lg border border-red-500/20 transition"
                          title="Remove item"
                          disabled={updating}
                        >
                          <FaTrash />
                        </button>
                      </div>

                      {/* Price and Qty */}
                      <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
                        <div className="text-[#D9C27B] font-extrabold text-lg">₹{price}</div>
                        <div className="inline-flex items-center border border-[#D9C27B]/40 rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQty(p._id, qty - 1)}
                            className="px-3 py-2 text-white hover:text-black hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] transition disabled:opacity-50"
                            disabled={qty <= 1 || updating}
                          >
                            -
                          </button>
                          <div className="px-4 py-2 text-[#D9C27B] font-bold min-w-10 text-center">
                            {qty}
                          </div>
                          <button
                            onClick={() => updateQty(p._id, qty + 1)}
                            className="px-3 py-2 text-white hover:text-black hover:bg-gradient-to-r hover:from-[#D9C27B] hover:to-[#F4E4A6] transition disabled:opacity-50"
                            disabled={qty >= 10 || updating}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="mt-2 text-gray-300 text-sm">
                        Line total: <span className="text-white font-semibold">₹{total}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary */}
            <div className="bg-black/70 backdrop-blur-sm border-2 border-[#D9C27B]/30 rounded-2xl p-5 h-fit sticky top-6">
              <h2 className="text-white font-bold text-lg mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{subtotal >= 999 ? 'Free' : 'Calculated at checkout'}</span>
                </div>
              </div>
              <div className="border-t border-gray-700/60 my-4"></div>
              <div className="flex justify-between text-white font-extrabold text-lg">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
              <button
                onClick={proceedToPayment}
                className="w-full mt-5 bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black py-3 rounded-xl font-extrabold transition-all duration-300 hover:shadow-2xl hover:shadow-[#D9C27B]/30 hover:scale-[1.02] disabled:opacity-60"
                disabled={!items.length || updating}
              >
                Proceed to Payment
              </button>
              <div className="text-xs text-gray-400 mt-3">Secure checkout • Easy returns</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
