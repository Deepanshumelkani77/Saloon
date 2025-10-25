import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const statusColors = {
  Pending: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30',
  Confirmed: 'bg-green-500/15 text-green-300 border border-green-500/30',
  Shipped: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  Delivered: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  Cancelled: 'bg-red-500/15 text-red-300 border border-red-500/30',
}

const prettyDate = (d) => {
  try { return new Date(d).toLocaleString() } catch { return '' }
}

const currency = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`

const Order = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [actingId, setActingId] = useState('')

  useEffect(() => {
    loadOrders(statusFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  const loadOrders = async (status) => {
    try {
      setLoading(true)
      setError('')
      const params = {}
      if (status) params.status = status
      const res = await axios.get('http://localhost:1000/order/all', { params })
      if (res.data?.success) setOrders(res.data.orders || [])
      else setError('Failed to fetch orders')
    } catch (err) {
      console.error('Orders fetch error', err)
      setError('Failed to fetch orders')
    } finally { setLoading(false) }
  }

  const filtered = useMemo(() => {
    let result = orders

    // Hide cancelled orders from default view
    if (!statusFilter) {
      result = result.filter(o => o.status !== 'Cancelled')
    }

    // Apply search filter
    if (search) {
      const q = search.trim().toLowerCase()
      result = result.filter(o => 
        (o.orderNumber || '').toLowerCase().includes(q) ||
        (o.user?.username || '').toLowerCase().includes(q) ||
        (o.user?.email || '').toLowerCase().includes(q)
      )
    }

    // Sort orders: oldest first, delivered orders at bottom
    result = result.sort((a, b) => {
      // Move delivered orders to bottom
      if (a.status === 'Delivered' && b.status !== 'Delivered') return 1
      if (a.status !== 'Delivered' && b.status === 'Delivered') return -1
      
      // For all other orders, sort by date (oldest first)
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateA - dateB
    })

    return result
  }, [orders, search, statusFilter])

  const handleConfirm = async (orderId) => {
    if (!window.confirm('Confirm this order?')) return
    try {
      setActingId(orderId)
      const res = await axios.patch(`http://localhost:1000/order/${orderId}/confirm`)
      if (res.data?.success) {
        setOrders(prev => prev.map(o => o._id === orderId ? res.data.order : o))
        toast.success('Order confirmed successfully!')
      } else {
        toast.error(res.data?.message || 'Confirm failed')
      }
    } catch (err) {
      console.error('Confirm error', err)
      toast.error(err?.response?.data?.message || 'Confirm failed')
    } finally {
      setActingId('')
    }
  }

  const handleShip = async (orderId) => {
    const trackingNumber = prompt('Enter tracking number (optional):')
    if (!window.confirm('Mark this order as shipped?')) return
    try {
      setActingId(orderId)
      const res = await axios.patch(`http://localhost:1000/order/${orderId}/ship`, { trackingNumber })
      if (res.data?.success) {
        setOrders(prev => prev.map(o => o._id === orderId ? res.data.order : o))
        toast.success('Order marked as shipped!')
      } else {
        toast.error(res.data?.message || 'Ship failed')
      }
    } catch (err) {
      console.error('Ship error', err)
      toast.error(err?.response?.data?.message || 'Ship failed')
    } finally {
      setActingId('')
    }
  }

  const handleCancel = async (orderId) => {
    const reason = prompt('Enter cancellation reason:')
    if (!window.confirm('Cancel this order?')) return
    try {
      setActingId(orderId)
      const res = await axios.patch(`http://localhost:1000/order/${orderId}/cancel`, { cancelReason: reason })
      if (res.data?.success) {
        setOrders(prev => prev.map(o => o._id === orderId ? res.data.order : o))
        toast.success('Order cancelled')
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


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-[#23211b] to-[#181818]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Orders</h1>
            <p className="text-gray-400 mt-1">Manage, confirm and cancel customer orders</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order #, name, email"
              className="rounded-xl bg-black/50 border border-[#D9C27B]/30 text-white px-4 py-2 focus:outline-none focus:border-[#D9C27B]"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl bg-black/50 border border-[#D9C27B]/30 text-white px-4 py-2 focus:outline-none focus:border-[#D9C27B]"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Content states */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-[#D9C27B]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-16">{error}</div>
        ) : (
          <div className="bg-black/60 backdrop-blur-md border-2 border-[#D9C27B]/30 rounded-2xl overflow-hidden shadow-[0_0_30px_-12px_rgba(217,194,123,0.25)]">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-[#D9C27B]/20 text-xs sm:text-sm text-gray-300">
              <div className="col-span-3 sm:col-span-2">Order</div>
              <div className="col-span-3 sm:col-span-3">Customer</div>
              <div className="hidden md:block col-span-2">Date</div>
              <div className="col-span-3 sm:col-span-2">Total</div>
              <div className="hidden sm:block col-span-2">Status</div>
              <div className="col-span-3 sm:col-span-3 text-right">Actions</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[#D9C27B]/10">
              {filtered.length === 0 ? (
                <div className="px-4 py-6 text-gray-400">No orders found.</div>
              ) : (
                filtered.map((o) => {
                  const totalQty = (o.items || []).reduce((s, it) => s + (it.quantity || 1), 0)
                  return (
                    <div key={o._id} className="grid grid-cols-12 gap-3 px-4 py-4 items-center">
                      {/* Order # */}
                      <div className="col-span-12 sm:col-span-2">
                        <div className="text-white font-semibold truncate">#{o.orderNumber}</div>
                        <div className="text-xs text-gray-400 md:hidden">{prettyDate(o.createdAt)}</div>
                      </div>

                      {/* Customer */}
                      <div className="col-span-6 sm:col-span-3 min-w-0">
                        <div className="truncate text-gray-200">{o.user?.username || 'Customer'}</div>
                        <div className="truncate text-xs text-gray-500">{o.user?.email}</div>
                      </div>

                      {/* Date (desktop) */}
                      <div className="hidden md:block col-span-2 text-gray-300">{prettyDate(o.createdAt)}</div>

                      {/* Total & Payment */}
                      <div className="col-span-3 sm:col-span-2">
                        <div className="text-[#D9C27B] font-extrabold">{currency(o.totalPrice)}</div>
                        <div className="text-xs text-gray-500">{totalQty} item(s)</div>
                        <div className="text-xs mt-1">
                          <span className={o.paymentMethod === 'COD' ? 'text-orange-400' : 'text-green-400'}>
                            {o.paymentMethod === 'COD' ? '💵 COD' : '💳 ONLINE'}
                          </span>
                          {o.paymentMethod === 'ONLINE' && (
                            <span className={`ml-1 ${o.paid ? 'text-green-400' : 'text-red-400'}`}>
                              • {o.paid ? 'Paid ✓' : 'Unpaid ✗'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="hidden sm:flex col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[o.status] || 'bg-gray-700 text-gray-300'}`}>{o.status}</span>
                      </div>

                      {/* Actions */}
                      <div className="col-span-6 sm:col-span-3 flex items-center justify-end gap-2">
                        {/* Confirm Button */}
                        {o.status === 'Pending' && (
                          <button
                            disabled={actingId === o._id}
                            onClick={() => handleConfirm(o._id)}
                            className="px-3 py-2 rounded-lg text-black font-semibold bg-gradient-to-r from-[#D9C27B] via-[#F4E4A6] to-[#D9C27B] hover:shadow-2xl hover:shadow-[#D9C27B]/30 disabled:opacity-60 text-xs sm:text-sm"
                          >
                            ✓ Confirm
                          </button>
                        )}
                        
                        {/* Ship Button */}
                        {o.status === 'Confirmed' && (
                          <button
                            disabled={actingId === o._id}
                            onClick={() => handleShip(o._id)}
                            className="px-3 py-2 rounded-lg text-black font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 hover:shadow-2xl hover:shadow-blue-400/30 disabled:opacity-60 text-xs sm:text-sm"
                          >
                            🚚 Ship
                          </button>
                        )}
                        
                        {/* Cancel Button */}
                        {(o.status === 'Pending' || o.status === 'Confirmed') && (
                          <button
                            disabled={actingId === o._id}
                            onClick={() => handleCancel(o._id)}
                            className="px-3 py-2 rounded-lg font-semibold text-red-300 bg-red-500/15 border border-red-500/30 hover:bg-red-500/25 disabled:opacity-60 text-xs sm:text-sm"
                          >
                            ✗ Cancel
                          </button>
                        )}
                        
                        {/* Status Badge for Shipped/Delivered */}
                        {(o.status === 'Shipped' || o.status === 'Delivered') && (
                          <div className="px-3 py-2 text-xs sm:text-sm font-semibold">
                            {o.status === 'Shipped' ? '📦 In Transit' : '✅ Completed'}
                          </div>
                        )}
                      </div>

                      {/* Items preview (full width) */}
                      <div className="col-span-12 mt-3">
                        <div className="bg-black/40 border border-[#D9C27B]/20 rounded-xl p-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                          {(o.items || []).slice(0, 3).map((it, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#D9C27B]/30 bg-black">
                                <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-gray-200 truncate">{it.name}</div>
                                <div className="text-xs text-gray-500">Qty {it.quantity} • {currency(it.price)}</div>
                              </div>
                            </div>
                          ))}
                          {o.items?.length > 3 && (
                            <div className="text-sm text-gray-400 flex items-center">+{o.items.length - 3} more…</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Order
