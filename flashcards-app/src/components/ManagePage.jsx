// components/ManagePage.js
import React from 'react';
import { Plus } from 'lucide-react';
import BackButton from './ui/BackButton';
import CardItem from './CardItem';

const ManagePage = ({ 
  flashCards, 
  onBack, 
  onEdit, 
  onDelete, 
  onToggleLearned, 
  onShowAddForm 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <BackButton onClick={onBack} />
          <h2 className="text-2xl font-bold text-gray-800">Quản lý Flash Card</h2>
          <button
            onClick={onShowAddForm}
            className="bg-emerald-500 text-white rounded-full p-3 shadow-lg hover:bg-emerald-600 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Empty state */}
        {flashCards.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Chưa có flash card nào
            </h3>
            <p className="text-gray-500 mb-6">
              Hãy thêm flash card đầu tiên để bắt đầu
            </p>
            <button
              onClick={onShowAddForm}
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Thêm flash card đầu tiên
            </button>
          </div>
        ) : (
          /* Cards List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashCards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                onEdit={() => onEdit(card)}
                onDelete={() => onDelete(card.id)}
                onToggleLearned={() => onToggleLearned(card.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePage;