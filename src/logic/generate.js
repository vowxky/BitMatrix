export function createEmpty(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

export function createRandom(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() < 0.5 ? 0 : 1))
  );
}
