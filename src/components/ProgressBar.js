"use client";

export default function ProgressBar({ current, total }) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      {/* Label */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-indigo-300/80 tracking-wide">
          Pregunta {current + 1} de {total}
        </span>
        <span className="text-xs font-bold text-violet-400">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Bar */}
      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-700 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          {/* Glow effect */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-60 blur-sm" />
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-3">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < current
                ? "bg-violet-400 scale-100"
                : i === current
                ? "bg-white scale-125 shadow-lg shadow-violet-400/50"
                : "bg-white/20 scale-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
