"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DistribucionAnio from "./charts/DistribucionAnio";
import PromedioAnio from "./charts/PromedioAnio";
import EstadoBienestar from "./charts/EstadoBienestar";

export default function AdminDashboard({ onLogout }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterAnio, setFilterAnio] = useState("todos");
  const [error, setError] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/respuestas");
      if (!res.ok) throw new Error("Error al cargar datos");
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setResetting(true);
      const res = await fetch("/api/respuestas", { method: "DELETE" });
      if (!res.ok) throw new Error("Error al borrar datos");
      setData([]);
      setShowResetConfirm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setResetting(false);
    }
  };

  const filteredData =
    filterAnio === "todos"
      ? data
      : data.filter((d) => d.anio === filterAnio);

  const totalRespuestas = filteredData.length;
  const promedioGeneral =
    totalRespuestas > 0
      ? Math.round(
          (filteredData.reduce((sum, d) => sum + d.puntajeTotal, 0) /
            totalRespuestas) *
            10
        ) / 10
      : 0;

  const getEstadoColor = (avg) => {
    if (avg === 0) return "text-white/40";
    if (avg <= 16) return "text-emerald-400";
    if (avg <= 23) return "text-amber-400";
    return "text-rose-400";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <svg className="animate-spin h-10 w-10 text-violet-400 mx-auto mb-4" viewBox="0 0 24 24">
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
          <p className="text-indigo-300/60">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 animate-fadeIn">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo-videla.png"
                alt="Escuela Videla"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white">
                Panel de Administración
              </h1>
              <p className="text-xs text-indigo-300/60">
                Test de Bienestar Digital
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              id="btn-refresh-data"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all"
              title="Actualizar datos"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={onLogout}
              id="btn-admin-logout"
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 text-white/60 hover:text-rose-400 transition-all"
              title="Cerrar sesión"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
          <label className="text-xs font-semibold text-indigo-300/80 uppercase tracking-wider block mb-2">
            Filtrar por año
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Todos", value: "todos" },
              { label: "1° año", value: "1" },
              { label: "2° año", value: "2" },
              { label: "3° año", value: "3" },
              { label: "4° año", value: "4" },
              { label: "5° año", value: "5" },
            ].map((opt) => (
              <button
                key={opt.value}
                id={`filter-${opt.value}`}
                onClick={() => setFilterAnio(opt.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filterAnio === opt.value
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-indigo-300/60 font-semibold uppercase tracking-wider">
              Total respuestas
            </p>
            <p className="text-3xl font-extrabold text-white mt-1">
              {totalRespuestas}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-indigo-300/60 font-semibold uppercase tracking-wider">
              Promedio general
            </p>
            <p className={`text-3xl font-extrabold mt-1 ${getEstadoColor(promedioGeneral)}`}>
              {promedioGeneral}
              <span className="text-lg text-white/30"> / 30</span>
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-rose-500/10 border border-rose-400/30 rounded-2xl p-4">
            <p className="text-rose-400 text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Charts */}
        <div className="space-y-6">
          <EstadoBienestar data={filteredData} />
          <DistribucionAnio data={filteredData} />
          <PromedioAnio data={filteredData} />
        </div>

        {/* Reset button */}
        <div className="mt-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Reiniciar datos</p>
              <p className="text-xs text-indigo-300/50 mt-0.5">Eliminar todas las respuestas del test</p>
            </div>
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                id="btn-reset-data"
                className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-400/30 text-rose-400 text-sm font-medium hover:bg-rose-500/20 transition-all"
              >
                🗑️ Reiniciar
              </button>
            ) : (
              <div className="flex items-center gap-2 animate-fadeIn">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-medium hover:bg-white/10 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReset}
                  disabled={resetting}
                  id="btn-confirm-reset"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold transition-all disabled:opacity-50"
                >
                  {resetting ? "Borrando..." : "⚠️ Confirmar"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-4">
          <p className="text-xs text-indigo-300/40">
            Escuela N° 4-012 &quot;Ing. Ricardo Videla&quot; · Test de Bienestar Digital
          </p>
          <a
            href="/"
            className="text-xs text-violet-400/60 hover:text-violet-300 transition-colors mt-1 inline-block"
          >
            ← Ir al test
          </a>
        </div>
      </div>
    </div>
  );
}
