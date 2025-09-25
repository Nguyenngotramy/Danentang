// hooks/useFlashCards.js
import { useState } from 'react';

const initialCards = [
  { id: 1, front: 'Hello', back: 'Xin chào', category: 'Greetings', learned: false },
  { id: 2, front: 'Thank you', back: 'Cảm ơn', category: 'Greetings', learned: false },
  { id: 3, front: 'Computer', back: 'Máy tính', category: 'Technology', learned: true }
];

export const useFlashCards = () => {
  const [flashCards, setFlashCards] = useState(initialCards);

  const addCard = (cardData) => {
    const newCard = {
      id: Date.now(),
      front: cardData.front,
      back: cardData.back,
      category: cardData.category,
      learned: false
    };
    setFlashCards(cards => [...cards, newCard]);
  };

  const updateCard = (id, cardData) => {
    setFlashCards(cards => 
      cards.map(card => 
        card.id === id 
          ? { ...card, front: cardData.front, back: cardData.back, category: cardData.category }
          : card
      )
    );
  };

  const deleteCard = (id) => {
    setFlashCards(cards => cards.filter(card => card.id !== id));
  };

  const toggleLearned = (id) => {
    setFlashCards(cards => 
      cards.map(card =>
        card.id === id ? { ...card, learned: !card.learned } : card
      )
    );
  };

  const getStats = () => {
    const totalCards = flashCards.length;
    const learnedCards = flashCards.filter(card => card.learned).length;
    const progress = totalCards > 0 ? Math.round((learnedCards / totalCards) * 100) : 0;
    const categories = [...new Set(flashCards.map(card => card.category))];

    return {
      totalCards,
      learnedCards,
      progress,
      categories,
      remainingCards: totalCards - learnedCards
    };
  };

  return {
    flashCards,
    addCard,
    updateCard,
    deleteCard,
    toggleLearned,
    getStats
  };
};