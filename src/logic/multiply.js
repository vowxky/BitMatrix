export function multiply(A, B) {
  const m = A.length;
  const p = A[0].length;
  const n = B[0].length;

  const result = [];

  for (let i = 0; i < m; i++) {
    result[i] = [];
    for (let j = 0; j < n; j++) {
      let value = 0;
      for (let k = 0; k < p; k++) {
        if (A[i][k] && B[k][j]) {
          value = 1;
          break;
        }
      }
      result[i][j] = value;
    }
  }

  return result;
}

export function multiplyWithSteps(A, B) {
  const m = A.length;
  const p = A[0].length;
  const n = B[0].length;

  const result = [];
  const steps = [];

  for (let i = 0; i < m; i++) {
    result[i] = [];
    for (let j = 0; j < n; j++) {
      const terms = [];
      let value = 0;

      for (let k = 0; k < p; k++) {
        const a = A[i][k];
        const b = B[k][j];
        const product = a && b ? 1 : 0;
        terms.push({ a, b, product });
        if (product) value = 1;
      }

      result[i][j] = value;

      const formulaParts = terms.map(
        (_, k) => `A[${i},${k}]·B[${k},${j}]`
      );
      const formula = `C[${i},${j}] = ${formulaParts.join(" ∨ ")}`;

      const evalParts = terms.map((t) => `(${t.a}·${t.b})`);
      const evalStr = `${evalParts.join(" ∨ ")} = ${value}`;

      steps.push({ i, j, formula, eval: evalStr, final: value, terms });
    }
  }

  return { result, steps };
}
