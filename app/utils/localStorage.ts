// utils/localStorage.ts

export function getCustomFlashcards() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("flashcards");
  try {
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
