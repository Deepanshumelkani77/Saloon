const express = require('express');
const router = express.Router();
const {
  getAllStylists,
  getStylistById,
  createStylist,
  updateStylist,
  deleteStylist,
  toggleStylistStatus
} = require('../controller/stylistController');

// GET /stylist/all - Get all stylists
router.get('/all', getAllStylists);

// GET /stylist/:id - Get stylist by ID
router.get('/:id', getStylistById);

// POST /stylist/create - Create new stylist
router.post('/create', createStylist);

// PUT /stylist/update/:id - Update stylist
router.put('/update/:id', updateStylist);

// DELETE /stylist/delete/:id - Delete stylist
router.delete('/delete/:id', deleteStylist);

// PATCH /stylist/toggle/:id - Toggle stylist active status
router.patch('/toggle/:id', toggleStylistStatus);

module.exports = router;
