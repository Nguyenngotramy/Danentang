// components/CardItem.js
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const CardItem = ({ card, onEdit, onDelete, onToggleLearned }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
          {card.category}
        </span>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded hover:bg-blue-50"
            title="Chỉnh sửa"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition-colors p-1 rounded hover:bg-red-50"
            title="Xóa"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="text-lg font-semibold text-gray-800 mb-2">{card.front}</div>
      <div className="text-gray-600 mb-3">{card.back}</div>
      
      <button
        onClick={onToggleLearned}
        className={`w-full rounded-lg py-2 text-sm font-medium transition-colors ${
          card.learned
            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {card.learned ? 'Đã học' : 'Chưa học'}
      </button>
    </div>
  );
};

export default CardItem;