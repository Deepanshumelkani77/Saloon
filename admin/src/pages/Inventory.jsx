import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
  FaSearch, FaPlus, FaEdit, FaTrash, FaBox, FaMoneyBillWave, FaImage,
  FaTimes, FaCheck, FaFilter, FaWarehouse, FaUpload, FaSpinner, FaEye
} from 'react-icons/fa';
import CategoryManagementModal from './CategoryManagementModal';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSubCategory, setFilterSubCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '', image: '', size: '', price: '', category: '', subCategory: '', gender: '', brand: '', stock: ''
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ category: '', subCategory: '' });
  const [managementMode, setManagementMode] = useState('add'); // 'add' or 'delete'

  const API_BASE_URL = 'http://localhost:1000/product';
  const CLOUDINARY_UPLOAD_PRESET = 'salon_products';
  const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';

  const [categoryOptions, setCategoryOptions] = useState(['Hair', 'Skin', 'Accessories', 'Men', 'Women']);
  const [subCategoryOptions, setSubCategoryOptions] = useState({
    Hair: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Serum', 'Hair Mask', 'Hair Spray'],
    Skin: ['Cleanser', 'Moisturizer', 'Serum', 'Face Mask', 'Sunscreen', 'Toner'],
    Accessories: ['Brush', 'Comb', 'Hair Dryer', 'Straightener', 'Curler', 'Scissors'],
    Men: ['Beard Oil', 'Shaving Cream', 'Aftershave', 'Face Wash', 'Cologne'],
    Women: ['Makeup', 'Lipstick', 'Foundation', 'Mascara', 'Perfume', 'Nail Polish']
  });
  const genderOptions = ['Men', 'Women', 'Unisex'];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/all`);
      if (response.data.success) {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(product => 
        (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (filterCategory !== 'all') filtered = filtered.filter(product => product.category === filterCategory);
    if (filterSubCategory !== 'all') filtered = filtered.filter(product => product.subCategory === filterSubCategory);
    setFilteredProducts(filtered);
  }, [products, searchTerm, filterCategory, filterSubCategory]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please select a valid image file'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Image size should be less than 5MB'); return; }

    setUploading(true);
    setError(null);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formDataUpload
      );
      setFormData(prev => ({ ...prev, image: response.data.secure_url }));
    } catch (err) {
      console.error('Error uploading image:', err);
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    setModalMode('add');
    setFormData({ name: '', image: '', size: '', price: '', category: '', subCategory: '', gender: '', brand: '', stock: '' });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setFormData({
      name: product.name || '', image: product.image || '', size: product.size || '', price: product.price || '',
      category: product.category || '', subCategory: product.subCategory || '', gender: product.gender || '',
      brand: product.brand || '', stock: product.stock || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name, image: formData.image, size: formData.size ? parseFloat(formData.size) : 0,
        price: parseFloat(formData.price), category: formData.category, subCategory: formData.subCategory,
        gender: formData.gender, brand: formData.brand, stock: formData.stock ? parseInt(formData.stock) : 0
      };

      let response;
      if (modalMode === 'add') {
        response = await axios.post(`${API_BASE_URL}/create`, productData);
      } else {
        response = await axios.put(`${API_BASE_URL}/update/${selectedProduct._id}`, productData);
      }

      if (response.data.success) {
        setShowModal(false);
        fetchProducts();
        setError(null);
      }
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err.response?.data?.message || 'Failed to save product. Please try again.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${productId}`);
        if (response.data.success) {
          fetchProducts();
          setError(null);
        }
      } catch (err) {
        console.error('Error deleting product:', err);
        setError('Failed to delete product. Please try again.');
      }
    }
  };

  const handleViewProduct = (product) => {
    setViewProduct(product);
    setShowDetailModal(true);
  };

  const handleAddCategory = () => {
    setManagementMode('add');
    setCategoryFormData({ category: '', subCategory: '' });
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = () => {
    setManagementMode('delete');
    setCategoryFormData({ category: '', subCategory: '' });
    setShowCategoryModal(true);
  };

  const handleCategorySubmit = () => {
    if (managementMode === 'add') {
      // Add new category
      if (categoryFormData.category && !categoryFormData.subCategory) {
        if (!categoryOptions.includes(categoryFormData.category)) {
          setCategoryOptions([...categoryOptions, categoryFormData.category]);
          setSubCategoryOptions({...subCategoryOptions, [categoryFormData.category]: []});
          alert('Category added successfully!');
        } else {
          alert('Category already exists!');
        }
      }
      // Add new subcategory
      else if (categoryFormData.category && categoryFormData.subCategory) {
        if (categoryOptions.includes(categoryFormData.category)) {
          const currentSubs = subCategoryOptions[categoryFormData.category] || [];
          if (!currentSubs.includes(categoryFormData.subCategory)) {
            setSubCategoryOptions({
              ...subCategoryOptions,
              [categoryFormData.category]: [...currentSubs, categoryFormData.subCategory]
            });
            alert('Subcategory added successfully!');
          } else {
            alert('Subcategory already exists in this category!');
          }
        } else {
          alert('Please select a valid category first!');
        }
      }
    } else if (managementMode === 'delete') {
      // Delete category
      if (categoryFormData.category && !categoryFormData.subCategory) {
        if (window.confirm(`Are you sure you want to delete the category "${categoryFormData.category}"? This will also delete all its subcategories.`)) {
          setCategoryOptions(categoryOptions.filter(cat => cat !== categoryFormData.category));
          const newSubCategoryOptions = {...subCategoryOptions};
          delete newSubCategoryOptions[categoryFormData.category];
          setSubCategoryOptions(newSubCategoryOptions);
          alert('Category deleted successfully!');
        }
      }
      // Delete subcategory
      else if (categoryFormData.category && categoryFormData.subCategory) {
        if (window.confirm(`Are you sure you want to delete the subcategory "${categoryFormData.subCategory}"?`)) {
          setSubCategoryOptions({
            ...subCategoryOptions,
            [categoryFormData.category]: subCategoryOptions[categoryFormData.category].filter(sub => sub !== categoryFormData.subCategory)
          });
          alert('Subcategory deleted successfully!');
        }
      }
    }
    setShowCategoryModal(false);
    setCategoryFormData({ category: '', subCategory: '' });
  };

  const stats = useMemo(() => ({
    total: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0),
    lowStock: products.filter(p => (p.stock || 0) < 10).length,
    outOfStock: products.filter(p => (p.stock || 0) === 0).length
  }), [products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#23211b] to-[#181818] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-[#D9C27B] mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading inventory...</p>
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
        
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-xl flex items-center justify-center shadow-lg">
                <FaWarehouse className="text-black text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Inventory Management</h1>
                <p className="text-gray-400 mt-1">Manage products, stock, and pricing</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button onClick={handleAddProduct} className="px-6 py-3 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#D9C27B]/30 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                <FaPlus /><span>Add Product</span>
              </button>
              <button onClick={handleAddCategory} className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                <FaPlus /><span>Add Category</span>
              </button>
              <button onClick={handleDeleteCategory} className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                <FaTrash /><span>Delete Category</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-black/60 backdrop-blur-xl border border-[#D9C27B]/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#D9C27B]/20 rounded-lg flex items-center justify-center">
                  <FaBox className="text-[#D9C27B] text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                  <p className="text-gray-400 text-sm">Total Products</p>
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-green-500/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FaMoneyBillWave className="text-green-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">₹{stats.totalValue.toLocaleString('en-IN')}</p>
                  <p className="text-gray-400 text-sm">Total Value</p>
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <FaWarehouse className="text-yellow-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.lowStock}</p>
                  <p className="text-gray-400 text-sm">Low Stock</p>
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <FaTimes className="text-red-400 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.outOfStock}</p>
                  <p className="text-gray-400 text-sm">Out of Stock</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search by name, brand, or category..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-[#D9C27B]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D9C27B] transition-colors" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <FaFilter className="text-[#D9C27B]" />
                <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setFilterSubCategory('all'); }}
                  className="px-4 py-3 bg-black/50 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-colors">
                  <option value="all">All Categories</option>
                  {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <select value={filterSubCategory} onChange={(e) => setFilterSubCategory(e.target.value)} disabled={filterCategory === 'all'}
                className="px-4 py-3 bg-black/50 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-colors disabled:opacity-50">
                <option value="all">All Subcategories</option>
                {filterCategory !== 'all' && subCategoryOptions[filterCategory]?.map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <FaBox className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No products found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or add new products</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="group bg-black/60 backdrop-blur-md border border-[#D9C27B]/30 rounded-xl overflow-hidden hover:border-[#D9C27B]/60 hover:shadow-xl hover:shadow-[#D9C27B]/20 transition-all duration-300">
                <div className="relative aspect-square bg-black/40 overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><FaImage className="text-6xl text-gray-600" /></div>
                  )}
                  
                  <div className="absolute top-2 right-2">
                    {(product.stock || 0) === 0 ? (
                      <span className="px-2 py-1 bg-red-500/90 text-white text-xs font-bold rounded-full">Out of Stock</span>
                    ) : (product.stock || 0) < 10 ? (
                      <span className="px-2 py-1 bg-yellow-500/90 text-black text-xs font-bold rounded-full">Low Stock</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-500/90 text-white text-xs font-bold rounded-full">In Stock</span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-white font-bold text-lg mb-1 truncate group-hover:text-[#D9C27B] transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 bg-[#D9C27B]/20 text-[#D9C27B] text-xs font-semibold rounded-full">{product.category}</span>
                      <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">{product.subCategory}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[#D9C27B] font-bold text-xl">₹{product.price}</p>
                      {product.brand && <p className="text-gray-400 text-xs">{product.brand}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{product.stock || 0} units</p>
                      <p className="text-gray-400 text-xs">Available</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleViewProduct(product)} className="px-3 py-2 bg-[#D9C27B]/20 text-[#D9C27B] rounded-lg hover:bg-[#D9C27B]/30 border border-[#D9C27B]/30 hover:border-[#D9C27B]/50 transition-all duration-200 flex items-center justify-center" title="View Details">
                      <FaEye />
                    </button>
                    <button onClick={() => handleEditProduct(product)} className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
                      <FaEdit /><span>Edit</span>
                    </button>
                    <button onClick={() => handleDeleteProduct(product._id)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 transition-all duration-200 flex items-center justify-center">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black/95 backdrop-blur-xl border-2 border-[#D9C27B]/30 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D9C27B] to-[#F4E4A6] rounded-lg flex items-center justify-center">
                    {modalMode === 'add' ? <FaPlus className="text-black" /> : <FaEdit className="text-black" />}
                  </div>
                  {modalMode === 'add' ? 'Add New Product' : 'Edit Product'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Product Image</label>
                  <div className="flex flex-col items-center gap-4">
                    {formData.image && (
                      <div className="w-full max-w-xs aspect-square bg-black/40 rounded-xl overflow-hidden border border-[#D9C27B]/30">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                      </div>
                    )}
                    <label className="w-full px-4 py-3 bg-[#D9C27B]/20 text-[#D9C27B] rounded-xl hover:bg-[#D9C27B]/30 border border-[#D9C27B]/30 hover:border-[#D9C27B]/50 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
                      {uploading ? (
                        <><FaSpinner className="animate-spin" /><span>Uploading...</span></>
                      ) : (
                        <><FaUpload /><span>Upload Image</span></>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Product Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                      className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                      placeholder="Enter product name" />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Brand</label>
                    <input type="text" name="brand" value={formData.brand} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                      placeholder="Enter brand name" />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Category *</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} required
                      className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-colors">
                      <option value="">Select category</option>
                      {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subcategory *</label>
                    <select name="subCategory" value={formData.subCategory} onChange={handleInputChange} required disabled={!formData.category}
                      className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-colors disabled:opacity-50">
                      <option value="">Select subcategory</option>
                      {formData.category && subCategoryOptions[formData.category]?.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} required
                      className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-colors">
                      <option value="">Select gender</option>
                      {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Price (₹) *</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01"
                      className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                      placeholder="Enter price" />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Size (ml/g)</label>
                    <input type="number" name="size" value={formData.size} onChange={handleInputChange} min="0"
                      className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                      placeholder="Enter size" />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Stock Count *</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required min="0"
                      className="w-full px-4 py-3 bg-black/50 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-colors"
                      placeholder="Enter stock count" />
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                  <button type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-semibold rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <FaCheck />
                    {modalMode === 'add' ? 'Add Product' : 'Update Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Product Detail View Modal */}
        {showDetailModal && viewProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black border-2 border-[#D9C27B]/50 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-black border-b border-[#D9C27B]/30 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] p-2 rounded-xl">
                  <FaEye className="text-black text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-white">Product Details</h2>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-[#D9C27B] p-2 rounded-lg hover:bg-[#D9C27B]/10 transition-all duration-200"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Product Image and Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image */}
                <div className="aspect-square bg-black/40 rounded-xl overflow-hidden border border-[#D9C27B]/30">
                  {viewProduct.image ? (
                    <img src={viewProduct.image} alt={viewProduct.name} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaImage className="text-8xl text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Basic Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{viewProduct.name}</h3>
                    {viewProduct.brand && (
                      <p className="text-gray-400 text-lg">by {viewProduct.brand}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {(viewProduct.stock || 0) === 0 ? (
                      <span className="px-4 py-2 bg-red-500/90 text-white text-sm font-bold rounded-full">Out of Stock</span>
                    ) : (viewProduct.stock || 0) < 10 ? (
                      <span className="px-4 py-2 bg-yellow-500/90 text-black text-sm font-bold rounded-full">Low Stock</span>
                    ) : (
                      <span className="px-4 py-2 bg-green-500/90 text-white text-sm font-bold rounded-full">In Stock</span>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-[#D9C27B]/10 to-[#F4E4A6]/10 border border-[#D9C27B]/30 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Price</p>
                    <p className="text-[#D9C27B] font-bold text-4xl">₹{viewProduct.price}</p>
                  </div>

                  <div className="bg-black/40 border border-[#D9C27B]/20 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Stock Available</p>
                    <p className="text-white font-bold text-2xl">{viewProduct.stock || 0} units</p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-black/40 border border-[#D9C27B]/20 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-2">Category</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#D9C27B]/20 text-[#D9C27B] rounded-full text-sm font-medium">
                      {viewProduct.category}
                    </span>
                  </div>
                </div>

                <div className="bg-black/40 border border-[#D9C27B]/20 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-2">Subcategory</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium">
                      {viewProduct.subCategory}
                    </span>
                  </div>
                </div>

                <div className="bg-black/40 border border-[#D9C27B]/20 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-2">Gender</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                      {viewProduct.gender}
                    </span>
                  </div>
                </div>

                {viewProduct.size && viewProduct.size > 0 && (
                  <div className="bg-black/40 border border-[#D9C27B]/20 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-2">Size</p>
                    <p className="text-white font-semibold text-lg">{viewProduct.size} ml/g</p>
                  </div>
                )}

                <div className="bg-black/40 border border-[#D9C27B]/20 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-2">Total Value</p>
                  <p className="text-white font-semibold text-lg">₹{(viewProduct.price * (viewProduct.stock || 0)).toLocaleString()}</p>
                </div>

                <div className="bg-black/40 border border-[#D9C27B]/20 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-2">Product ID</p>
                  <p className="text-white font-mono text-xs break-all">{viewProduct._id}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-[#D9C27B]/20">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleEditProduct(viewProduct);
                  }}
                  className="flex-1 px-6 py-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
                >
                  <FaEdit /> Edit Product
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Category Management Modal */}
        <CategoryManagementModal
          show={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          mode={managementMode}
          categoryFormData={categoryFormData}
          setCategoryFormData={setCategoryFormData}
          categoryOptions={categoryOptions}
          subCategoryOptions={subCategoryOptions}
          onSubmit={handleCategorySubmit}
        />
      </div>
    </div>
  );
};

export default Inventory;
