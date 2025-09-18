'use client';
import { useEffect, useState } from "react";
import { getQuizHistory } from "../utils/history";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = getQuizHistory();
    setHistory(saved.reverse()); // show latest first
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Quiz History</h1>
      {history.length === 0 ? (
        <p className="text-gray-600">No quiz history found.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((entry, index) => (
            <li key={index} className="p-4 bg-white rounded shadow">
              <p className="font-semibold">Score: {entry.score} / {entry.total}</p>
              <p>Time Left: {entry.timeLeft}s</p>
              <p className="text-gray-500 text-sm">Date: {new Date(entry.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
