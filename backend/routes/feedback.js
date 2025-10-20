const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getApprovedFeedback,
  getAllFeedback,
  approveFeedback,
  deleteFeedback,
  getFeedbackStats
} = require('../controller/feedbackController');

// Public routes
router.post('/submit', createFeedback);
router.get('/approved', getApprovedFeedback);

// Admin routes (you can add authentication middleware later)
router.get('/all', getAllFeedback);
router.put('/approve/:id', approveFeedback);
router.delete('/:id', deleteFeedback);
router.get('/stats', getFeedbackStats);

module.exports = router;
