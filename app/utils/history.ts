// utils/history.ts

export interface QuizResult {
  score: number;
  total: number;
  timeLeft: number;
  date: string; // ISO string
}

export function saveQuizResult(
  score: number,
  total: number,
  timeLeft: number
): void {
  const history: QuizResult[] = JSON.parse(
    localStorage.getItem('quizHistory') || '[]'
  );

  const entry: QuizResult = {
    score,
    total,
    timeLeft,
    date: new Date().toISOString(),
  };

  history.push(entry);
  localStorage.setItem('quizHistory', JSON.stringify(history));
}

export function getQuizHistory(): QuizResult[] {
  return JSON.parse(localStorage.getItem('quizHistory') || '[]') as QuizResult[];
}
