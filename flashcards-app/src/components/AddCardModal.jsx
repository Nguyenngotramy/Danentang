// components/AddCardModal.js
import React, { useState, useEffect } from 'react';

const AddCardModal = ({ isOpen, onClose, onSave, editingCard }) => {
  const [formData, setFormData] = useState({
    front: '',
    back: '',
    category: ''
  });

  useEffect(() => {
    if (editingCard) {
      setFormData({
        front: editingCard.front,
        back: editingCard.back,
        category: editingCard.category
      });
    } else {
      setFormData({ front: '', back: '', category: '' });
    }
  }, [editingCard]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.front.trim() && formData.back.trim() && formData.category.trim()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {editingCard ? 'Chỉnh sửa Flash Card' : 'Thêm Flash Card Mới'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mặt trước (Tiếng Anh)
            </label>
            <input
              type="text"
              value={formData.front}
              onChange={(e) => handleInputChange('front', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Nhập từ tiếng Anh..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mặt sau (Tiếng Việt)
            </label>
            <input
              type="text"
              value={formData.back}
              onChange={(e) => handleInputChange('back', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Nhập nghĩa tiếng Việt..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Ví dụ: Greetings, Technology..."
              required
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              {editingCard ? 'Cập nhật' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;