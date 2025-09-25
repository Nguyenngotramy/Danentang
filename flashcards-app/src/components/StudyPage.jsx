// components/StudyPage.js
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import FlashCard from './FlashCard';
import StudyControls from './StudyControls';
import ProgressBar from './ui/ProgressBar';
import BackButton from './ui/BackButton';

const StudyPage = ({ flashCards, onBack, onToggleLearned, stats }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashCards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashCards.length) % flashCards.length);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleToggleLearned = () => {
    if (flashCards[currentCard]) {
      onToggleLearned(flashCards[currentCard].id);
    }
  };

  // Empty state
  if (flashCards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Chưa có flash card nào</h2>
          <p className="text-gray-500 mb-4">Hãy thêm một số flash card để bắt đầu học</p>
          <button
            onClick={onBack}
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const card = flashCards[currentCard];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <BackButton onClick={onBack} />
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">Học từ vựng</h2>
            <p className="text-gray-600">{currentCard + 1} / {flashCards.length}</p>
          </div>
          <div className="w-12 h-12"></div>
        </div>

        {/* Flash Card */}
        <FlashCard 
          card={card}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />

        {/* Controls */}
        <StudyControls
          onPrev={prevCard}
          onNext={nextCard}
          onFlip={handleFlip}
          onToggleLearned={handleToggleLearned}
          isLearned={card.learned}
        />

        {/* Progress */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center">
          <div className="text-sm text-gray-600 mb-2">
            Tiến độ: {stats.learnedCards}/{stats.totalCards} ({stats.progress}%)
          </div>
          <ProgressBar progress={stats.progress} />
        </div>
      </div>
    </div>
  );
};

export default StudyPage;