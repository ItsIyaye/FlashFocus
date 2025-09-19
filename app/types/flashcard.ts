// app/types/flashcard.ts
export interface Flashcard {
  id: string;              // Use string everywhere for consistency
  question: string;
  answer: string;
  options: string[];
  set: string;
  custom: boolean;
}
