

// 'use client';

// import { useEffect, useState } from 'react';
// import TimedQuiz from './TimedQuiz';
// import axios from 'axios';
// import confetti from 'canvas-confetti';

// export default function TimedQuizClient() {
//   const [flashcards, setFlashcards] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const decode = (str) => {
//       const txt = document.createElement("textarea");
//       txt.innerHTML = str;
//       return txt.value;
//     };

//     axios
//       .get('https://opentdb.com/api.php', {
//         params: {
//           amount: 10,
//           category: 9, // General Knowledge
//           type: 'multiple'
//         }
//       })
//       .then(res => {
//         const cards = res.data.results.map((item, index) => {
//           const answer = decode(item.correct_answer);
//           const options = [...item.incorrect_answers.map(decode), answer].sort(() => Math.random() - 0.5);
//           return {
//             id: `${index}-${Date.now()}`,
//             question: decode(item.question),
//             answer,
//             options
//           };
//         });
//         setFlashcards(cards);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const handleEnd = (score) => {
//     const total = flashcards.length;
//     // alert(`Quiz completed. You scored ${score}/${total}!`);

//     // 🎉 Trigger animation if score is at least half
//     if (score >= total / 2) {
//       confetti({
//         particleCount: 200,
//         spread: 70,
//         origin: { y: 0.6 }
//       });
//     }
//   };

//   if (loading) {
//     return <p className="text-center">Loading quiz...</p>;
//   }

//   return (
//     <TimedQuiz
//       flashcards={flashcards}
//       duration={60}
//       onEnd={handleEnd}
//     />
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import TimedQuiz, { Flashcard } from './TimedQuiz'; // <-- import the interface

// Props of TimedQuiz already define Flashcard type

export default function TimedQuizClient() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const decode = (str: string): string => {
      const txt = document.createElement('textarea');
      txt.innerHTML = str;
      return txt.value;
    };

    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: 10,
          category: 9, // General Knowledge
          type: 'multiple',
        },
      })
      .then((res) => {
        const cards: Flashcard[] = res.data.results.map(
          (item: {
            question: string;
            correct_answer: string;
            incorrect_answers: string[];
          }, index: number) => {
            const answer = decode(item.correct_answer);
            const options = [...item.incorrect_answers.map(decode), answer].sort(
              () => Math.random() - 0.5,
            );
            return {
              id: `${index}-${Date.now()}`,
              question: decode(item.question),
              answer,
              options,
            };
          },
        );
        setFlashcards(cards);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleEnd = (score: number): void => {
    const total = flashcards.length;

    // 🎉 show confetti if at least half correct
    if (score >= total / 2) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  if (loading) {
    return <p className="text-center">Loading quiz...</p>;
  }

  return (
    <TimedQuiz
      flashcards={flashcards}
      duration={60}
      onEnd={handleEnd}
    />
  );
}
