import { Check, X, ChevronRight } from 'lucide-react';
import { useT } from '../i18n/index.js';

export default function StepByStep({ steps, rows, cols }) {
  const t = useT();
  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
        {t('step.title', { rows: String(rows), cols: String(cols) })}
      </h3>

      <div className="space-y-2">
        {steps.map((step) => (
          <details
            key={`${step.i}-${step.j}`}
            className="group rounded-2xl border border-white/5 bg-[#111] overflow-hidden"
          >
            <summary className="inline-flex items-center gap-3 w-full px-4 sm:px-5 py-3.5 cursor-pointer hover:bg-white/5 transition-colors text-sm [&::-webkit-details-marker]:hidden list-none">
              <ChevronRight size={14} className="text-[#a3a3a3] transition-transform duration-150 group-open:rotate-90" />
              <span className="font-mono font-bold text-white">
                C[{step.i},{step.j}]
              </span>
              <span className="text-[#a3a3a3] font-mono text-sm">= {step.final}</span>
              {step.final === 1 ? (
                <Check size={13} className="text-white" />
              ) : (
                <X size={13} className="text-white/40" />
              )}
            </summary>

            <div className="px-4 sm:px-5 pb-4 text-sm space-y-2 border-t border-white/5 pt-3">
              <p className="text-white/70 font-mono text-xs break-all leading-6">{step.formula}</p>
              <p className="text-white/40 font-mono text-xs break-all leading-6">{step.eval}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {step.terms.map((t, k) => (
                  <span
                    key={k}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono border ${
                      t.product
                        ? 'bg-white text-black border-white'
                        : 'bg-[#0b0b0b] text-white/40 border-white/5'
                    }`}
                  >
                    ({t.a}·{t.b})
                    <span>= {t.product}</span>
                  </span>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
