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
} from "recharts";

const COLORS = ["#818cf8", "#a78bfa", "#c084fc", "#e879f9", "#f472b6"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white font-bold text-sm">{label}</p>
        <p className="text-indigo-300 text-sm mt-1">
          {payload[0].value} alumnos
        </p>
      </div>
    );
  }
  return null;
};

export default function DistribucionAnio({ data }) {
  const chartData = ["1°", "2°", "3°", "4°", "5°"].map((anio, idx) => ({
    name: `${anio} año`,
    cantidad: data.filter((d) => d.anio === String(idx + 1)).length,
  }));

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      <h3 className="text-lg font-bold text-white mb-1">
        📊 Participantes por Año
      </h3>
      <p className="text-xs text-indigo-300/60 mb-4">
        Distribución de alumnos que completaron el test
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
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
            <Bar dataKey="cantidad" radius={[8, 8, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
