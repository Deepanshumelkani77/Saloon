import React from 'react';
import { FaTimes, FaCheck, FaPlus, FaTrash } from 'react-icons/fa';

const CategoryManagementModal = ({ 
  show, 
  onClose, 
  mode, 
  categoryFormData, 
  setCategoryFormData, 
  categoryOptions, 
  subCategoryOptions,
  onSubmit 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-[#D9C27B]/50 rounded-3xl max-w-2xl w-full shadow-2xl">
        {/* Modal Header */}
        <div className="border-b border-[#D9C27B]/30 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${mode === 'add' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}>
              {mode === 'add' ? <FaPlus className="text-white text-xl" /> : <FaTrash className="text-white text-xl" />}
            </div>
            <h2 className="text-2xl font-bold text-white">
              {mode === 'add' ? 'Add Category/Subcategory' : 'Delete Category/Subcategory'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#D9C27B] p-2 rounded-lg hover:bg-[#D9C27B]/10 transition-all duration-200"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          <div className="bg-[#D9C27B]/10 border border-[#D9C27B]/30 rounded-xl p-4">
            <p className="text-gray-300 text-sm">
              {mode === 'add' 
                ? '• To add a new category: Enter category name only\n• To add a subcategory: Select category and enter subcategory name'
                : '• To delete a category: Select category only (will delete all subcategories)\n• To delete a subcategory: Select both category and subcategory'}
            </p>
          </div>

          <div className="space-y-4">
            {/* Category Input/Select */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                {mode === 'add' ? 'Category Name' : 'Select Category'}
              </label>
              {mode === 'add' ? (
                <input
                  type="text"
                  value={categoryFormData.category}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, category: e.target.value })}
                  placeholder="Enter new category name"
                  className="w-full px-4 py-3 bg-black/60 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-all"
                />
              ) : (
                <select
                  value={categoryFormData.category}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, category: e.target.value, subCategory: '' })}
                  className="w-full px-4 py-3 bg-black/60 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-all"
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Subcategory Input/Select */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Subcategory {mode === 'add' ? '(Optional)' : '(Optional - leave empty to delete entire category)'}
              </label>
              {mode === 'add' ? (
                <input
                  type="text"
                  value={categoryFormData.subCategory}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, subCategory: e.target.value })}
                  placeholder="Enter subcategory name (optional)"
                  className="w-full px-4 py-3 bg-black/60 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-all"
                  disabled={!categoryFormData.category}
                />
              ) : (
                <select
                  value={categoryFormData.subCategory}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, subCategory: e.target.value })}
                  className="w-full px-4 py-3 bg-black/60 border border-[#D9C27B]/30 rounded-xl text-white focus:outline-none focus:border-[#D9C27B] transition-all"
                  disabled={!categoryFormData.category}
                >
                  <option value="">Select a subcategory (optional)</option>
                  {categoryFormData.category && subCategoryOptions[categoryFormData.category]?.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FaTimes />
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={!categoryFormData.category}
              className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                mode === 'add' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/30' 
                  : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/30'
              }`}
            >
              {mode === 'add' ? <FaPlus /> : <FaTrash />}
              {mode === 'add' ? 'Add' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagementModal;
