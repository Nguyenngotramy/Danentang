// components/FlashCard.js
import React from 'react';

const FlashCard = ({ card, isFlipped, onFlip }) => {
  return (
    <div className="perspective-1000 mb-8">
      <div
        className={`relative w-full h-80 cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={onFlip}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 h-full flex flex-col items-center justify-center text-center">
            <div className="text-sm text-emerald-600 font-medium mb-4 bg-emerald-50 px-3 py-1 rounded-full">
              {card.category}
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-4">
              {card.front}
            </div>
            <div className="text-gray-500 text-sm">Nhấp để xem nghĩa</div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-8 h-full flex flex-col items-center justify-center text-center text-white">
            <div className="text-sm text-emerald-100 font-medium mb-4 bg-white/20 px-3 py-1 rounded-full">
              {card.category}
            </div>
            <div className="text-4xl font-bold mb-4">
              {card.back}
            </div>
            <div className="text-emerald-100 text-sm">Nhấp để quay lại</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;