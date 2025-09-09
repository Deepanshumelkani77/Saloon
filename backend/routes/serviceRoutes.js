const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServicesByCategory,
  getServiceCategories
} = require('../controller/serviceController');

// Get all services
router.get('/all', getAllServices);

// Get service categories
router.get('/categories', getServiceCategories);

// Get services by category
router.get('/category/:category', getServicesByCategory);

// Get service by ID
router.get('/:id', getServiceById);

// Create new service
router.post('/create', createService);

// Update service
router.put('/update/:id', updateService);

// Delete service
router.delete('/delete/:id', deleteService);

module.exports = router;
