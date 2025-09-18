 // File: Components/EditableFlashCardList.jsx
"use client";
import React from "react";

export default function EditableFlashCardList({ flashcards, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {flashcards.map((flashcard) => (
        <div key={flashcard.id} className="border rounded-lg p-4 shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-2">{flashcard.question}</h2>
          <ul className="space-y-1 mb-3">
            {flashcard.options.map((opt, idx) => (
              <li key={idx} className="bg-gray-100 p-2 rounded text-sm text-gray-800">
                {opt}
              </li>
            ))}
          </ul>
          <p className="text-green-700 font-medium mb-3">Answer: {flashcard.answer}</p>
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


// File: app/my-cards/page.jsx
// "use client";
// import { useState, useEffect } from "react";
// import EditableFlashCardList from "../Components/EditableFlashCardList";
// import FlashCardModal from "../Components/FlashCardModal";

// export default function MyCardsPage() {
//   const [myCards, setMyCards] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const savedCards = JSON.parse(localStorage.getItem("userFlashcards")) || [];
//     setMyCards(savedCards);
//   }, []);

//   const handleDelete = (id) => {
//     const updatedCards = myCards.filter((card) => card.id !== id);
//     setMyCards(updatedCards);
//     localStorage.setItem("userFlashcards", JSON.stringify(updatedCards));
//   };

//   const handleEdit = (cardToEdit) => {
//     const updatedQuestion = prompt("Edit question", cardToEdit.question);
//     const updatedAnswer = prompt("Edit answer", cardToEdit.answer);
//     const updatedOptions = prompt(
//       "Edit options (comma-separated)",
//       cardToEdit.options.join(", ")
//     )
//       ?.split(",")
//       .map((opt) => opt.trim());

//     const updatedCard = {
//       ...cardToEdit,
//       question: updatedQuestion || cardToEdit.question,
//       answer: updatedAnswer || cardToEdit.answer,
//       options: updatedOptions || cardToEdit.options,
//     };

//     const updatedCards = myCards.map((card) =>
//       card.id === cardToEdit.id ? updatedCard : card
//     );
//     setMyCards(updatedCards);
//     localStorage.setItem("userFlashcards", JSON.stringify(updatedCards));
//   };

//   const handleCreate = (newCard) => {
//     const updatedCards = [...myCards, newCard];
//     setMyCards(updatedCards);
//     localStorage.setItem("userFlashcards", JSON.stringify(updatedCards));
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">My Flashcards</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Create New Flashcard
//         </button>
//       </div>

//       {myCards.length === 0 ? (
//         <p className="text-gray-600">You have no saved flashcards yet.</p>
//       ) : (
//         <EditableFlashCardList
//           flashcards={myCards}
//           onDelete={handleDelete}
//           onEdit={handleEdit}
//         />
//       )}

//       {isModalOpen && (
//         <FlashCardModal
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleCreate}
//         />
//       )}
//     </div>
//   );
// }
