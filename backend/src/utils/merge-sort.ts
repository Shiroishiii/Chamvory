/**
 * Merge Sort genérico e estável.
 * Retorna um NOVO array ordenado segundo `compare` (negativo: a vem antes de b).
 * Complexidade: O(n log n) no tempo e O(n) de memória auxiliar.
 */
export function mergeSort<T>(itens: readonly T[], compare: (a: T, b: T) => number): T[] {
  if (itens.length <= 1) return itens.slice();

  const meio = Math.floor(itens.length / 2);
  const esquerda = mergeSort(itens.slice(0, meio), compare);
  const direita = mergeSort(itens.slice(meio), compare);

  return mesclar(esquerda, direita, compare);
}

function mesclar<T>(esquerda: T[], direita: T[], compare: (a: T, b: T) => number): T[] {
  const resultado: T[] = [];
  let i = 0;
  let j = 0;

  while (i < esquerda.length && j < direita.length) {
    // "<= 0" mantém a ordem original em empates (estabilidade)
    if (compare(esquerda[i], direita[j]) <= 0) {
      resultado.push(esquerda[i++]);
    } else {
      resultado.push(direita[j++]);
    }
  }

  while (i < esquerda.length) resultado.push(esquerda[i++]);
  while (j < direita.length) resultado.push(direita[j++]);

  return resultado;
}
