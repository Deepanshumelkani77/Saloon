import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Calendar, User, Mail, CheckCircle, XCircle, Trash2, Eye } from 'lucide-react';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState('all'); // all, approved, pending

  useEffect(() => {
    fetchFeedbacks();
    fetchStats();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:1000/feedback/all');
      const data = await response.json();
      
      if (data.success) {
        setFeedbacks(data.feedback);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:1000/feedback/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const approveFeedback = async (id) => {
    try {
      const response = await fetch(`http://localhost:1000/feedback/approve/${id}`, {
        method: 'PUT',
      });
      const data = await response.json();
      
      if (data.success) {
        fetchFeedbacks();
        fetchStats();
      }
    } catch (error) {
      console.error('Error approving feedback:', error);
    }
  };

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const response = await fetch(`http://localhost:1000/feedback/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        
        if (data.success) {
          fetchFeedbacks();
          fetchStats();
        }
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filter === 'approved') return feedback.isApproved;
    if (filter === 'pending') return !feedback.isApproved;
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#23211b] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D9C27B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#D9C27B] text-lg">Loading feedbacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#23211b] text-white py-4 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#D9C27B] mb-2">Customer Feedback</h1>
          <p className="text-gray-300">Manage and review customer feedback and ratings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-black/90 backdrop-blur-xl border border-[#D9C27B]/30 rounded-2xl p-6 hover:border-[#D9C27B]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D9C27B]/20 group hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="text-2xl text-black" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-white group-hover:text-[#D9C27B] transition-colors duration-300">
                {stats.totalFeedback || 0}
              </h3>
              <p className="text-gray-300 text-sm font-medium">Total Feedback</p>
            </div>
          </div>

          <div className="bg-black/90 backdrop-blur-xl border border-[#D9C27B]/30 rounded-2xl p-6 hover:border-[#D9C27B]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D9C27B]/20 group hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-green-400 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="text-2xl text-black" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-white group-hover:text-[#D9C27B] transition-colors duration-300">
                {stats.approvedFeedback || 0}
              </h3>
              <p className="text-gray-300 text-sm font-medium">Approved</p>
            </div>
          </div>

          <div className="bg-black/90 backdrop-blur-xl border border-[#D9C27B]/30 rounded-2xl p-6 hover:border-[#D9C27B]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D9C27B]/20 group hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-400 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Eye className="text-2xl text-black" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-white group-hover:text-[#D9C27B] transition-colors duration-300">
                {stats.pendingFeedback || 0}
              </h3>
              <p className="text-gray-300 text-sm font-medium">Pending</p>
            </div>
          </div>

          <div className="bg-black/90 backdrop-blur-xl border border-[#D9C27B]/30 rounded-2xl p-6 hover:border-[#D9C27B]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D9C27B]/20 group hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-400 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Star className="text-2xl text-black" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-white group-hover:text-[#D9C27B] transition-colors duration-300">
                {stats.averageRating || 0}
              </h3>
              <p className="text-gray-300 text-sm font-medium">Avg Rating</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-6">
          {['all', 'approved', 'pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 border ${
                filter === tab
                  ? 'bg-[#D9C27B] text-black border-[#D9C27B]'
                  : 'bg-black/50 text-gray-300 border-[#D9C27B]/30 hover:bg-black/70 hover:border-[#D9C27B]/50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-2 text-sm">
                ({tab === 'all' ? feedbacks.length : 
                  tab === 'approved' ? stats.approvedFeedback || 0 : 
                  stats.pendingFeedback || 0})
              </span>
            </button>
          ))}
        </div>

        {/* Feedback Cards */}
        <div className="space-y-6">
          {filteredFeedbacks.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No feedback found</p>
            </div>
          ) : (
            filteredFeedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="bg-black/90 backdrop-blur-xl border border-[#D9C27B]/30 rounded-2xl p-6 hover:border-[#D9C27B]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D9C27B]/20"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Left Section - User Info & Rating */}
                  <div className="flex-shrink-0 lg:w-1/4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#D9C27B]">{feedback.name}</h3>
                        {feedback.email && (
                          <div className="flex items-center space-x-1 text-sm text-gray-400">
                            <Mail className="w-3 h-3" />
                            <span>{feedback.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex space-x-1">
                        {renderStars(feedback.rating)}
                      </div>
                      <span className="text-[#D9C27B] font-semibold">{feedback.rating}/5</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(feedback.createdAt)}</span>
                    </div>
                  </div>

                  {/* Middle Section - Review Content */}
                  <div className="flex-grow lg:w-1/2">
                    <div className="bg-black/30 p-4 rounded-xl border border-gray-600/30">
                      <h4 className="text-[#D9C27B] font-semibold mb-2">Customer Review:</h4>
                      <p className="text-gray-300 leading-relaxed">{feedback.review}</p>
                    </div>
                  </div>

                  {/* Right Section - Status & Actions */}
                  <div className="flex-shrink-0 lg:w-1/4 flex flex-col items-end space-y-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      feedback.isApproved
                        ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                    }`}>
                      {feedback.isApproved ? 'Approved' : 'Pending'}
                    </div>

                    <div className="flex space-x-2">
                      {!feedback.isApproved && (
                        <button
                          onClick={() => approveFeedback(feedback._id)}
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-300"
                          title="Approve Feedback"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteFeedback(feedback._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-300"
                        title="Delete Feedback"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

export default Feedback;
