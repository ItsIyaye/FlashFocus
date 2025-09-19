

'use client';

import { useEffect, useState } from 'react';
import EditableFlashCardList, {
  Flashcard,
} from '../Components/EditableFlashCardList';
import FlashCardModal from '../Components/FlashCardModal';

export default function MyCardsPage() {
  const [myCards, setMyCards] = useState<Flashcard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved =
      (JSON.parse(localStorage.getItem('userFlashcards') || '[]') as Flashcard[]);
    setMyCards(saved);
  }, []);

  const handleDelete = (id: string) => {
    const updated = myCards.filter((c) => c.id !== id);
    setMyCards(updated);
    localStorage.setItem('userFlashcards', JSON.stringify(updated));
  };

  const handleEdit = (card: Flashcard) => {
    const q = prompt('Edit question', card.question);
    const a = prompt('Edit answer', card.answer);
    const optsRaw = prompt(
      'Edit options (comma-separated)',
      card.options.join(', ')
    );

    const updated: Flashcard = {
      ...card,
      question: q || card.question,
      answer: a || card.answer,
      options: optsRaw
        ? optsRaw.split(',').map((o) => o.trim())
        : card.options,
    };

    const next = myCards.map((c) => (c.id === card.id ? updated : c));
    setMyCards(next);
    localStorage.setItem('userFlashcards', JSON.stringify(next));
  };

  const handleCreate = (newCard: Flashcard) => {
    const updated = [...myCards, newCard];
    setMyCards(updated);
    localStorage.setItem('userFlashcards', JSON.stringify(updated));
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
          onClose={() => setIsModalOpen(false)}
          onSave={handleCreate}
        />
      )}
    </div>
  );
}


