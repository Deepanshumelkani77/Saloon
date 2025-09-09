import axios from 'axios';

const API_BASE_URL = 'http://localhost:1000/service';

// Create axios instance with default config
const serviceApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Service API functions
export const serviceApiService = {
  // Get all services
  getAllServices: async () => {
    try {
      const response = await serviceApi.get('/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get service by ID
  getServiceById: async (id) => {
    try {
      const response = await serviceApi.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new service
  createService: async (serviceData) => {
    try {
      const response = await serviceApi.post('/create', serviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update service
  updateService: async (id, serviceData) => {
    try {
      const response = await serviceApi.put(`/update/${id}`, serviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete service
  deleteService: async (id) => {
    try {
      const response = await serviceApi.delete(`/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get services by category
  getServicesByCategory: async (category) => {
    try {
      const response = await serviceApi.get(`/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all service categories
  getServiceCategories: async () => {
    try {
      const response = await serviceApi.get('/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default serviceApiService;
