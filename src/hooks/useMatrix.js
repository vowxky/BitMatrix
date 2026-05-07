import { useState, useCallback } from 'react';
import { createEmpty, createRandom } from '../logic/generate.js';
import { multiply, multiplyWithSteps } from '../logic/multiply.js';
import { useLang } from '../i18n/index.js';

export function useMatrix() {
  const lang = useLang();
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);

  const [matrixA, setMatrixA] = useState(() => createEmpty(2, 2));
  const [matrixB, setMatrixB] = useState(() => createEmpty(2, 2));

  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState(null);
  const [mode, setMode] = useState('rapida');
  const [error, setError] = useState(null);

  const updateColsA = useCallback((n) => {
    const val = Math.max(1, n);
    setColsA(val);
    setRowsB(val);
  }, []);

  const updateRowsA = useCallback((n) => {
    setRowsA(Math.max(1, n));
  }, []);

  const updateColsB = useCallback((n) => {
    setColsB(Math.max(1, n));
  }, []);

  const generateMatrices = useCallback(() => {
    setMatrixA(createEmpty(rowsA, colsA));
    setMatrixB(createEmpty(rowsB, colsB));
    setResult(null);
    setSteps(null);
    setError(null);
  }, [rowsA, colsA, rowsB, colsB]);

  const randomMatrices = useCallback(() => {
    setMatrixA(createRandom(rowsA, colsA));
    setMatrixB(createRandom(rowsB, colsB));
    setResult(null);
    setSteps(null);
    setError(null);
  }, [rowsA, colsA, rowsB, colsB]);

  const toggleCell = useCallback((which, i, j) => {
    const setter = which === 'A' ? setMatrixA : setMatrixB;
    setter((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[i][j] = copy[i][j] ? 0 : 1;
      return copy;
    });
    setResult(null);
    setSteps(null);
  }, []);

  const calculate = useCallback(() => {
    if (colsA !== rowsB) {
      setError(lang === 'en'
        ? `Incompatible dimensions: columns of A (${colsA}) ≠ rows of B (${rowsB})`
        : `Dimensiones incompatibles: columnas de A (${colsA}) ≠ filas de B (${rowsB})`);
      return;
    }
    setError(null);

    if (mode === 'rapida') {
      setResult(multiply(matrixA, matrixB));
      setSteps(null);
    } else {
      const { result: res, steps: st } = multiplyWithSteps(matrixA, matrixB);
      setResult(res);
      setSteps(st);
    }
  }, [matrixA, matrixB, colsA, rowsB, mode, lang]);

  const runCalculation = useCallback((a, b, m) => {
    if (m === 'rapida') {
      setResult(multiply(a, b));
      setSteps(null);
    } else {
      const { result: res, steps: st } = multiplyWithSteps(a, b);
      setResult(res);
      setSteps(st);
    }
    setError(null);
  }, []);

  const handleModeChange = useCallback((newMode) => {
    setMode(newMode);
    const hasData = matrixA.some((r) => r.some((c) => c === 1)) ||
                    matrixB.some((r) => r.some((c) => c === 1));
    if (hasData && colsA === rowsB) {
      runCalculation(matrixA, matrixB, newMode);
    }
  }, [matrixA, matrixB, colsA, rowsB, runCalculation]);

  const reset = useCallback(() => {
    setRowsA(2);
    setColsA(2);
    setRowsB(2);
    setColsB(2);
    setMatrixA(createEmpty(2, 2));
    setMatrixB(createEmpty(2, 2));
    setResult(null);
    setSteps(null);
    setMode('rapida');
    setError(null);
  }, []);

  return {
    rowsA, colsA, rowsB, colsB,
    updateRowsA, updateColsA, updateColsB,
    matrixA, matrixB,
    toggleCell,
    generateMatrices,
    randomMatrices,
    result, steps, error,
    calculate,
    mode, handleModeChange,
    reset,
  };
}
