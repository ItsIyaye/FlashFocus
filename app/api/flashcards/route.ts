// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   try {
//     const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
//     const data = await response.json();

//     const decode = (str: string) => {
//       return str.replace(/&quot;/g, '"')
//                 .replace(/&#039;/g, "'")
//                 .replace(/&amp;/g, '&')
//                 .replace(/&lt;/g, '<')
//                 .replace(/&gt;/g, '>');
//     };

//     const flashcards = data.results.map((q: any, index: number) => {
//       const answer = decode(q.correct_answer);
//       const options = [...q.incorrect_answers.map(decode), answer].sort(() => Math.random() - 0.5);
//       return {
//         id: `${index}-${Date.now()}`,
//         question: decode(q.question),
//         answer,
//         options,
//       };
//     });

//     return NextResponse.json(flashcards);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch flashcards" }, { status: 500 });
//   }
// }



// app/api/flashcards/route.ts  (or wherever you place it)

import { NextRequest, NextResponse } from "next/server";

// Type for each question returned by the API
interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

// Type for the final flashcard object
interface Flashcard {
  id: string;
  question: string;
  answer: string;
  options: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest) {
  try {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple",
      { cache: "no-store" } // avoid caching during dev
    );

    if (!res.ok) {
      throw new Error(`Trivia API error: ${res.status}`);
    }

    const data = await res.json();

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Unexpected API response format");
    }

    // Helper to decode HTML entities
    const decode = (str: string): string =>
      str
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

    const flashcards: Flashcard[] = data.results.map(
      (q: TriviaQuestion, index: number) => {
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

    return NextResponse.json(flashcards, { status: 200 });
  } catch (err) {
    console.error("Flashcard API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch flashcards" },
      { status: 500 }
    );
  }
}
