"use client";

import { useState } from "react";
import Image from "next/image";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Videla4012";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simulate slight delay for UX
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLogin();
      } else {
        setError(true);
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 animate-fadeIn">
      {/* Logo */}
      <div className="relative w-20 h-20 mb-6">
        <Image
          src="/logo-videla.png"
          alt="Escuela Videla"
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>

      <h1 className="text-2xl font-extrabold text-white mb-2">
        Panel de Administración
      </h1>
      <p className="text-sm text-indigo-300/70 mb-8">
        Ingresá la contraseña para acceder
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
      >
        <label
          htmlFor="admin-password"
          className="block text-sm font-semibold text-indigo-300 mb-2"
        >
          Contraseña
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Ingresá la contraseña"
          className={`w-full px-4 py-3 rounded-xl bg-white/10 border-2 text-white placeholder-white/30 focus:outline-none transition-all duration-300 ${
            error
              ? "border-rose-400/60 focus:border-rose-400"
              : "border-white/10 focus:border-violet-400"
          }`}
          autoFocus
        />

        {error && (
          <p className="mt-2 text-sm text-rose-400 animate-fadeIn">
            ❌ Contraseña incorrecta. Intentá de nuevo.
          </p>
        )}

        <button
          type="submit"
          id="btn-admin-login"
          disabled={loading || !password}
          className="w-full mt-4 py-3 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Verificando...
            </span>
          ) : (
            "Ingresar"
          )}
        </button>
      </form>

      <a
        href="/"
        className="mt-6 text-sm text-indigo-400/60 hover:text-indigo-300 transition-colors"
      >
        ← Volver al test
      </a>
    </div>
  );
}
