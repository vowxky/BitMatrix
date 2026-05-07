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
      </div>
    </div>
  );
}
