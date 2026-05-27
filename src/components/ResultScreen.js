"use client";

import Image from "next/image";
import { getResultForScore, FINAL_QUOTE } from "@/data/questions";

export default function ResultScreen({ score, onRestart }) {
  const result = getResultForScore(score);

  if (!result) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 animate-fadeIn">
      {/* Emoji/Icon */}
      <div className="text-7xl mb-6 animate-bounceIn">{result.emoji}</div>

      {/* Score badge */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 mb-6">
        <p className="text-center">
          <span className="text-sm text-indigo-300/80">Tu puntaje</span>
          <br />
          <span className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            {score}
          </span>
          <span className="text-lg text-indigo-300/60"> / 30</span>
        </p>
      </div>

      {/* Result card */}
      <div
        className={`w-full max-w-sm rounded-3xl border-2 p-6 mb-6 ${
          result.color === "emerald"
            ? "bg-emerald-500/10 border-emerald-400/30"
            : result.color === "amber"
            ? "bg-amber-500/10 border-amber-400/30"
            : "bg-rose-500/10 border-rose-400/30"
        }`}
      >
        <h2
          className={`text-2xl font-extrabold mb-3 ${
            result.color === "emerald"
              ? "text-emerald-400"
              : result.color === "amber"
              ? "text-amber-400"
              : "text-rose-400"
          }`}
        >
          {result.title}
        </h2>
        <p className="text-white/80 text-base leading-relaxed">
          {result.description}
        </p>
      </div>

      {/* Score breakdown */}
      <div className="w-full max-w-sm bg-white/5 backdrop-blur-md rounded-2xl p-4 mb-8 border border-white/10">
        <p className="text-xs text-indigo-300/60 font-semibold uppercase tracking-wider mb-3">
          Rangos de referencia
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-sm text-white/60">
              10-16: Uso saludable
            </span>
            {score >= 10 && score <= 16 && (
              <span className="ml-auto text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                ← Estás acá
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-sm text-white/60">
              17-23: Uso a revisar
            </span>
            {score >= 17 && score <= 23 && (
              <span className="ml-auto text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                ← Estás acá
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <span className="text-sm text-white/60">
              24-30: Puede afectar tu bienestar
            </span>
            {score >= 24 && score <= 30 && (
              <span className="ml-auto text-xs bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full">
                ← Estás acá
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Final quote */}
      <p className="text-sm text-indigo-300/60 italic text-center max-w-sm mb-8 leading-relaxed">
        {FINAL_QUOTE}
      </p>

      {/* Restart button */}
      <button
        onClick={onRestart}
        id="btn-restart-test"
        className="w-full max-w-sm py-4 px-8 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md"
      >
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Volver al inicio
        </span>
      </button>

      {/* School logo footer */}
      <div className="mt-8 flex items-center gap-2 opacity-40">
        <div className="relative w-8 h-8">
          <Image
            src="/logo-videla.png"
            alt="Escuela Videla"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-xs text-indigo-300">
          Esc. N° 4-012 &quot;Ing. Ricardo Videla&quot;
        </span>
      </div>
    </div>
  );
}
