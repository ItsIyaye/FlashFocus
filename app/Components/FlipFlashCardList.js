// File: Components/FlashCardList.jsx
// "use client";
// import React from "react";

// export default function FlashCardList({ flashcards, onEdit, onDelete }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {flashcards.map(card => (
//         <div
//           key={card.id}
//           className="bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200"
//         >
//           <h2 className="text-lg font-bold mb-2">{card.question}</h2>

//           <ul className="space-y-1 mb-2">
//             {card.options.map((opt, idx) => (
//               <li
//                 key={idx}
//                 className={`p-2 rounded border ${
//                   opt === card.answer ? "bg-green-100 border-green-400" : "border-gray-200"
//                 }`}
//               >
//                 {opt}
//               </li>
//             ))}
//           </ul>

//           {card.set && (
//             <p className="text-xs text-gray-500 italic mb-2">Set: {card.set}</p>
//           )}

//           {(onEdit || onDelete) && (
//             <div className="flex justify-end gap-2">
//               {onEdit && (
//                 <button
//                   className="text-blue-500 hover:underline text-sm"
//                   onClick={() => onEdit(card)}
//                 >
//                   Edit
//                 </button>
//               )}
//               {onDelete && (
//                 <button
//                   className="text-red-500 hover:underline text-sm"
//                   onClick={() => onDelete(card.id)}
//                 >
//                   Delete
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// } 


// File: Components/FlipFlashCardList.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";

export default function FlipFlashCardList({ flashcards }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {flashcards.map((flashcard) => (
        <FlipFlashCard key={flashcard.id} flashcard={flashcard} />
      ))}
    </div>
  );
}

function FlipFlashCard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [minHeight, setMinHeight] = useState("150px");
  const frontEl = useRef(null);
  const backEl = useRef(null);

  function setMaxHeight() {
    const frontHeight = frontEl.current?.getBoundingClientRect().height || 0;
    const backHeight = backEl.current?.getBoundingClientRect().height || 0;
    const max = Math.max(frontHeight, backHeight, 280);
    setMinHeight(`${max}px`);
  }

  useEffect(() => {
    setMaxHeight();
  }, [flashcard.question, flashcard.answer, flashcard.options, flip]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(setMaxHeight, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative cursor-pointer perspective"
      style={{ minHeight }}
      onClick={() => setFlip(!flip)}
    >
      <div className={`transition-transform duration-500 transform-style-preserve-3d ${flip ? "rotateY-180" : ""} relative w-full h-full`}>
        <div
          ref={frontEl}
          className="absolute w-full h-full backface-hidden bg-white border p-4 rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold mb-2">{flashcard.question}</h2>
          <ul className="space-y-1">
            {flashcard.options.map((opt, idx) => (
              <li key={idx} className="bg-gray-100 p-2 rounded text-sm text-gray-800">
                {opt}
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={backEl}
          className="absolute w-full h-full backface-hidden rotateY-180 bg-green-100 border p-4 rounded-lg shadow-md flex items-center justify-center"
        >
          <p className="text-xl font-bold text-green-700 text-center">{flashcard.answer}</p>
        </div>
      </div>
    </div>
  );
}

// You may need to add these Tailwind utilities manually if not available:
// .perspective { perspective: 1000px; }
// .rotateY-180 { transform: rotateY(180deg); }
// .backface-hidden { backface-visibility: hidden; transform-style: preserve-3d; }
// .transform-style-preserve-3d { transform-style: preserve-3d; }
