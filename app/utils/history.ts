export function saveQuizResult(score, total, timeLeft) {
  const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
  const entry = {
    score,
    total,
    timeLeft,
    date: new Date().toISOString(),
  };
  history.push(entry);
  localStorage.setItem("quizHistory", JSON.stringify(history));
}

export function getQuizHistory() {
  return JSON.parse(localStorage.getItem("quizHistory") || "[]");
}
