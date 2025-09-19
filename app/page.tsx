
// "use client";
// import { useState, useEffect, useRef } from "react";
// import FlipFlashCardList from "./Components/FlipFlashCardList";
// import FlashCardModal from "./Components/FlashCardModal";
// import Link from "next/link";
// import axios from "axios";

// export default function Home() {
//   const [flashcards, setFlashcards] = useState([]);
//   const [filteredCards, setFilteredCards] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [shuffle, setShuffle] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const categoryEl = useRef(null);
//   const amountEl = useRef(null);

//   useEffect(() => {
//     axios.get("https://opentdb.com/api_category.php").then((res) => {
//       const apiCategories = res.data.trivia_categories.map((cat) => ({
//         id: cat.id,
//         name: cat.name,
//       }));

//       const customFlashcards = JSON.parse(localStorage.getItem("myFlashcards") || "[]");
//       const customSets = [...new Set(customFlashcards.map((c) => c.set || "No Set"))].map(
//         (set) => ({
//           id: `custom-${set}`,
//           name: `Custom: ${set}`,
//         })
//       );

//       setCategories([...apiCategories, ...customSets]);
//     });
//   }, []);

//   useEffect(() => {
//     const filtered = flashcards.filter((card) =>
//       card.question.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredCards(shuffle ? [...filtered].sort(() => Math.random() - 0.5) : filtered);
//   }, [flashcards, search, shuffle]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     const selectedValue = categoryEl.current?.value;
//     const amount = amountEl.current?.value || 10;

//     if (!selectedValue) return;

//     if (selectedValue.startsWith("custom-")) {
//       const setName = selectedValue.replace("custom-", "");
//       const allCustom = JSON.parse(localStorage.getItem("myFlashcards") || "[]");
//       const filtered = allCustom.filter((card) => (card.set || "No Set") === setName);
//       setFlashcards(filtered);
//       return;
//     }

//     const decode = (str) => {
//       const txt = document.createElement("textarea");
//       txt.innerHTML = str;
//       return txt.value;
//     };

//     axios
//       .get("https://opentdb.com/api.php", {
//         params: {
//           amount,
//           category: selectedValue,
//         },
//       })
//       .then((res) => {
//         const newCards = res.data.results.map((questionItem, index) => {
//           const answer = decode(questionItem.correct_answer);
//           const options = [...questionItem.incorrect_answers.map(decode), answer];
//           return {
//             id: `${index}-${Date.now()}`,
//             question: decode(questionItem.question),
//             answer,
//             options: options.sort(() => Math.random() - 0.5),
//           };
//         });
//         setFlashcards(newCards);
//       });
//   }

//   function handleCreate(newCard) {
//     const existing = JSON.parse(localStorage.getItem("myFlashcards") || "[]");
//     const updated = [{ ...newCard, id: `custom-${Date.now()}`, custom: true }, ...existing];
//     localStorage.setItem("myFlashcards", JSON.stringify(updated));
//     setIsModalOpen(false);
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-4 space-y-6">
//       {/* Controls Section */}
//       <form
//         className="flex flex-col md:flex-row md:items-end gap-4"
//         onSubmit={handleSubmit}
//       >
//         <div className="flex-1">
//           <label htmlFor="category" className="block font-semibold mb-1">
//             Category
//           </label>
//           <select
//             id="category"
//             ref={categoryEl}
//             className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-400"
//           >
//             <option value="">Select Category</option>
//             {categories.map((category) => (
//               <option value={category.id} key={category.id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex-1">
//           <label htmlFor="amount" className="block font-semibold mb-1">
//             Number of Questions
//           </label>
//           <input
//             type="number"
//             id="amount"
//             min="1"
//             step="1"
//             defaultValue={10}
//             ref={amountEl}
//             className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-400"
//           />
//         </div>

//         <button className="h-10 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
//           Generate
//         </button>
//       </form>

//       {/* Actions */}
//       <div className="flex flex-wrap gap-2 justify-end">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
//         >
//           Create Flashcard
//         </button>
//         <button
//           onClick={() => setShuffle((prev) => !prev)}
//           className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
//         >
//           {shuffle ? "Unshuffle" : "Shuffle"}
//         </button>
//         <Link href="/my-cards">
//           <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
//             My Flashcards
//           </button>
//         </Link>
//         <Link href="/timed-quiz">
//           <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition">
//             Play Timed Quiz
//           </button>
//         </Link>
//         <Link href="/History">
//           <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-orange-700 transition">
//             Quiz History
//           </button>
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search questions..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
//       />

//       {/* Flashcards Section */}
//       <h1 className="text-center text-2xl font-bold mt-6">FlashFocus</h1>
//       {filteredCards.length > 0 ? (
//         <FlipFlashCardList flashcards={filteredCards} />
//       ) : (
//         <p className="text-center text-gray-500">
//           No flashcards found. Select a category or create some!
//         </p>
//       )}

