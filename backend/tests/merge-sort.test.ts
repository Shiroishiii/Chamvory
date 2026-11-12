import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mergeSort } from '../src/utils/merge-sort';

test('ordena uma lista embaralhada em ordem crescente', () => {
  const embaralhada = [7, 2, 9, 4, 1, 8, 3, 6, 5];
  assert.deepEqual(mergeSort(embaralhada, (a, b) => a - b), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('não altera a lista original', () => {
  const original = [3, 1, 2];
  mergeSort(original, (a, b) => a - b);
  assert.deepEqual(original, [3, 1, 2]);
});

test('lida com lista vazia e com um único elemento', () => {
  assert.deepEqual(mergeSort([] as number[], (a, b) => a - b), []);
  assert.deepEqual(mergeSort([42], (a, b) => a - b), [42]);
});

test('é estável: mantém a ordem original em empates', () => {
  const chamados = [
    { id: 1, abertura: 2 },
    { id: 2, abertura: 1 },
    { id: 3, abertura: 2 },
    { id: 4, abertura: 1 },
  ];
  const ordenados = mergeSort(chamados, (a, b) => a.abertura - b.abertura);
  assert.deepEqual(ordenados.map((chamado) => chamado.id), [2, 4, 1, 3]);
});

test('ordena datas de abertura do mais antigo para o mais recente', () => {
  const chamados = [
    { id: 3, data: new Date('2026-11-05T08:00:00Z') },
    { id: 1, data: new Date('2026-11-03T09:15:00Z') },
    { id: 4, data: new Date('2026-11-09T14:20:00Z') },
    { id: 2, data: new Date('2026-11-04T10:30:00Z') },
  ];
  const ordenados = mergeSort(chamados, (a, b) => a.data.getTime() - b.data.getTime() || a.id - b.id);
  assert.deepEqual(ordenados.map((chamado) => chamado.id), [1, 2, 3, 4]);
});
