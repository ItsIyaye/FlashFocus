'use client';

import { useEffect, useState } from 'react';
import EditableFlashCardList, { Flashcard } from '../Components/EditableFlashCardList';
import FlashCardModal from '../Components/FlashCardModal';

export default function MyCardsPage() {
  const [myCards, setMyCards] = useState<Flashcard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load saved cards from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('userFlashcards') || '[]') as Flashcard[];
      setMyCards(saved);
    } catch (err) {
      console.error('Failed to load flashcards:', err);
    }
  }, []);

  // Save updated list to localStorage
  const persistCards = (cards: Flashcard[]) => {
    setMyCards(cards);
    localStorage.setItem('userFlashcards', JSON.stringify(cards));
  };

  const handleDelete = (id: string) => {
    persistCards(myCards.filter(card => card.id !== id));
  };

  const handleEdit = (card: Flashcard) => {
    const question = prompt('Edit question', card.question) ?? card.question;
    const answer = prompt('Edit answer', card.answer) ?? card.answer;
    const optsRaw = prompt('Edit options (comma-separated)', card.options.join(', '));

    const updated: Flashcard = {
      ...card,
      question,
      answer,
      options: optsRaw ? optsRaw.split(',').map(o => o.trim()) : card.options,
    };

    persistCards(myCards.map(c => (c.id === card.id ? updated : c)));
  };

  const handleCreate = (newCard: Flashcard) => {
    persistCards([...myCards, newCard]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Flashcards</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Flashcard
        </button>
      </div>

      {myCards.length === 0 ? (
        <p className="text-gray-600">You have no saved flashcards yet.</p>
      ) : (
        <EditableFlashCardList
          flashcards={myCards}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {isModalOpen && (
  <FlashCardModal
    isOpen={isModalOpen}        // ✅ pass isOpen
    onClose={() => setIsModalOpen(false)}
    onSave={handleCreate}
  />
)}

    </div>
  );
}
