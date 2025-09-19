'use client';

import { useEffect, useState } from 'react';
import TimedQuiz from '../Components/TimedQuiz';
import { getCustomFlashcards } from '../utils/localStorage';
import type { Flashcard } from '../types/flashcard'; // <-- adjust the path if needed

export default function TimedQuizPage() {
  const [source, setSource] = useState<'custom' | 'api' | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory] = useState('Default');
  const [duration, setDuration] = useState(60);
  const [questionCount, setQuestionCount] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const loadFlashcards = async () => {
      setLoading(true);
      let cards: Flashcard[] = [];

      if (source === 'custom') {
        cards = getCustomFlashcards();
      } else if (source === 'api') {
        const res = await fetch('/api/flashcards');
        const data: Flashcard[] = await res.json();
        cards = data;
      }

      const filtered =
        selectedCategory === 'Default'
          ? cards
          : cards.filter((card: Flashcard) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (card.set || (card as any).category || '')
                .toLowerCase()
                .includes(selectedCategory.toLowerCase())
            );

      setFlashcards(filtered);
      setLoading(false);
    };

    if (source) loadFlashcards();
  }, [source, selectedCategory]);

  const handleStartQuiz = () => {
    if (flashcards.length === 0) {
      alert('No flashcards found. Try another source or category.');
      return;
    }
    setQuizStarted(true);
  };

  if (!source) {
    return (
      <div className="p-6 text-center max-w-lg mx-auto bg-white shadow rounded-xl mt-10">
        <h2 className="text-2xl font-bold mb-6">Timed Quiz</h2>
        <div className="space-y-4">
          {/* Uncomment if you want to allow custom flashcards */}
          {/* <button
            onClick={() => setSource('custom')}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Use My Flashcards
          </button> */}
          <button
            onClick={() => setSource('api')}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4" />
        <p>Loading flashcards...</p>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Quiz Settings</h2>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category dropdown is optional */}
          {/* <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              {getAvailableCategories().map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div> */}

          <div>
            <label className="block font-semibold mb-1">
              Quiz Duration (sec)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              min={10}
              step={10}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Number of Questions
            </label>
            <input
              type="number"
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}
              min={1}
              step={1}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
        </div>

        <button
          onClick={handleStartQuiz}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  const selectedFlashcards = flashcards.slice(0, questionCount);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <TimedQuiz
        flashcards={selectedFlashcards}
        duration={duration}
        onEnd={(score) =>
          alert(`Your Score: ${score} / ${selectedFlashcards.length}`)
        }
      />
    </div>
  );
}
