import { useT } from '../i18n/index.js';

export default function MatrixInput({ matrix, onToggle, label, readOnly }) {
  const t = useT();
  if (!matrix || matrix.length === 0) return null;

  const cellSize = 'w-9 sm:w-10 h-9 sm:h-10';
  const cols = matrix[0].length;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-3">
        {t(label)}
        <span className="text-[#a3a3a3] font-normal normal-case ml-2 tracking-normal">
          {matrix.length}×{cols}
        </span>
      </h3>

      <div className="overflow-x-auto pb-1 max-w-full flex justify-center">
        <div
          className="grid gap-1 bg-[#0b0b0b] border border-white/5 rounded-2xl p-3"
          style={{ gridTemplateColumns: `repeat(${cols}, 2.5rem)` }}
        >
          {matrix.map((row, i) =>
            row.map((cell, j) => {
              const active = cell === 1;

              if (readOnly) {
                return (
                  <div
                    key={`${i}-${j}`}
                    className={`${cellSize} text-sm font-mono font-bold rounded-lg flex items-center justify-center border transition-all ${
                      active
                        ? 'bg-white text-black border-white'
                        : 'bg-[#111] text-white/50 border-white/5'
                    }`}
                  >
                    {cell}
                  </div>
                );
              }

              return (
                <button
                  key={`${i}-${j}`}
                  onClick={() => onToggle(i, j)}
                  className={`${cellSize} text-sm font-mono font-bold rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                    active
                      ? 'bg-white text-black border-white hover:brightness-110'
                      : 'bg-[#111] text-white/50 border-white/5 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cell}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
