"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ESTADOS = [
  { name: "Uso saludable", color: "#34d399", range: [0, 55] },
  { name: "Uso a revisar", color: "#fbbf24", range: [56, 78] },
  { name: "Afecta bienestar", color: "#f87171", range: [79, 100] },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white font-bold text-sm">{payload[0].name}</p>
        <p className="text-indigo-300 text-sm mt-1">
          {payload[0].value} alumnos ({payload[0].payload.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-2">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-white/60">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (percent === 0) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-sm font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function EstadoBienestar({ data }) {
  const total = data.length;
  const chartData = ESTADOS.map((estado) => {
    const count = data.filter(
      (d) =>
        (d.porcentaje || 0) >= estado.range[0] && (d.porcentaje || 0) <= estado.range[1]
    ).length;
    return {
      name: estado.name,
      value: count,
      color: estado.color,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    };
  });

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      <h3 className="text-lg font-bold text-white mb-1">
        🎯 Estado de Bienestar General
      </h3>
      <p className="text-xs text-indigo-300/60 mb-4">
        Distribución porcentual según nivel de bienestar digital
      </p>

      {total === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <p className="text-white/40 text-sm">No hay datos para mostrar</p>
        </div>
      ) : (
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                stroke="rgba(15, 23, 42, 0.8)"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Stats cards */}
      {total > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {chartData.map((estado, idx) => (
            <div
              key={idx}
              className="text-center bg-white/5 rounded-xl py-2 px-1"
            >
              <p className="text-lg font-bold" style={{ color: estado.color }}>
                {estado.value}
              </p>
              <p className="text-[10px] text-white/40 leading-tight">
                {estado.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
