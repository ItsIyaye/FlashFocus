
// import React, { useState, useEffect, useRef } from 'react';

// export default function FlashCard({ flashcard }) {
//   const [flip, setFlip] = useState(false);
//   // const [height, setHeight] = useState('auto');
//   const [minHeight, setMinHeight] = useState(150);
  

//   const frontEl = useRef(null);
//   const backEl = useRef(null);
//   const resizeTimeout = useRef(null);

//   function setMaxHeight() {
//   const frontHeight = frontEl.current?.getBoundingClientRect().height || 0;
//   const backHeight = backEl.current?.getBoundingClientRect().height || 0;
//   const max = Math.max(frontHeight, backHeight, 200);
//   setMinHeight(`${max}px`);
// }


//   // Recalculate height on flashcard content change
//   useEffect(() => {
//     setMaxHeight();
//   }, [flashcard.question, flashcard.answer, flashcard.options]);

//   // Recalculate height when card is flipped
//   useEffect(() => {
//     setMaxHeight();
//   }, [flip]);

//   // Debounced resize listener
//   useEffect(() => {
//     const handleResize = () => {
//       clearTimeout(resizeTimeout.current);
//       resizeTimeout.current = setTimeout(setMaxHeight, 150);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div
//       className={`card ${flip ? 'flip' : ''}`}
//       style={{ minHeight}}
//       onClick={() => setFlip(!flip)}
//     >
//       <div className="front" ref={frontEl}>
//         <div className="question font-semibold mb-2 text-center">
//           {flashcard.question}
//         </div>
//         <div className="options space-y-2">
//           {flashcard.options.map((option, index) => (
//             <div className="option bg-gray-100 p-2 rounded shadow-sm text-sm text-gray-700" key={index}>
//               {option}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="back" ref={backEl}>
//         <p className="text-xl font-bold text-green-700 text-center">{flashcard.answer}</p>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from 'react';

export default function FlashCard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [minHeight, setMinHeight] = useState(150);

  const frontEl = useRef(null);
  const backEl = useRef(null);
  const resizeTimeout = useRef(null);

  function setMaxHeight() {
    const frontHeight = frontEl.current?.getBoundingClientRect().height || 0;
    const backHeight = backEl.current?.getBoundingClientRect().height || 0;
    const max = Math.max(frontHeight, backHeight, 280);
    setMinHeight(`${max}px`);
  }

  useEffect(() => {
    setMaxHeight();
  }, [flashcard.question, flashcard.answer, flashcard.options]);

  useEffect(() => {
    setMaxHeight();
  }, [flip]);

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(setMaxHeight, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ minHeight }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        <div className="question font-semibold mb-2 text-center">
          {flashcard.question}
        </div>
        <div className="options space-y-2">
          {flashcard.options.map((option, index) => (
            <div
              className="option bg-gray-100 p-2 rounded shadow-sm text-sm text-gray-700"
              key={index}
            >
              {option}
              {flashcard.custom && (
  <div className="flex justify-end gap-2 mt-2">
    <button
      className="text-sm text-blue-600 hover:underline"
      onClick={() => onEdit(flashcard)}
    >
      Edit
    </button>
    <button
      className="text-sm text-red-600 hover:underline"
      onClick={() => onDelete(flashcard.id)}
    >
      Delete
    </button>
  </div>
)}

            </div>
            
          ))}
        </div>
      </div>
      <div className="back" ref={backEl}>
        <p className="text-xl font-bold text-green-700 text-center">
          {flashcard.answer}
        </p>
      </div>
    </div>
  );
}
