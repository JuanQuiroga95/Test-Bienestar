"use client";

import { useState } from "react";

export default function QuestionCard({ question, questionIndex, onAnswer, selectedAnswer }) {
  const [animDir, setAnimDir] = useState("enter");

  return (
    <div
      className={`w-full max-w-md mx-auto animate-slideUp`}
      key={question.id}
    >
      {/* Question number badge */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-900/30">
          {question.id}
        </div>
        {question.type === "curso" && (
          <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full font-medium border border-indigo-500/30">
            No suma puntaje
          </span>
        )}
      </div>

      {/* Question text */}
      <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-2">
        {question.text}
      </h2>
      {question.subtitle && (
        <p className="text-sm text-indigo-300/70 mb-6">{question.subtitle}</p>
      )}
      {!question.subtitle && <div className="mb-6" />}

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          return (
            <button
              key={idx}
              id={`option-q${question.id}-${option.label}`}
              onClick={() => onAnswer(idx)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden ${
                isSelected
                  ? "border-violet-400 bg-violet-500/20 shadow-lg shadow-violet-900/20"
                  : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
              }`}
            >
              {/* Background glow on selected */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 animate-pulse" />
              )}

              <div className="relative flex items-center gap-4">
                {/* Option label (A, B, C...) */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md"
                      : "bg-white/10 text-white/60 group-hover:bg-white/15 group-hover:text-white/80"
                  }`}
                >
                  {option.label}
                </div>

                {/* Option text */}
                <span
                  className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                    isSelected ? "text-white" : "text-white/70 group-hover:text-white/90"
                  }`}
                >
                  {option.text}
                </span>

                {/* Check mark */}
                {isSelected && (
                  <div className="ml-auto shrink-0 animate-scaleIn">
                    <svg
                      className="w-6 h-6 text-violet-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
