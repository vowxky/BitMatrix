import { useState } from 'react';
import { RotateCcw, Dice1 } from 'lucide-react';
import { useT } from '../i18n/index.js';

const inputClass =
  'w-full bg-[#0b0b0b] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white ' +
  'focus:bg-[#090909] focus:border-white/30 focus:outline-none transition-all';

function NumericInput({ value, onChange, disabled }) {
  const [draft, setDraft] = useState(String(value));

  return (
    <input
      type="number"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        const num = parseInt(draft, 10);
        if (isNaN(num) || num < 1) {
          setDraft('1');
          onChange(1);
        } else {
          onChange(num);
        }
      }}
      disabled={disabled}
      className={disabled ? `${inputClass} cursor-not-allowed opacity-50` : inputClass}
    />
  );
}

export default function DimensionSelector({
  rowsA, colsA, colsB,
  onRowsA, onColsA, onColsB,
  onGenerate, onRandom,
}) {
  const t = useT();
  return (
    <div className="rounded-2xl border border-white/5 bg-[#111] p-4 sm:p-6 mb-6">
      <h2 className="text-base font-semibold tracking-tight text-white mb-5">
        {t('dims.title')}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-5">
        <div>
          <label className="block text-xs text-[#a3a3a3] mb-1.5">{t('dims.rowsA')}</label>
          <NumericInput key={rowsA} value={rowsA} onChange={onRowsA} />
        </div>
        <div>
          <label className="block text-xs text-[#a3a3a3] mb-1.5">{t('dims.colsA')}</label>
          <NumericInput key={colsA} value={colsA} onChange={onColsA} />
        </div>
        <div className="flex items-end text-xs text-[#a3a3a3] pb-2.5 font-mono">{rowsA}×{colsA}</div>

        <div>
          <label className="block text-xs text-[#a3a3a3] mb-1.5">{t('dims.rowsB')}</label>
          <NumericInput key={colsA} value={colsA} onChange={() => {}} disabled />
        </div>
        <div>
          <label className="block text-xs text-[#a3a3a3] mb-1.5">{t('dims.colsB')}</label>
          <NumericInput key={colsB} value={colsB} onChange={onColsB} />
        </div>
        <div className="flex items-end text-xs text-[#a3a3a3] pb-2.5 font-mono">{colsA}×{colsB}</div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onGenerate}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#f5f5f5] hover:bg-white text-[#0a0a0a] text-sm font-semibold
                     px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5"
        >
          <RotateCcw size={14} />
          {t('dims.generate')}
        </button>
        <button
          onClick={onRandom}
          className="inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#1d1d1d] text-white text-sm font-medium
                     px-4 py-2.5 rounded-xl border border-white/5 transition-all hover:-translate-y-0.5"
        >
          <Dice1 size={14} />
          {t('dims.random')}
        </button>
      </div>
    </div>
  );
}
