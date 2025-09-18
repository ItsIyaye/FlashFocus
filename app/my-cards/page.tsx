



// // File: app/my-cards/page.jsx
// "use client";
// import { useEffect, useState } from "react";
// import EditableFlashCardList from "../Components/EditableFlashCardList";

// export default function MyCardsPage() {
//   const [cards, setCards] = useState([]);
//   const [selectedSet, setSelectedSet] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editCard, setEditCard] = useState(null);
//   const [newCard, setNewCard] = useState({
//     set: "",
//     question: "",
//     options: ["", "", "", ""],
//     answer: ""
//   });

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("myFlashcards") || "[]");
//     setCards(saved);
//   }, []);

//   const sets = [...new Set(cards.map(card => card.set || "No Set"))];
//   const filteredCards = selectedSet ? cards.filter(c => c.set === selectedSet) : cards;

//   function handleDelete(id) {
//     const updated = cards.filter(c => c.id !== id);
//     setCards(updated);
//     localStorage.setItem("myFlashcards", JSON.stringify(updated));
//   }

//   function openModal(card = null) {
//     if (card) {
//       setNewCard({ set: card.set || "", question: card.question, options: card.options, answer: card.answer });
//       setEditCard(card);
//     } else {
//       setNewCard({ set: "", question: "", options: ["", "", "", ""], answer: "" });
//       setEditCard(null);
//     }
//     setShowModal(true);
//   }

//   function handleSave() {
//   const { question, options, answer, set } = newCard;

//   const filledOptions = options.filter(o => o.trim() !== "");

//   if (!question || filledOptions.length < 2 || !answer) {
//     alert("Please provide a question, at least 2 options, and a correct answer.");
//     return;
//   }

//   if (!filledOptions.includes(answer)) {
//     alert("The selected answer must be one of the filled options.");
//     return;
//   }

//   const finalOptions = [...filledOptions];

//   if (editCard) {
//     const updated = cards.map(c =>
//       c.id === editCard.id ? { ...editCard, question, options: finalOptions, answer, set } : c
//     );
//     setCards(updated);
//     localStorage.setItem("myFlashcards", JSON.stringify(updated));
//   } else {
//     const newFlashcard = {
//       id: `custom-${Date.now()}`,
//       question,
//       options: finalOptions,
//       answer,
//       set,
//       custom: true
//     };
//     const updated = [newFlashcard, ...cards];
//     setCards(updated);
//     localStorage.setItem("myFlashcards", JSON.stringify(updated));
//   }

//   setNewCard({ set: "", question: "", options: ["", "", "", ""], answer: "" });
//   setEditCard(null);
//   setShowModal(false);
// }


//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Your Created Flashcards</h1>
//         <button
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           onClick={() => openModal()}
//         >
//           + Create New
//         </button>
//       </div>

//       {sets.length > 1 && (
//         <select
//           className="border p-2 rounded mb-4"
//           value={selectedSet}
//           onChange={(e) => setSelectedSet(e.target.value)}
//         >
//           <option value="">All Sets</option>
//           {sets.map((setName, idx) => (
//             <option key={idx} value={setName}>{setName}</option>
//           ))}
//         </select>
//       )}

//       {filteredCards.length > 0 ? (
//         <EditableFlashCardList flashcards={filteredCards} onEdit={openModal} onDelete={handleDelete} />
//       ) : (
//         <p className="text-center text-gray-500">No flashcards found.</p>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl">
//             <h2 className="text-xl font-bold">
//               {editCard ? "Edit Flashcard" : "Create New Flashcard"}
//             </h2>

//             <input type="text" placeholder="Set / Folder Name" className="w-full border p-2 rounded"
//               value={newCard.set} onChange={(e) => setNewCard({ ...newCard, set: e.target.value })} />

//             <input type="text" placeholder="Question" className="w-full border p-2 rounded"
//               value={newCard.question} onChange={(e) => setNewCard({ ...newCard, question: e.target.value })} />

//             {newCard.options.map((opt, idx) => (
//               <input key={idx} type="text" placeholder={`Option ${idx + 1}`} className="w-full border p-2 rounded"
//                 value={opt} onChange={(e) => {
//                   const updated = [...newCard.options];
//                   updated[idx] = e.target.value;
//                   setNewCard({ ...newCard, options: updated });
//                 }} />
//             ))}

