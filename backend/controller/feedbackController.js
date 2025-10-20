const Feedback = require('../models/Feedback');

// Create new feedback
const createFeedback = async (req, res) => {
  try {
    const { name, email, rating, review } = req.body;

    // Validate required fields
    if (!name || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: 'Name, rating, and review are required fields'
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const feedback = new Feedback({
      name,
      email,
      rating,
      review
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully! Thank you for your review.',
      feedback: {
        id: feedback._id,
        name: feedback.name,
        rating: feedback.rating,
        createdAt: feedback.createdAt
      }
    });

  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback. Please try again later.'
    });
  }
};

// Get all approved feedback (public)
const getApprovedFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ isApproved: true })
      .select('name rating review createdAt')
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback
    });

  } catch (error) {
    console.error('Error fetching approved feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback'
    });
  }
};

// Get all feedback (admin only)
const getAllFeedback = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const feedback = await Feedback.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Feedback.countDocuments();

    res.status(200).json({
      success: true,
      count: feedback.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      feedback
    });

  } catch (error) {
    console.error('Error fetching all feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback'
    });
  }
};

// Approve feedback (admin only)
const approveFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback approved successfully',
      feedback
    });

  } catch (error) {
    console.error('Error approving feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve feedback'
    });
  }
};

// Delete feedback (admin only)
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete feedback'
    });
  }
};

// Get feedback statistics
const getFeedbackStats = async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const approvedFeedback = await Feedback.countDocuments({ isApproved: true });
    const pendingFeedback = await Feedback.countDocuments({ isApproved: false });

    // Calculate average rating
    const ratingStats = await Feedback.aggregate([
      { $match: { isApproved: true } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 }
        }
      }
    ]);

    const averageRating = ratingStats.length > 0 ? ratingStats[0].averageRating : 0;

    // Rating distribution
    const ratingDistribution = await Feedback.aggregate([
      { $match: { isApproved: true } },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalFeedback,
        approvedFeedback,
        pendingFeedback,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution
      }
    });

  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback statistics'
    });
  }
};

module.exports = {
  createFeedback,
  getApprovedFeedback,
  getAllFeedback,
  approveFeedback,
  deleteFeedback,
  getFeedbackStats
};
