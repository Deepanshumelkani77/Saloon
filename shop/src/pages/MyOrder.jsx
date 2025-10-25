import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const statusStyles = {
  Pending: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30',
  Confirmed: 'bg-green-500/15 text-green-300 border border-green-500/30',
  Shipped: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  Delivered: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  Cancelled: 'bg-red-500/15 text-red-300 border border-red-500/30',
}

const statusIcons = {
  Pending: '⏳',
  Confirmed: '✅',
  Shipped: '🚚',
  Delivered: '📦',
  Cancelled: '❌',
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
        const res = await axios.get(`http://localhost:1000/order/user/${user.id}`)
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
    const reason = prompt('Please enter cancellation reason:')
    if (!reason || !window.confirm('Cancel this order?')) return
    try {
      setActingId(orderId)
      const res = await axios.patch(`http://localhost:1000/order/${orderId}/cancel`, { cancelReason: reason })
      if (res.data?.success) {
        setOrders((prev) => prev.map(o => o._id === orderId ? res.data.order : o))
        toast.success('Order cancelled successfully')
      } else {
        toast.error(res.data?.message || 'Cancel failed')
      }
    } catch (err) {
      console.error('Cancel error', err)
      toast.error(err?.response?.data?.message || 'Cancel failed')
    } finally {
      setActingId('')
    }
  }

  const markDelivered = async (orderId) => {
    if (!window.confirm('Confirm that you have received this order?')) return
    try {
      setActingId(orderId)
      const res = await axios.patch(`http://localhost:1000/order/${orderId}/deliver`, { userId: user.id })
      if (res.data?.success) {
        setOrders((prev) => prev.map(o => o._id === orderId ? res.data.order : o))
        toast.success('Thank you! Order marked as delivered ✅')
      } else {
        toast.error(res.data?.message || 'Failed to mark as delivered')
      }
    } catch (err) {
      console.error('Deliver error', err)
      toast.error(err?.response?.data?.message || 'Failed to mark as delivered')
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
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-bold text-lg truncate">Order #{order.orderNumber}</div>
                      <div className="text-gray-400 text-sm">Placed on {created.toLocaleDateString()} • {totalQty} item(s)</div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-xs sm:text-sm ${order.paymentMethod === 'COD' ? 'text-orange-400' : 'text-green-400'}`}>
                          {order.paymentMethod === 'COD' ? '💵 Cash on Delivery' : '💳 Online Payment'}
                        </span>
                        {order.paymentMethod === 'ONLINE' && (
                          <span className={`text-xs sm:text-sm ${order.paid ? 'text-green-400' : 'text-red-400'}`}>
                            • {order.paid ? 'Paid ✓' : 'Payment Pending ✗'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold ${statusStyles[order.status] || 'bg-gray-700 text-gray-300'}`}>
                        {statusIcons[order.status]} {order.status}
                      </div>
                    </div>
                  </div>

                  {/* Order Status Timeline */}
                  <div className="mt-4 bg-black/40 border border-[#D9C27B]/20 rounded-xl p-4">
                    <div className="flex items-center justify-between relative">
                      {/* Progress Bar */}
                      <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-700">
                        <div 
                          className="h-full bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] transition-all duration-500"
                          style={{ 
                            width: order.status === 'Pending' ? '0%' : 
                                   order.status === 'Confirmed' ? '33%' : 
                                   order.status === 'Shipped' ? '66%' : 
                                   order.status === 'Delivered' ? '100%' : '0%' 
                          }}
                        />
                      </div>
                      
                      {/* Status Steps */}
                      {['Pending', 'Confirmed', 'Shipped', 'Delivered'].map((status, idx) => {
                        const isActive = order.status === status
                        const isPast = ['Pending', 'Confirmed', 'Shipped', 'Delivered'].indexOf(order.status) > idx
                        const isCancelled = order.status === 'Cancelled'
                        
                        return (
                          <div key={status} className="flex flex-col items-center gap-1 relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isCancelled ? 'bg-gray-700 text-gray-500' :
                              isActive ? 'bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black scale-110' :
                              isPast ? 'bg-green-500 text-white' :
                              'bg-gray-700 text-gray-400'
                            }`}>
                              {isPast ? '✓' : idx + 1}
                            </div>
                            <div className={`text-xs mt-1 hidden sm:block ${
                              isCancelled ? 'text-gray-500' :
                              isActive || isPast ? 'text-white font-semibold' : 'text-gray-500'
                            }`}>
                              {status}
                            </div>
                            {order[`${status.toLowerCase()}At`] && (
                              <div className="text-[9px] text-gray-500 hidden md:block">
                                {new Date(order[`${status.toLowerCase()}At`]).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    
                    {/* Tracking Number */}
                    {order.trackingNumber && order.status === 'Shipped' && (
                      <div className="mt-4 pt-3 border-t border-[#D9C27B]/20 text-sm">
                        <span className="text-gray-400">Tracking Number: </span>
                        <span className="text-[#D9C27B] font-mono font-semibold">{order.trackingNumber}</span>
                      </div>
                    )}
                    
                    {/* Cancellation Reason */}
                    {order.status === 'Cancelled' && order.cancelReason && (
                      <div className="mt-4 pt-3 border-t border-red-500/20 text-sm">
                        <span className="text-gray-400">Cancellation Reason: </span>
                        <span className="text-red-300">{order.cancelReason}</span>
                      </div>
                    )}
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
                    <div className="bg-black/50 border border-[#D9C27B]/20 rounded-xl p-4 h-fit space-y-3">
                      <div>
                        <div className="text-gray-300 text-sm">Total Amount</div>
                        <div className="text-white font-extrabold text-xl mt-1">₹{order.totalPrice}</div>
                      </div>
                      
                      {/* Mark as Delivered Button */}
                      {order.status === 'Shipped' && (
                        <button
                          disabled={actingId === order._id}
                          onClick={() => markDelivered(order._id)}
                          className="w-full bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] text-black py-2.5 rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#D9C27B]/30 transition disabled:opacity-60">
                          {actingId === order._id ? 'Processing...' : '✓ Mark as Delivered'}
                        </button>
                      )}
                      
                      {/* Cancel Order Button */}
                      {(order.status === 'Pending' || order.status === 'Confirmed') && (
                        <button
                          disabled={actingId === order._id}
                          onClick={() => cancelOrder(order._id)}
                          className="w-full bg-red-500/15 text-red-300 border border-red-500/30 py-2.5 rounded-xl font-semibold hover:bg-red-500/25 transition disabled:opacity-60">
                          {actingId === order._id ? 'Cancelling...' : '✗ Cancel Order'}
                        </button>
                      )}
                      
                      {/* Order Delivered Badge */}
                      {order.status === 'Delivered' && (
                        <div className="w-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 py-2.5 rounded-xl font-semibold text-center">
                          ✅ Order Delivered
                        </div>
                      )}
                      
                      {/* Order Cancelled Badge */}
                      {order.status === 'Cancelled' && (
                        <div className="w-full bg-red-500/15 text-red-300 border border-red-500/30 py-2.5 rounded-xl font-semibold text-center">
                          ❌ Order Cancelled
                        </div>
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
