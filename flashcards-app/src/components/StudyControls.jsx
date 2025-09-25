// components/StudyControls.js
import React from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';

const StudyControls = ({ 
  onPrev, 
  onNext, 
  onFlip, 
  onToggleLearned, 
  isLearned 
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <button
        onClick={onPrev}
        className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg hover:shadow-xl transition-all"
        title="Thẻ trước"
      >
        ←
      </button>
      
      <button
        onClick={onToggleLearned}
        className={`rounded-full p-4 shadow-lg hover:shadow-xl transition-all ${
          isLearned 
            ? 'bg-emerald-500 text-white' 
            : 'bg-white/80 backdrop-blur-sm text-gray-600'
        }`}
        title={isLearned ? 'Đánh dấu chưa học' : 'Đánh dấu đã học'}
      >
        <CheckCircle className="w-6 h-6" />
      </button>

      <button
        onClick={onFlip}
        className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg hover:shadow-xl transition-all"
        title="Lật thẻ"
      >
        <RotateCcw className="w-6 h-6" />
      </button>

      <button
        onClick={onNext}
        className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg hover:shadow-xl transition-all"
        title="Thẻ tiếp theo"
      >
        →
      </button>
    </div>
  );
};

export default StudyControls;