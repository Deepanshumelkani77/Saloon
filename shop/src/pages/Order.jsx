import React, { useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const Order = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-8">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Checkout</h1>
          <p className="text-gray-400 mt-1">Secure and fast — your details are protected</p>
        </header>

        {/* Grid layout: form + summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Placeholder content; real form and summary implemented below via stateful component */}
          <CheckoutForm />
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

export default Order

// -------------------- Stateful sections --------------------
 

const CheckoutForm = () => {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  const buyNowData = location.state?.buyNow ? location.state.product : null

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    notes: '',
    paymentMethod: 'COD',
  })

  useEffect(() => {
    // Prefill user
    if (user) {
      setForm((f) => ({
        ...f,
        name: user.username || user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }))
      
      // If Buy Now flow, use direct product data
      if (buyNowData) {
        setItems([{
          productId: {
            _id: buyNowData.productId,
            name: buyNowData.name,
            price: buyNowData.price,
            image: buyNowData.image
          },
          quantity: buyNowData.quantity
        }])
        setLoading(false)
      } else {
        // Normal cart checkout flow
        fetchCart()
      }
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const fetchCart = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await axios.get(`http://localhost:1000/cart/${user?.id}`)
      if (res.data?.success) {
        setItems(res.data.cart?.items || [])
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
    () => items.reduce((sum, it) => sum + ((it.productId?.price) || 0) * (it.quantity || 1), 0),
    [items]
  )

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    if (!user) return 'Please login to continue'
    if (!items.length) return 'Your cart is empty'
    if (!form.name?.trim()) return 'Full name is required'
    if (!form.phone?.trim()) return 'Phone number is required'
    if (!form.addressLine1?.trim()) return 'Address Line 1 is required'
    if (!form.city?.trim()) return 'City is required'
    if (!form.state?.trim()) return 'State is required'
    if (!form.pincode?.trim()) return 'Pincode is required'
    return ''
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    const msg = validate()
    if (msg) return toast.error(msg)

    try {
      setSubmitting(true)

      // If ONLINE, initiate Razorpay checkout first
      if (form.paymentMethod === 'ONLINE') {
        const cleanAmount = Number(String(subtotal).replace(/[^0-9]/g, ''))
        if (!cleanAmount || cleanAmount <= 0) {
          toast.error('Invalid amount')
          setSubmitting(false)
          return
        }

        // Ensure Razorpay script is loaded
        if (!window.Razorpay) {
          await loadRazorpayScript()
          if (!window.Razorpay) {
            toast.error('Payment initialization failed')
            setSubmitting(false)
            return
          }
        }

        // Create payment order on backend
        const payRes = await axios.post('http://localhost:1000/payment/create-order', { amount: cleanAmount })
        const options = {
          key: 'rzp_test_PuXf2SZhGaKEGd',
          amount: payRes.data.amount,
          currency: 'INR',
          name: 'Me & Guys Shop',
          description: 'Product Order Payment',
          order_id: payRes.data.id,
          handler: async function (response) {
            try {
              const payload = buildOrderPayload({
                paymentMethod: 'ONLINE',
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                notes: form.notes,
              })
              const res2 = await axios.post('http://localhost:1000/order/create', payload)
              if (res2.data?.success) {
                toast.success('✅ Payment successful! Order placed.')
                navigate('/my-order')
              } else {
                toast.error(res2.data?.message || 'Order failed after payment')
              }
            } catch (e2) {
              console.error('Order create after payment failed:', e2)
              toast.error('Payment succeeded, but order creation failed.')
            } finally {
              setSubmitting(false)
            }
          },
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },
          theme: { color: '#D9C27B' },
        }
        const razor = new window.Razorpay(options)
        razor.open()
        return
      }

      // COD: create order directly
      const payload = buildOrderPayload({ paymentMethod: 'COD', notes: form.notes })
      const res = await axios.post('http://localhost:1000/order/create', payload)
      if (res.data?.success) {
        toast.success('✅ Order placed successfully!')
        navigate('/my-order')
      } else {
        toast.error(res.data?.message || 'Order failed')
      }
    } catch (err) {
      console.error('Order error:', err?.response?.data || err.message)
      toast.error(err?.response?.data?.message || 'Failed to place order')
    } finally {
      setSubmitting(false)
    }
  }

  const buildOrderPayload = ({ paymentMethod, paymentId, orderId, notes }) => ({
    userId: user?.id,
    items: items.map((it) => ({
      productId: it.productId?._id,
      name: it.productId?.name,
      price: it.productId?.price,
      quantity: it.quantity || 1,
      image: it.productId?.image,
    })),
    subtotal,
    shippingAddress: {
      name: form.name,
      email: form.email,
      phone: form.phone,
      addressLine1: form.addressLine1,
      addressLine2: form.addressLine2,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      country: form.country,
    },
    notes: notes !== undefined ? notes : form.notes,
    paymentMethod,
    paymentId: paymentId || null,
    orderId: orderId || null,
  })

  const loadRazorpayScript = () => new Promise((resolve) => {
    if (document.getElementById('razorpay-sdk')) return resolve(true)
    const script = document.createElement('script')
    script.id = 'razorpay-sdk'
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

  if (loading) {
    return (
      <div className="lg:col-span-2 bg-black/70 border-2 border-[#D9C27B]/30 rounded-2xl p-6">
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-[#D9C27B]"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="lg:col-span-2 bg-black/70 border-2 border-[#D9C27B]/30 rounded-2xl p-6 text-red-400">
        {error}
      </div>
    )
  }

  return (
    <form onSubmit={placeOrder} className="lg:col-span-2 space-y-6">
      {/* Contact */}
      <section className="bg-black/70 backdrop-blur-sm border-2 border-[#D9C27B]/30 rounded-2xl p-6">
        <h2 className="text-white font-bold text-lg mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
            <input name="name" value={form.name} onChange={onChange} placeholder="Your name"
              className="w-full rounded-xl bg-black/50 border border-[#D9C27B]/30 text-white px-4 py-3 focus:outline-none focus:border-[#D9C27B]" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com"
              className="w-full rounded-xl bg-black/50 border border-[#D9C27B]/30 text-white px-4 py-3 focus:outline-none focus:border-[#D9C27B]" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={onChange} placeholder="98765 43210"
              className="w-full rounded-xl bg-black/50 border border-[#D9C27B]/30 text-white px-4 py-3 focus:outline-none focus:border-[#D9C27B]" />
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="bg-black/70 backdrop-blur-sm border-2 border-[#D9C27B]/30 rounded-2xl p-6">
        <h2 className="text-white font-bold text-lg mb-4">Shipping Address</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Address Line 1</label>
            <input name="addressLine1" value={form.addressLine1} onChange={onChange} placeholder="House no, street"
              className="w-full rounded-xl bg-black/50 border border-[#D9C27B]/30 text-white px-4 py-3 focus:outline-none focus:border-[#D9C27B]" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Address Line 2 (optional)</label>
            <input name="addressLine2" value={form.addressLine2} onChange={onChange} placeholder="Area, landmark"
              className="w-full rounded-xl bg-black/50 border border-[#D9C27B]/30 text-white px-4 py-3 focus:outline-none focus:border-[#D9C27B]" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">City</label>
            <input name="city" value={form.city} onChange={onChange} placeholder="City"
              className="w-full rounded-xl bg-black/50 border border-[#D9C27B]/30 text-white px-4 py-3 focus:outline-none focus:border-[#D9C27B]" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">State</label>
            <input name="state" value={form.state} onChange={onChange} placeholder="State"
              className="w-full rounded-xl bg-black/50 border border-[#D9C27B]/30 text-white px-4 py-3 focus:outline-none focus:border-[#D9C27B]" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Pincode</label>
            <input name="pincode" value={form.pincode} onChange={onChange} placeholder="110011"
              className="w-full rounded-xl bg-black/50 border border-[#D9C27B]/30 text-white px-4 py-3 focus:outline-none focus:border-[#D9C27B]" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Country</label>
            <input name="country" value={form.country} onChange={onChange}
              className="w-full rounded-xl bg-black/50 border border-[#D9C27B]/30 text-white px-4 py-3 focus:outline-none focus:border-[#D9C27B]" />
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="bg-black/70 backdrop-blur-sm border-2 border-[#D9C27B]/30 rounded-2xl p-6">
        <h2 className="text-white font-bold text-lg mb-4">Payment</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3">
            <input id="cod" type="radio" name="paymentMethod" value="COD" checked={form.paymentMethod === 'COD'} onChange={onChange} />
            <label htmlFor="cod" className="text-gray-300">Cash on Delivery (COD)</label>
          </div>
          <div className="flex items-center gap-3">
            <input id="online" type="radio" name="paymentMethod" value="ONLINE" checked={form.paymentMethod === 'ONLINE'} onChange={onChange} />
            <label htmlFor="online" className="text-gray-300">Online (Razorpay)</label>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Order Notes (optional)</label>
            <textarea name="notes" value={form.notes} onChange={onChange} rows={3} placeholder="Anything we should know?"
              className="w-full rounded-xl bg-black/50 border border-[#D9C27B]/30 text-white px-4 py-3 focus:outline-none focus:border-[#D9C27B]"></textarea>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-4">
        <Link to="/cart" className="text-gray-300 hover:text-[#D9C27B] transition">← Back to Cart</Link>
        <button type="submit" disabled={submitting}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black px-6 py-3 rounded-xl font-extrabold transition-all duration-300 hover:shadow-2xl hover:shadow-[#D9C27B]/30 hover:scale-[1.02] disabled:opacity-60">
          {submitting ? 'Placing Order...' : 'Place Order Securely'}
        </button>
      </div>
    </form>
  )
}

const OrderSummary = () => {
  const { user } = useContext(AppContext)
  const location = useLocation()
  const buyNowData = location.state?.buyNow ? location.state.product : null
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      // If Buy Now flow, use direct product data
      if (buyNowData) {
        setItems([{
          productId: {
            _id: buyNowData.productId,
            name: buyNowData.name,
            price: buyNowData.price,
            image: buyNowData.image
          },
          quantity: buyNowData.quantity
        }])
        setLoading(false)
      } else {
        // Normal cart checkout flow
        try {
          setLoading(true)
          const res = await axios.get(`http://localhost:1000/cart/${user?.id}`)
          if (res.data?.success) setItems(res.data.cart?.items || [])
        } catch {}
        finally { setLoading(false) }
      }
    }
    if (user) load(); else setLoading(false)
  }, [user, buyNowData])

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + ((it.productId?.price) || 0) * (it.quantity || 1), 0),
    [items]
  )

  return (
    <aside className="bg-black/70 backdrop-blur-sm border-2 border-[#D9C27B]/30 rounded-2xl p-6 h-fit sticky top-6">
      <h2 className="text-white font-bold text-lg mb-4">Order Summary</h2>
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D9C27B]"></div>
        </div>
      ) : !items.length ? (
        <div className="text-gray-400">Your cart is empty</div>
      ) : (
        <div className="space-y-3">
          <div className="space-y-2 max-h-56 overflow-auto pr-1">
            {items.map((it) => {
              const p = it.productId || {}
              const qty = it.quantity || 1
              return (
                <div key={p._id} className="flex items-center justify-between gap-3">
                  <div className="text-gray-300 truncate">
                    {p.name} <span className="text-gray-500">× {qty}</span>
                  </div>
                  <div className="text-[#D9C27B] font-bold">₹{(p.price || 0) * qty}</div>
                </div>
              )
            })}
          </div>
          <div className="border-t border-gray-700/60 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span>{subtotal >= 999 ? 'Free' : 'Standard'}</span>
            </div>
          </div>
          <div className="border-t border-gray-700/60 my-2"></div>
          <div className="flex justify-between text-white font-extrabold text-lg">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="text-xs text-gray-400">Secure checkout • Easy returns</div>
        </div>
      )}
    </aside>
  )
}