//             <select className="w-full border p-2 rounded" value={newCard.answer}
//               onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}>
//               <option value="">Select correct answer</option>
//               {newCard.options.map((opt, idx) => (
//                 <option key={idx} value={opt}>{opt}</option>
//               ))}
//             </select>

//             <div className="flex justify-end gap-2">
//               <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>Cancel</button>
//               <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleSave}>
//                 {editCard ? "Update" : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// File: app/my-cards/page.jsx
"use client";
import { useEffect, useState } from "react";
import EditableFlashCardList from "../Components/EditableFlashCardList";

export default function MyCardsPage() {
  const [cards, setCards] = useState([]);
  const [selectedSet, setSelectedSet] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [newCard, setNewCard] = useState({
    set: "",
    question: "",
    options: ["", "", "", ""],
    answer: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myFlashcards") || "[]");
    setCards(saved);
  }, []);

  const sets = [...new Set(cards.map(card => card.set || "No Set"))];
  const filteredCards = selectedSet ? cards.filter(c => c.set === selectedSet) : cards;

  function handleDelete(id) {
    const updated = cards.filter(c => c.id !== id);
    setCards(updated);
    localStorage.setItem("myFlashcards", JSON.stringify(updated));
  }

  function openModal(card = null) {
    if (card) {
      setNewCard({
        set: card.set || "",
        question: card.question,
        options: card.options,
        answer: card.answer
      });
      setEditCard(card);
    } else {
      setNewCard({
        set: "",
        question: "",
        options: ["", "", "", ""],
        answer: ""
      });
      setEditCard(null);
    }
    setShowModal(true);
  }

  function handleSave() {
    const { question, options, answer, set } = newCard;
    const filledOptions = options.filter(o => o.trim() !== "");

    if (!question || filledOptions.length < 2 || !answer) {
      alert("Please provide a question, at least 2 options, and a correct answer.");
      return;
    }

    if (!filledOptions.includes(answer)) {
      alert("The selected answer must be one of the filled options.");
      return;
    }

    const finalOptions = [...filledOptions];

    if (editCard) {
      const updated = cards.map(c =>
        c.id === editCard.id
          ? { ...editCard, question, options: finalOptions, answer, set }
          : c
      );
      setCards(updated);
      localStorage.setItem("myFlashcards", JSON.stringify(updated));
    } else {
      const newFlashcard = {
        id: `custom-${Date.now()}`,
        question,
        options: finalOptions,
        answer,
        set,
        custom: true
      };
      const updated = [newFlashcard, ...cards];
      setCards(updated);
      localStorage.setItem("myFlashcards", JSON.stringify(updated));
    }

    setNewCard({ set: "", question: "", options: ["", "", "", ""], answer: "" });
    setEditCard(null);
    setShowModal(false);
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">My Flashcards</h1>
        <button
          onClick={() => openModal()}
          className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          + Create New Flashcard
        </button>
      </div>

      {sets.length > 1 && (
        <div className="mb-4">
          <select
            value={selectedSet}
            onChange={(e) => setSelectedSet(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Sets</option>
            {sets.map((setName, idx) => (
              <option key={idx} value={setName}>
                {setName}
              </option>
            ))}
          </select>
        </div>
      )}

      {filteredCards.length > 0 ? (
        <EditableFlashCardList flashcards={filteredCards} onEdit={openModal} onDelete={handleDelete} />
      ) : (
        <p className="text-center text-gray-500 mt-12">No flashcards found in this set.</p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-800">
              {editCard ? "Edit Flashcard" : "Create New Flashcard"}
            </h2>

            <input
              type="text"
              placeholder="Set / Folder Name"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newCard.set}
              onChange={(e) => setNewCard({ ...newCard, set: e.target.value })}
            />

            <input
              type="text"
              placeholder="Question"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newCard.question}
              onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
            />

            {newCard.options.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Option ${idx + 1}`}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={opt}
                onChange={(e) => {
                  const updated = [...newCard.options];
                  updated[idx] = e.target.value;
                  setNewCard({ ...newCard, options: updated });
                }}
              />
            ))}

            <select
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newCard.answer}
              onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
            >
              <option value="">Select correct answer</option>
              {newCard.options.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {editCard ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
