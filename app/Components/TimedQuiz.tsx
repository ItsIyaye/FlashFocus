

// 'use client';

// import { useEffect, useState } from "react";

// // Utility to save quiz result to localStorage
// function saveQuizResult(result) {
//   const existing = JSON.parse(localStorage.getItem("quizHistory") || "[]");
//   existing.unshift(result); // Add new result at beginning
//   localStorage.setItem("quizHistory", JSON.stringify(existing));
// }

// export default function TimedQuiz({ flashcards, duration, onEnd }) {
//   const [timeLeft, setTimeLeft] = useState(duration);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [isOver, setIsOver] = useState(false);

//   const currentCard = flashcards[currentIndex];

//   // Finish the quiz and save result
//   const finishQuiz = () => {
//     setIsOver(true);

//     const result = {
//       score,
//       total: flashcards.length,
//       timeLeft,
//       date: new Date().toISOString(),
//     };

//     saveQuizResult(result);
//     onEnd?.(score);
//   };

//   // Timer and end check
//   useEffect(() => {
//     if (isOver) return;

//     if (timeLeft <= 0 || currentIndex >= flashcards.length) {
//       finishQuiz();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, currentIndex, isOver]);

//   const handleAnswer = (option) => {
//     if (option === currentCard.answer) {
//       setScore(prev => prev + 1);
//     }

//     if (currentIndex + 1 < flashcards.length) {
//       setCurrentIndex(prev => prev + 1);
//     } else {
//       finishQuiz();
//     }
//   };

//   if (isOver) {
//     return (
//       <div className="text-center mt-10">
//         <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
//         <p className="text-lg">Your Score: {score} / {flashcards.length}</p>
//         <p className="text-sm text-gray-600">Time Left: {timeLeft} seconds</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded shadow p-6">
//       {/* Progress */}
//       <div className="mb-4 text-sm text-gray-600 flex justify-between">
//         <span>Question {currentIndex + 1} of {flashcards.length}</span>
//         <span>Time Left: {timeLeft}s</span>
//       </div>
//       <h3 className="text-xl font-bold my-4">{currentCard.question}</h3>
//       <div className="grid gap-2">
//         {currentCard.options.map((option, idx) => (
//           <button
//             key={idx}
//             onClick={() => handleAnswer(option)}
//             className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from "react";
import confetti from "canvas-confetti"; // 🎉 add this

// Utility to save quiz result to localStorage
function saveQuizResult(result) {
  const existing = JSON.parse(localStorage.getItem("quizHistory") || "[]");
  existing.unshift(result); 
  localStorage.setItem("quizHistory", JSON.stringify(existing));
}

export default function TimedQuiz({ flashcards, duration, onEnd }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isOver, setIsOver] = useState(false);

  const currentCard = flashcards[currentIndex];

  // Finish the quiz and save result
  const finishQuiz = () => {
    setIsOver(true);

    // ✅ ensure we use the latest score value
    setScore(prevScore => {
      const finalScore = prevScore;
      const result = {
        score: finalScore,
        total: flashcards.length,
        timeLeft,
        date: new Date().toISOString(),
      };

      saveQuizResult(result);
      onEnd?.(finalScore);

      // 🎉 trigger confetti if score >= half
      if (finalScore >= flashcards.length / 2) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      return finalScore;
    });
  };

  // Timer and end check
  useEffect(() => {
    if (isOver) return;

    if (timeLeft <= 0 || currentIndex >= flashcards.length) {
      finishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentIndex, isOver]);

  const handleAnswer = (option) => {
    if (option === currentCard.answer) {
      setScore(prev => prev + 1);
    }

    if (currentIndex + 1 < flashcards.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  if (isOver) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-lg">Your Score: {score} / {flashcards.length}</p>
        <p className="text-sm text-gray-600">Time Left: {timeLeft} seconds</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow p-6">
      {/* Progress */}
      <div className="mb-4 text-sm text-gray-600 flex justify-between">
        <span>Question {currentIndex + 1} of {flashcards.length}</span>
        <span>Time Left: {timeLeft}s</span>
      </div>
      <h3 className="text-xl font-bold my-4">{currentCard.question}</h3>
      <div className="grid gap-2">
        {currentCard.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option)}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
