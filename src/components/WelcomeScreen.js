"use client";

import Image from "next/image";

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 animate-fadeIn">
      {/* Logo */}
      <div className="relative w-32 h-32 mb-6 animate-float">
        <Image
          src="/logo-videla.png"
          alt="Escuela N° 4-012 Ing. Ricardo Videla"
          fill
          className="object-contain drop-shadow-lg"
          priority
        />
      </div>

      {/* School name */}
      <p className="text-sm font-medium text-indigo-300 tracking-widest uppercase mb-2">
        Escuela N° 4-012
      </p>
      <p className="text-sm text-indigo-300/70 mb-8">
        &quot;Ing. Ricardo Videla&quot;
      </p>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
          Test de
          <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Bienestar Digital
          </span>
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full mx-auto mb-4" />
        <p className="text-xl text-indigo-200 font-medium">
          ¿Quién maneja a quién?
        </p>
        <p className="text-base text-indigo-300/80 mt-1">
          Tu relación con el celular
        </p>
      </div>

      {/* Info card */}
      <div className="w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 mb-8">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl">🔒</span>
          <div>
            <p className="text-white font-semibold text-sm">Test anónimo</p>
            <p className="text-indigo-300/70 text-xs mt-0.5">
              No es una calificación. Nadie sabrá tus respuestas.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl">📱</span>
          <div>
            <p className="text-white font-semibold text-sm">11 preguntas</p>
            <p className="text-indigo-300/70 text-xs mt-0.5">
              Marcá la opción que mejor describe lo que te pasa a vos.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl">⏱️</span>
          <div>
            <p className="text-white font-semibold text-sm">3 minutos</p>
            <p className="text-indigo-300/70 text-xs mt-0.5">
              Rápido y sencillo. Resultado inmediato.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onStart}
        id="btn-start-test"
        className="group relative w-full max-w-sm py-4 px-8 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-violet-900/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-violet-800/50 active:scale-[0.98]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Comenzar
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
      </button>

      {/* Footer quote */}
      <p className="mt-8 text-xs text-indigo-400/50 text-center italic max-w-xs">
        &quot;No se trata de dejar el celular, sino de entender qué hace con nosotros.&quot;
      </p>
    </div>
  );
}
