const Service = require('../models/Service');

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    
    if (!service || !service.isActive) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Failed to fetch service', error: error.message });
  }
};

// Create new service
const createService = async (req, res) => {
  try {
    const { name, price, duration, category, description } = req.body;
    
    // Validation
    if (!name || !price || !duration || !category || !description) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        required: ['name', 'price', 'duration', 'category', 'description'] 
      });
    }

    // Check if service with same name already exists
    const existingService = await Service.findOne({ name, isActive: true });
    if (existingService) {
      return res.status(400).json({ message: 'Service with this name already exists' });
    }

    const newService = new Service({
      name,
      price: parseFloat(price),
      duration: parseInt(duration),
      category,
      description
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Failed to create service', error: error.message });
  }
};

// Update service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, duration, category, description } = req.body;
    
    // Validation
    if (!name || !price || !duration || !category || !description) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        required: ['name', 'price', 'duration', 'category', 'description'] 
      });
    }

    // Check if service exists
    const service = await Service.findById(id);
    if (!service || !service.isActive) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if another service with same name exists (excluding current service)
    const existingService = await Service.findOne({ 
      name, 
      isActive: true, 
      _id: { $ne: id } 
    });
    if (existingService) {
      return res.status(400).json({ message: 'Service with this name already exists' });
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        price: parseFloat(price),
        duration: parseInt(duration),
        category,
        description
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Failed to update service', error: error.message });
  }
};

// Delete service (soft delete)
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    
    const service = await Service.findById(id);
    if (!service || !service.isActive) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Soft delete by setting isActive to false
    await Service.findByIdAndUpdate(id, { isActive: false });
    
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }
};

// Get services by category
const getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Service.find({ category, isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services by category:', error);
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
};

// Get service categories
const getServiceCategories = async (req, res) => {
  try {
    const categories = await Service.distinct('category', { isActive: true });
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServicesByCategory,
  getServiceCategories
};
