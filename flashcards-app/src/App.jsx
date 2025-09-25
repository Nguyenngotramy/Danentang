// App.js
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import StudyPage from './components/StudyPage';
import ManagePage from './components/ManagePage';
import AddCardModal from './components/AddCardModal';
import { useFlashCards } from './hooks/useFlashCards';
import './styles/global.css';

const App = () => {
  const {
    flashCards,
    addCard,
    updateCard,
    deleteCard,
    toggleLearned,
    getStats
  } = useFlashCards();

  const [currentView, setCurrentView] = useState('home');
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCard(null);
  };

  const handleSaveCard = (cardData) => {
    if (editingCard) {
      updateCard(editingCard.id, cardData);
    } else {
      addCard(cardData);
    }
    handleCloseForm();
  };

  const stats = getStats();

  return (
    <>
      {currentView === 'home' && (
        <HomePage 
          stats={stats}
          onNavigate={setCurrentView}
          onShowAddForm={() => setShowForm(true)}
        />
      )}
      
      {currentView === 'study' && (
        <StudyPage 
          flashCards={flashCards}
          onBack={() => setCurrentView('home')}
          onToggleLearned={toggleLearned}
          stats={stats}
        />
      )}
      
      {currentView === 'manage' && (
        <ManagePage 
          flashCards={flashCards}
          onBack={() => setCurrentView('home')}
          onEdit={handleEditCard}
          onDelete={deleteCard}
          onToggleLearned={toggleLearned}
          onShowAddForm={() => setShowForm(true)}
        />
      )}

      {showForm && (
        <AddCardModal
          isOpen={showForm}
          onClose={handleCloseForm}
          onSave={handleSaveCard}
          editingCard={editingCard}
        />
      )}
    </>
  );
};

export default App;