//  // File: Components/EditableFlashCardList.jsx
// "use client";
// import React from "react";

// export default function EditableFlashCardList({ flashcards, onEdit, onDelete }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {flashcards.map((flashcard) => (
//         <div key={flashcard.id} className="border rounded-lg p-4 shadow-sm bg-white">
//           <h2 className="text-lg font-semibold mb-2">{flashcard.question}</h2>
//           <ul className="space-y-1 mb-3">
//             {flashcard.options.map((opt, idx) => (
//               <li key={idx} className="bg-gray-100 p-2 rounded text-sm text-gray-800">
//                 {opt}
//               </li>
//             ))}
//           </ul>
//           <p className="text-green-700 font-medium mb-3">Answer: {flashcard.answer}</p>
//           <div className="flex gap-2">
//             {onEdit && (
//               <button
//                 onClick={() => onEdit(flashcard)}
//                 className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//             )}
//             {onDelete && (
//               <button
//                 onClick={() => onDelete(flashcard.id)}
//                 className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


'use client';
import React from 'react';

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  options: string[];
};

type EditableFlashCardListProps = {
  flashcards: Flashcard[];
  onEdit?: (card: Flashcard) => void;
  onDelete?: (id: string) => void;
};

export default function EditableFlashCardList({
  flashcards,
  onEdit,
  onDelete,
}: EditableFlashCardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {flashcards.map((flashcard) => (
        <div
          key={flashcard.id}
          className="border rounded-lg p-4 shadow-sm bg-white"
        >
          <h2 className="text-lg font-semibold mb-2">{flashcard.question}</h2>

          <ul className="space-y-1 mb-3">
            {flashcard.options.map((opt, idx) => (
              <li
                key={idx}
                className="bg-gray-100 p-2 rounded text-sm text-gray-800"
              >
                {opt}
              </li>
            ))}
          </ul>

          <p className="text-green-700 font-medium mb-3">
            Answer: {flashcard.answer}
          </p>

          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(flashcard)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(flashcard.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
