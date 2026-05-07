import { Play, RotateCcw } from 'lucide-react';
import { useT } from './i18n/index.js';
import { useMatrix } from './hooks/useMatrix.js';
import Header from './components/Header.jsx';
import ModeSelector from './components/ModeSelector.jsx';
import DimensionSelector from './components/DimensionSelector.jsx';
import MatrixInput from './components/MatrixInput.jsx';
import StepByStep from './components/StepByStep.jsx';

export default function App() {
  const t = useT();
  const {
    rowsA, colsA, colsB,
    updateRowsA, updateColsA, updateColsB,
    matrixA, matrixB,
    toggleCell,
    generateMatrices,
    randomMatrices,
    result, steps, error,
    calculate,
    mode, handleModeChange,
    reset,
  } = useMatrix();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <ModeSelector mode={mode} onModeChange={handleModeChange} />

        <DimensionSelector
          rowsA={rowsA} colsA={colsA} colsB={colsB}
          onRowsA={updateRowsA} onColsA={updateColsA} onColsB={updateColsB}
          onGenerate={generateMatrices}
          onRandom={randomMatrices}
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 sm:gap-6">
          <MatrixInput
            matrix={matrixA}
            onToggle={(i, j) => toggleCell('A', i, j)}
            label="matrix.a"
          />
          <span className="text-lg text-white/20 font-bold sm:mt-10 select-none hidden sm:block">×</span>
          <MatrixInput
            matrix={matrixB}
            onToggle={(i, j) => toggleCell('B', i, j)}
            label="matrix.b"
          />
        </div>

        <div className="flex justify-center gap-3 mt-7">
          <button
            onClick={calculate}
            className="inline-flex items-center gap-2 bg-[#f5f5f5] hover:bg-white text-[#0a0a0a] font-semibold
                       px-7 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <Play size={16} />
            {t('action.multiply')}
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-[#171717] hover:bg-[#1d1d1d] text-white/70 hover:text-white
                       px-5 py-3 rounded-xl text-sm border border-white/5 transition-all hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <RotateCcw size={14} />
            {t('action.reset')}
          </button>
        </div>

        {error && (
          <div className="mt-4 text-center">
            <p className="inline-block bg-[#111] text-white/70 border border-white/5 px-5 py-2.5 rounded-xl text-sm">
              {error}
            </p>
          </div>
        )}

        {result && mode === 'rapida' && (
          <div className="mt-10 flex justify-center overflow-x-auto">
            <MatrixInput matrix={result} label="matrix.result" readOnly />
          </div>
        )}

        {result && mode === 'didactica' && (
          <div className="mt-10">
            <div className="flex justify-center mb-8 overflow-x-auto">
              <MatrixInput matrix={result} label="matrix.result" readOnly />
            </div>
            <StepByStep
              steps={steps}
              rows={result.length}
              cols={result[0].length}
            />
          </div>
        )}

        <footer className="mt-16 pt-6 border-t border-white/5 text-center text-xs text-[#a3a3a3] space-y-1">
          <p>
            MIT License &copy; {new Date().getFullYear()}{' '}
            <a href="https://github.com/vowxky" target="_blank" rel="noopener noreferrer"
               className="text-white/60 hover:text-white transition-colors">
              Vowxky
            </a>
          </p>
          <p>
            <a href="https://github.com/vowxky/BitMatrix" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              github.com/vowxky/BitMatrix
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
