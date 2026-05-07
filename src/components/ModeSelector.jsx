import { Zap, BookOpen } from 'lucide-react';
import { useT } from '../i18n/index.js';

export default function ModeSelector({ mode, onModeChange }) {
  const t = useT();
  return (
    <div className="flex justify-center gap-2 mb-6">
      <button
        onClick={() => onModeChange('rapida')}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          mode === 'rapida'
            ? 'bg-white text-[#0a0a0a] shadow-sm'
            : 'bg-[#171717] text-white border border-white/5 hover:bg-[#1d1d1d]'
        }`}
      >
        <Zap size={15} />
        {t('mode.rapida')}
      </button>
      <button
        onClick={() => onModeChange('didactica')}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          mode === 'didactica'
            ? 'bg-white text-[#0a0a0a] shadow-sm'
            : 'bg-[#171717] text-white border border-white/5 hover:bg-[#1d1d1d]'
        }`}
      >
        <BookOpen size={15} />
        {t('mode.didactica')}
      </button>
    </div>
  );
}
