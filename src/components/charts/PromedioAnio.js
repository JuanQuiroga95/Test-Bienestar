"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";

const getBarColor = (avg) => {
  if (avg <= 16) return "#34d399"; // emerald
  if (avg <= 23) return "#fbbf24"; // amber
  return "#f87171"; // rose
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const avg = payload[0].value;
    const estado =
      avg <= 16
        ? "Uso saludable"
        : avg <= 23
        ? "Uso a revisar"
        : "Afecta bienestar";
    return (
      <div className="bg-slate-800/95 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white font-bold text-sm">{label}</p>
        <p className="text-indigo-300 text-sm mt-1">
          Promedio: {avg} pts
        </p>
        <p className="text-xs text-white/50 mt-0.5">{estado}</p>
      </div>
    );
  }
  return null;
};

export default function PromedioAnio({ data }) {
  const chartData = ["1°", "2°", "3°", "4°", "5°"].map((anio, idx) => {
    const yearData = data.filter((d) => d.anio === String(idx + 1));
    const avg =
      yearData.length > 0
        ? Math.round(
            (yearData.reduce((sum, d) => sum + d.puntajeTotal, 0) /
              yearData.length) *
              10
          ) / 10
        : 0;
    return { name: `${anio} año`, promedio: avg };
  });

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      <h3 className="text-lg font-bold text-white mb-1">
        📈 Promedio de Puntaje por Año
      </h3>
      <p className="text-xs text-indigo-300/60 mb-4">
        Puntaje promedio obtenido por cada curso
      </p>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            />
            <YAxis
              domain={[0, 30]}
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
            {/* Reference lines for ranges */}
            <ReferenceLine
              y={16}
              stroke="rgba(52,211,153,0.3)"
              strokeDasharray="3 3"
              label={{ value: "16", fill: "rgba(52,211,153,0.5)", fontSize: 10 }}
            />
            <ReferenceLine
              y={23}
              stroke="rgba(251,191,36,0.3)"
              strokeDasharray="3 3"
              label={{ value: "23", fill: "rgba(251,191,36,0.5)", fontSize: 10 }}
            />
            <Bar dataKey="promedio" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.promedio)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-xs text-white/50">≤16 Saludable</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="text-xs text-white/50">17-23 A revisar</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="text-xs text-white/50">≥24 Afecta</span>
        </div>
      </div>
    </div>
  );
}
