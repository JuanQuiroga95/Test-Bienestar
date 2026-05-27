"use client";

import { useState, useCallback } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import ResultScreen from "@/components/ResultScreen";
import { questions } from "@/data/questions";

export default function Home() {
  // Screen: "welcome" | "test" | "submitting" | "result"
  const [screen, setScreen] = useState("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [anio, setAnio] = useState(null);
  const [score, setScore] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = useCallback(() => {
    setScreen("test");
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setAnio(null);
    setScore(0);
  }, []);

  const handleAnswer = useCallback(
    (optionIndex) => {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = optionIndex;
      setAnswers(newAnswers);

      const question = questions[currentQuestion];

      // Store the year if it's the first question
      if (question.type === "curso") {
        setAnio(question.options[optionIndex].value);
      }
    },
    [answers, currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (answers[currentQuestion] === null) return;

    if (currentQuestion < questions.length - 1) {
      // Animate transition
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 200);
    } else {
      // Calculate score and submit
      handleSubmit();
    }
  }, [currentQuestion, answers]);

  const handlePrev = useCallback(() => {
    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1);
        setIsTransitioning(false);
      }, 200);
    }
  }, [currentQuestion]);

  const handleSubmit = async () => {
    // Calculate total score from questions 2-11 (index 1-10)
    let totalScore = 0;
    const scoredAnswers = [];

    for (let i = 1; i < questions.length; i++) {
      const question = questions[i];
      const answerIndex = answers[i];
      if (answerIndex !== null) {
        const pointValue = question.options[answerIndex].value;
        totalScore += pointValue;
        scoredAnswers.push(pointValue);
      }
    }

    setScore(totalScore);
    setScreen("submitting");

    // POST to API asynchronously
    try {
      await fetch("/api/respuestas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anio: anio,
          respuestas: scoredAnswers,
          puntajeTotal: totalScore,
        }),
      });
    } catch (error) {
      // Silent fail - the student still sees their result
      console.error("Error guardando respuesta:", error);
    }

    // Show result
    setScreen("result");
  };

  const handleRestart = useCallback(() => {
    setScreen("welcome");
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setAnio(null);
    setScore(0);
  }, []);

  // Welcome screen
  if (screen === "welcome") {
    return <WelcomeScreen onStart={handleStart} />;
  }

  // Result screen
  if (screen === "result") {
    return <ResultScreen score={score} onRestart={handleRestart} />;
  }

  // Submitting screen
  if (screen === "submitting") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center animate-fadeIn">
          <div className="text-5xl mb-4 animate-float">📊</div>
          <p className="text-white font-bold text-lg mb-2">Calculando tu resultado...</p>
          <p className="text-indigo-300/60 text-sm">Solo un momento</p>
        </div>
      </div>
    );
  }

  // Test screen
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswered = answers[currentQuestion] !== null;

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      {/* Progress */}
      <ProgressBar current={currentQuestion} total={questions.length} />

      {/* Question */}
      <div
        className={`flex-1 flex items-center justify-center transition-all duration-200 ${
          isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <QuestionCard
          question={question}
          questionIndex={currentQuestion}
          onAnswer={handleAnswer}
          selectedAnswer={answers[currentQuestion]}
        />
      </div>

      {/* Navigation buttons */}
      <div className="w-full max-w-md mx-auto mt-6 flex gap-3">
        {/* Back button */}
        {currentQuestion > 0 && (
          <button
            onClick={handlePrev}
            id="btn-prev-question"
            className="px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 font-medium transition-all duration-300 active:scale-95"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next / Submit button */}
        <button
          onClick={handleNext}
          disabled={!hasAnswered}
          id={isLastQuestion ? "btn-submit-test" : "btn-next-question"}
          className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-base transition-all duration-300 active:scale-[0.98] ${
            hasAnswered
              ? isLastQuestion
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-900/30"
                : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30"
              : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            {isLastQuestion ? "Ver mi resultado" : "Siguiente"}
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isLastQuestion ? "M5 13l4 4L19 7" : "M9 5l7 7-7 7"}
              />
            </svg>
          </span>
        </button>
      </div>

      {/* Bottom spacing for mobile */}
      <div className="h-6" />
    </div>
  );
}
