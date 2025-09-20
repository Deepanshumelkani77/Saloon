import React, { useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

const statusStyles = {
  Pending: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30',
  Paid: 'bg-green-500/15 text-green-300 border border-green-500/30',
  Shipped: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  Delivered: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  Cancelled: 'bg-red-500/15 text-red-300 border border-red-500/30',
}

const MyOrder = () => {
  const { user } = useContext(AppContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actingId, setActingId] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        if (!user?.id) { setOrders([]); return }
        const res = await axios.get(`http://localhost:1000/order/${user.id}`)
        if (res.data?.success) setOrders(res.data.orders || [])
        else setError('Failed to fetch orders')
      } catch (err) {
        console.error('Orders fetch error', err)
        setError('Failed to fetch orders')
      } finally { setLoading(false) }
    }
    load()
  }, [user])

  const cancelOrder = async (orderId) => {
    if (!window.confirm('Cancel this order?')) return
    try {
      setActingId(orderId)
      const res = await axios.patch(`http://localhost:1000/order/${orderId}/cancel`)
      if (res.data?.success) {
        setOrders((prev) => prev.map(o => o._id === orderId ? res.data.order : o))
      } else {
        alert(res.data?.message || 'Cancel failed')
      }
    } catch (err) {
      console.error('Cancel error', err)
      alert(err?.response?.data?.message || 'Cancel failed')
    } finally {
      setActingId('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Orders</h1>
            <p className="text-gray-400 mt-1">Track your orders and manage cancellations</p>
          </div>
          <Link to="/" className="text-sm text-gray-300 hover:text-[#D9C27B] transition">Continue Shopping →</Link>
        </header>

        {/* States */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-[#D9C27B]"></div>
          </div>
        ) : !user ? (
          <div className="text-center py-16 text-gray-300">
            Please login to view your orders.
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-400">{error}</div>
        ) : !orders.length ? (
          <div className="text-center py-16">
            <div className="text-gray-300 mb-4">You have no orders yet.</div>
            <Link to="/" className="inline-block bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300">Shop Now</Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const totalQty = (order.items || []).reduce((s, it) => s + (it.quantity || 1), 0)
              const created = new Date(order.createdAt)
              return (
                <div key={order._id} className="bg-black/70 backdrop-blur-sm border-2 border-[#D9C27B]/30 rounded-2xl p-5 hover:border-[#D9C27B]/60 transition">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-white font-bold text-lg truncate">Order #{order.orderNumber}</div>
                      <div className="text-gray-400 text-sm">Placed on {created.toLocaleDateString()} • {totalQty} item(s)</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs sm:text-sm ${statusStyles[order.status] || 'bg-gray-700 text-gray-300'}`}>{order.status}</div>
                  </div>

                  {/* Items */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-3">
                      {(order.items || []).map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-black/50 border border-[#D9C27B]/20 rounded-xl p-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#D9C27B]/30 bg-black">
                              <img src={it.image || it.product?.image || '/api/placeholder/100/100'} alt={it.name || it.product?.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-white font-medium truncate">{it.name || it.product?.name}</div>
                              <div className="text-gray-400 text-sm">Qty: {it.quantity}</div>
                            </div>
                          </div>
                          <div className="text-[#D9C27B] font-bold">₹{(it.price || it.product?.price || 0) * (it.quantity || 1)}</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-black/50 border border-[#D9C27B]/20 rounded-xl p-4 h-fit">
                      <div className="text-gray-300 text-sm">Total</div>
                      <div className="text-white font-extrabold text-xl mt-1">₹{order.totalPrice}</div>
                      {order.status === 'Pending' && (
                        <button
                          disabled={actingId === order._id}
                          onClick={() => cancelOrder(order._id)}
                          className="w-full mt-4 bg-red-500/15 text-red-300 border border-red-500/30 py-2 rounded-xl font-semibold hover:bg-red-500/25 transition disabled:opacity-60">
                          {actingId === order._id ? 'Cancelling...' : 'Cancel Order'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Shipping */}
                  {order.shippingAddress && (
                    <div className="mt-4 text-sm text-gray-300">
                      <div className="font-semibold text-white mb-1">Shipping to</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <div>{order.shippingAddress.name}</div>
                          <div className="text-gray-400">{order.shippingAddress.phone}</div>
                        </div>
                        <div className="sm:col-span-2 text-gray-400">
                          {order.shippingAddress.addressLine1}{order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}, {order.shippingAddress.country}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrder
