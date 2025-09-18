"use client";
import { useState } from "react";

// LocalStorage helpers
function getCustomFlashcards() {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("customFlashcards");
  return stored ? JSON.parse(stored) : [];
}

function saveCustomFlashcards(flashcards) {
  if (typeof window !== "undefined") {
    localStorage.setItem("customFlashcards", JSON.stringify(flashcards));
  }
}

export default function FlashCardModal({ isOpen, onClose, onCreate }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [setName, setSetName] = useState("");
  const [error, setError] = useState("");

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      const updated = options.filter((_, i) => i !== index);
      setOptions(updated);
      if (answer === options[index]) {
        setAnswer(""); // Clear if removed
      }
    }
  };

  const isValid = () => {
    if (!question.trim() || !answer.trim() || options.length < 2 || options.some(opt => !opt.trim())) {
      setError("Fill out the question, at least two options, and a valid answer.");
      return false;
    }
    if (!options.includes(answer)) {
      setError("Answer must be one of the provided options.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) return;

    const newCard = {
      id: Date.now(),
      question: question.trim(),
      answer: answer.trim(),
      options: options.map(opt => opt.trim()),
      set: setName.trim(),
      custom: true
    };

    const existing = getCustomFlashcards();
    const updated = [newCard, ...existing];
    saveCustomFlashcards(updated);

    onCreate(newCard);
    setQuestion(""); setAnswer(""); setOptions(["", ""]); setSetName(""); setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Create Flashcard</h2>
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Create Flashcard Form">

          <div>
            <label className="block text-sm font-medium mb-1">Set / Folder Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Question</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Options</label>
            <div className="space-y-2">
              {options.map((opt, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="flex-1 border p-2 rounded"
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const updated = [...options];
                      updated[idx] = e.target.value;
                      setOptions(updated);
                    }}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(idx)}
                      className="text-red-500 hover:text-red-600 text-sm"
                      aria-label={`Remove option ${idx + 1}`}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {options.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="text-blue-600 text-sm underline hover:text-blue-800"
                >
                  + Add Option
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correct Answer</label>
            <select
              className="w-full border p-2 rounded"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            >
              <option value="">Select correct answer</option>
              {options.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt || `Option ${idx + 1}`}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={!question || options.some(o => !o) || !answer}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
