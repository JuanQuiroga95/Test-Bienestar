"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { questions } from "@/data/questions";

const COLORS = ["#34d399", "#fbbf24", "#f87171"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-800/95 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
        <p className="text-white font-bold text-sm mb-1">{data.name}</p>
        <p className="text-white/80 text-xs mb-2 leading-relaxed">{data.fullName}</p>
        <p className="text-indigo-300 text-sm font-semibold">
          {data.value} alumnos ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-col gap-3 mt-4 px-2 w-full">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-start gap-3 bg-white/5 rounded-lg p-2">
          <div
            className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <div className="flex flex-col">
            <span className="text-sm text-white/90 font-bold">{entry.name}</span>
            <span className="text-xs text-white/70 leading-snug mt-0.5">{entry.fullName}</span>
            <span className="text-xs text-indigo-300 mt-1">{entry.value} ({entry.percentage}%)</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function AnalisisPorPregunta({ data }) {
  // Solo analizamos preguntas puntuables y las preguntas 2 y 3 (contexto)
  const analyzableQuestions = questions.filter(
    (q) => q.type === "puntuable" || q.id === 2 || q.id === 3
  );
  const [selectedQIdx, setSelectedQIdx] = useState(0);

  const question = analyzableQuestions[selectedQIdx];
  
  const counts = [0, 0, 0];
  let totalAnswered = 0;

  data.forEach((d) => {
    if (question.type === "puntuable") {
      // En la base de datos, 'respuestas' es un array que guarda las preguntas 4 a 13.
      // El índice 0 corresponde a la Q4, el 1 a la Q5, etc.
      const respIdx = question.id - 4;
      if (d.respuestas && d.respuestas[respIdx] !== undefined) {
        const val = d.respuestas[respIdx]; // Devuelve 1, 2 o 3
        if (val >= 1 && val <= 3) {
          counts[val - 1]++;
          totalAnswered++;
        }
      }
    } else if (question.type === "contexto") {
      // Las respuestas de contexto se guardan en el objeto 'contexto'
      if (d.contexto && d.contexto[`q${question.id}`]) {
        const val = d.contexto[`q${question.id}`];
        // Buscamos qué opción corresponde a este valor
        const optIdx = question.options.findIndex((o) => o.value === val);
        if (optIdx !== -1) {
          counts[optIdx]++;
          totalAnswered++;
        }
      }
    }
  });

  const chartData = [
    { name: "Opción A", fullName: question.options[0].text, value: counts[0], color: COLORS[0] },
    { name: "Opción B", fullName: question.options[1].text, value: counts[1], color: COLORS[1] },
    { name: "Opción C", fullName: question.options[2].text, value: counts[2], color: COLORS[2] },
  ].map((item) => ({
    ...item,
    percentage: totalAnswered > 0 ? Math.round((item.value / totalAnswered) * 100) : 0,
  }));

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            🔍 Análisis Detallado por Pregunta
          </h3>
          <p className="text-xs text-indigo-300/60">
            Distribución de respuestas según opciones
          </p>
        </div>
        
        <select
          value={selectedQIdx}
          onChange={(e) => setSelectedQIdx(Number(e.target.value))}
          className="bg-[#1a172a] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500 max-w-xs sm:max-w-[200px]"
        >
          {analyzableQuestions.map((q, idx) => (
            <option key={q.id} value={idx}>
              Pregunta {q.id}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-black/20 rounded-xl p-4 mb-4 border border-white/5">
        <p className="text-sm text-white/90 font-medium">{question.text}</p>
        <p className="text-xs text-white/40 mt-1">Respondida por {totalAnswered} alumnos</p>
      </div>

      {totalAnswered === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <p className="text-white/40 text-sm text-center px-4">
            Aún no hay datos guardados para esta pregunta.<br/>
            (Los test nuevos comenzarán a registrar esta información).
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="w-full md:w-1/2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="rgba(15, 23, 42, 0.8)"
                  strokeWidth={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
             <CustomLegend payload={chartData} />
          </div>
        </div>
      )}
    </div>
  );
}
