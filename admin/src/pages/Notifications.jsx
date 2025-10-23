import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaBell, FaCheck, FaTrash, FaArchive, FaFilter, FaEye,
  FaShoppingCart, FaCalendar, FaBox, FaUser, FaCog, FaMoneyBill,
  FaTimes, FaCheckDouble, FaExclamationCircle, FaInfoCircle
} from 'react-icons/fa';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0, archived: 0 });

  const API_BASE_URL = 'http://localhost:1000/notification';

  const typeIcons = {
    order: <FaShoppingCart />,
    appointment: <FaCalendar />,
    product: <FaBox />,
    user: <FaUser />,
    system: <FaCog />,
    payment: <FaMoneyBill />
  };

  const priorityColors = {
    low: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    medium: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
    high: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
    urgent: 'bg-red-500/20 border-red-500/30 text-red-400'
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/all`);
      if (response.data.success) {
        setNotifications(response.data.data);
        setStats(response.data.stats);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to fetch notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    let filtered = notifications;
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(n => n.status === filterStatus);
    }
    if (filterType !== 'all') {
      filtered = filtered.filter(n => n.type === filterType);
    }
    if (filterPriority !== 'all') {
      filtered = filtered.filter(n => n.priority === filterPriority);
    }
    
    setFilteredNotifications(filtered);
  }, [notifications, filterStatus, filterType, filterPriority]);

  const handleMarkAsRead = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/status/${id}`, { status: 'read' });
      if (response.data.success) {
        fetchNotifications();
      }
    } catch (err) {
      console.error('Error marking as read:', err);
      setError('Failed to update notification');
    }
  };

  const handleArchive = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/status/${id}`, { status: 'archived' });
      if (response.data.success) {
        fetchNotifications();
      }
    } catch (err) {
      console.error('Error archiving notification:', err);
      setError('Failed to archive notification');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
        if (response.data.success) {
          fetchNotifications();
        }
      } catch (err) {
        console.error('Error deleting notification:', err);
        setError('Failed to delete notification');
      }
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/mark-all-read`);
      if (response.data.success) {
        fetchNotifications();
      }
    } catch (err) {
      console.error('Error marking all as read:', err);
      setError('Failed to mark all as read');
    }
  };

  const handleDeleteAllArchived = async () => {
    if (window.confirm('Are you sure you want to delete all archived notifications? This cannot be undone.')) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/delete-archived`);
        if (response.data.success) {
          fetchNotifications();
          alert(response.data.message);
        }
      } catch (err) {
        console.error('Error deleting archived:', err);
        setError('Failed to delete archived notifications');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-[#D9C27B] mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-[#23211b] to-[#181818]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/30 rounded-xl p-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <FaTimes className="text-red-400" />
              <p className="text-red-400">{error}</p>
              <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-300">
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-xl flex items-center justify-center shadow-lg">
                <FaBell className="text-black text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Notifications</h1>
                <p className="text-gray-400 mt-1">Stay updated with all activities</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <FaCheckDouble /><span className="hidden sm:inline">Mark All Read</span>
              </button>
              <button 
                onClick={handleDeleteAllArchived}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <FaTrash /><span className="hidden sm:inline">Clear Archived</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-black/60 backdrop-blur-xl border border-[#D9C27B]/30 rounded-xl p-4 shadow-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-gray-400 text-sm">Total</p>
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4 shadow-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{stats.unread}</p>
                <p className="text-gray-400 text-sm">Unread</p>
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-xl border border-green-500/30 rounded-xl p-4 shadow-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{stats.read}</p>
                <p className="text-gray-400 text-sm">Read</p>
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-xl border border-gray-500/30 rounded-xl p-4 shadow-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-400">{stats.archived}</p>
                <p className="text-gray-400 text-sm">Archived</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-black/60 backdrop-blur-xl border border-[#D9C27B]/30 rounded-xl p-4 shadow-lg mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FaFilter className="text-[#D9C27B]" />
              <h3 className="text-white font-semibold">Filters</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-black/60 border border-[#D9C27B]/30 rounded-lg text-white focus:outline-none focus:border-[#D9C27B]"
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 bg-black/60 border border-[#D9C27B]/30 rounded-lg text-white focus:outline-none focus:border-[#D9C27B]"
                >
                  <option value="all">All Types</option>
                  <option value="order">Orders</option>
                  <option value="appointment">Appointments</option>
                  <option value="product">Products</option>
                  <option value="user">Users</option>
                  <option value="payment">Payments</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Priority</label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full px-4 py-2 bg-black/60 border border-[#D9C27B]/30 rounded-lg text-white focus:outline-none focus:border-[#D9C27B]"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 bg-black/60 backdrop-blur-xl border border-[#D9C27B]/30 rounded-xl">
              <FaBell className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No notifications found</p>
              <p className="text-gray-500 text-sm mt-2">All caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`group bg-black/60 backdrop-blur-xl border rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  notification.status === 'unread' 
                    ? 'border-[#D9C27B]/50 bg-[#D9C27B]/5' 
                    : 'border-[#D9C27B]/20'
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                    notification.status === 'unread' 
                      ? 'bg-[#D9C27B]/20 text-[#D9C27B]' 
                      : 'bg-gray-700/50 text-gray-400'
                  }`}>
                    {typeIcons[notification.type] || <FaBell />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`font-semibold ${
                        notification.status === 'unread' ? 'text-white' : 'text-gray-300'
                      }`}>
                        {notification.title}
                      </h3>
                      <span className={`flex-shrink-0 text-xs px-2 py-1 rounded-full border ${
                        priorityColors[notification.priority]
                      }`}>
                        {notification.priority}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{notification.message}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs text-gray-500">{formatDate(notification.createdAt)}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        notification.status === 'unread' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : notification.status === 'read'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {notification.status}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-[#D9C27B]/20 text-[#D9C27B]">
                        {notification.type}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {notification.status === 'unread' && (
                      <button
                        onClick={() => handleMarkAsRead(notification._id)}
                        className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all"
                        title="Mark as read"
                      >
                        <FaCheck />
                      </button>
                    )}
                    {notification.status !== 'archived' && (
                      <button
                        onClick={() => handleArchive(notification._id)}
                        className="p-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 rounded-lg transition-all"
                        title="Archive"
                      >
                        <FaArchive />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification._id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