//       {/* Create Modal */}
//       <FlashCardModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onCreate={handleCreate}
//       />
//     </div>
//   );
// }




'use client';
import { useState, useEffect, useRef } from 'react';
import FlipFlashCardList from './Components/FlipFlashCardList';
import FlashCardModal from './Components/FlashCardModal';
import Link from 'next/link';
import axios from 'axios';

// ------------------- Types -------------------
interface Flashcard {
  id: string;
  question: string;
  answer: string;
  options?: string[];
  set?: string;
  custom?: boolean;
}

interface Category {
  id: string | number;
  name: string;
}

// ------------------- Component -------------------
export default function Home() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState<string>('');
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const categoryEl = useRef<HTMLSelectElement | null>(null);
  const amountEl = useRef<HTMLInputElement | null>(null);

  // ---------- Load categories (API + custom) ----------
  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((res) => {
      const apiCategories: Category[] = res.data.trivia_categories.map(
        (cat: { id: number; name: string }) => ({
          id: cat.id,
          name: cat.name,
        })
      );

      const customFlashcards: Flashcard[] = JSON.parse(
        localStorage.getItem('myFlashcards') || '[]'
      );
      const customSets: Category[] = [
        ...new Set(customFlashcards.map((c) => c.set || 'No Set')),
      ].map((set) => ({
        id: `custom-${set}`,
        name: `Custom: ${set}`,
      }));

      setCategories([...apiCategories, ...customSets]);
    });
  }, []);

  // ---------- Filter & shuffle ----------
  useEffect(() => {
    const filtered = flashcards.filter((card) =>
      card.question.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCards(
      shuffle ? [...filtered].sort(() => Math.random() - 0.5) : filtered
    );
  }, [flashcards, search, shuffle]);

  // ---------- Handle form submit ----------
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const selectedValue = categoryEl.current?.value;
    const amount = amountEl.current?.value || '10';

    if (!selectedValue) return;

    // --- Custom flashcards ---
    if (selectedValue.startsWith('custom-')) {
      const setName = selectedValue.replace('custom-', '');
      const allCustom: Flashcard[] = JSON.parse(
        localStorage.getItem('myFlashcards') || '[]'
      );
      const filtered = allCustom.filter(
        (card) => (card.set || 'No Set') === setName
      );
      setFlashcards(filtered);
      return;
    }

    // --- API flashcards ---
    const decode = (str: string): string => {
      const txt = document.createElement('textarea');
      txt.innerHTML = str;
      return txt.value;
    };

    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount,
          category: selectedValue,
        },
      })
      .then((res) => {
        const newCards: Flashcard[] = res.data.results.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (q: any, index: number) => {
            const answer = decode(q.correct_answer);
            const options = [
              ...q.incorrect_answers.map(decode),
              answer,
            ].sort(() => Math.random() - 0.5);
            return {
              id: `${index}-${Date.now()}`,
              question: decode(q.question),
              answer,
              options,
            };
          }
        );
        setFlashcards(newCards);
      });
  }

  // ---------- Create new flashcard ----------
  function handleCreate(newCard: Flashcard): void {
    const existing: Flashcard[] = JSON.parse(
      localStorage.getItem('myFlashcards') || '[]'
    );
    const updated: Flashcard[] = [
      { ...newCard, id: `custom-${Date.now()}`, custom: true },
      ...existing,
    ];
    localStorage.setItem('myFlashcards', JSON.stringify(updated));
    setIsModalOpen(false);
  }

  // ------------------- Render -------------------
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Controls Section */}
      <form
        className="flex flex-col md:flex-row md:items-end gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex-1">
          <label htmlFor="category" className="block font-semibold mb-1">
            Category
          </label>
          <select
            id="category"
            ref={categoryEl}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="amount" className="block font-semibold mb-1">
            Number of Questions
          </label>
          <input
            type="number"
            id="amount"
            min={1}
            step={1}
            defaultValue={10}
            ref={amountEl}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <button className="h-10 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Generate
        </button>
      </form>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Create Flashcard
        </button>
        <button
          onClick={() => setShuffle((prev) => !prev)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
        >
          {shuffle ? 'Unshuffle' : 'Shuffle'}
        </button>
        <Link href="/my-cards">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
            My Flashcards
          </button>
        </Link>
        <Link href="/timed-quiz">
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition">
            Play Timed Quiz
          </button>
        </Link>
        <Link href="/History">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-orange-700 transition">
            Quiz History
          </button>
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search questions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
      />

      {/* Flashcards */}
      <h1 className="text-center text-2xl font-bold mt-6">FlashFocus</h1>
      {filteredCards.length > 0 ? (
        <FlipFlashCardList flashcards={filteredCards} />
      ) : (
        <p className="text-center text-gray-500">
          No flashcards found. Select a category or create some!
        </p>
      )}

      {/* Create Modal */}
      <FlashCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
