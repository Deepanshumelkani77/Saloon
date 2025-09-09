const Stylist = require('../models/Stylist');

// Get all stylists
const getAllStylists = async (req, res) => {
  try {
    const stylists = await Stylist.find().sort({ createdAt: -1 });
    res.status(200).json(stylists);
  } catch (error) {
    console.error('Error fetching stylists:', error);
    res.status(500).json({ message: 'Failed to fetch stylists', error: error.message });
  }
};

// Get stylist by ID
const getStylistById = async (req, res) => {
  try {
    const stylist = await Stylist.findById(req.params.id);
    if (!stylist) {
      return res.status(404).json({ message: 'Stylist not found' });
    }
    res.status(200).json(stylist);
  } catch (error) {
    console.error('Error fetching stylist:', error);
    res.status(500).json({ message: 'Failed to fetch stylist', error: error.message });
  }
};

// Create new stylist
const createStylist = async (req, res) => {
  try {
    const { name, specialty, experience, isActive, workingHours, workingDays, phone, email, image } = req.body;

    // Validation
    if (!name || !specialty || !experience) {
      return res.status(400).json({ message: 'Name, specialty, and experience are required' });
    }

    const newStylist = new Stylist({
      name,
      specialty,
      experience,
      isActive: isActive !== undefined ? isActive : true,
      workingHours: workingHours || { start: "9:00 AM", end: "8:00 PM" },
      workingDays: workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      phone,
      email,
      image
    });

    const savedStylist = await newStylist.save();
    res.status(201).json(savedStylist);
  } catch (error) {
    console.error('Error creating stylist:', error);
    res.status(500).json({ message: 'Failed to create stylist', error: error.message });
  }
};

// Update stylist
const updateStylist = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedStylist = await Stylist.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedStylist) {
      return res.status(404).json({ message: 'Stylist not found' });
    }

    res.status(200).json(updatedStylist);
  } catch (error) {
    console.error('Error updating stylist:', error);
    res.status(500).json({ message: 'Failed to update stylist', error: error.message });
  }
};

// Delete stylist
const deleteStylist = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStylist = await Stylist.findByIdAndDelete(id);

    if (!deletedStylist) {
      return res.status(404).json({ message: 'Stylist not found' });
    }

    res.status(200).json({ message: 'Stylist deleted successfully', stylist: deletedStylist });
  } catch (error) {
    console.error('Error deleting stylist:', error);
    res.status(500).json({ message: 'Failed to delete stylist', error: error.message });
  }
};

// Toggle stylist active status
const toggleStylistStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const stylist = await Stylist.findById(id);
    if (!stylist) {
      return res.status(404).json({ message: 'Stylist not found' });
    }

    stylist.isActive = !stylist.isActive;
    const updatedStylist = await stylist.save();

    res.status(200).json(updatedStylist);
  } catch (error) {
    console.error('Error toggling stylist status:', error);
    res.status(500).json({ message: 'Failed to toggle stylist status', error: error.message });
  }
};

module.exports = {
  getAllStylists,
  getStylistById,
  createStylist,
  updateStylist,
  deleteStylist,
  toggleStylistStatus
};
