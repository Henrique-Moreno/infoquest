import { describe, expect, it } from 'vitest';
import { embaralhar } from './embaralhar';

describe('embaralhar', () => {
  it('não altera a lista original', () => {
    const lista = [1, 2, 3, 4];

    embaralhar(lista, () => 0.5);

    expect(lista).toEqual([1, 2, 3, 4]);
  });

  it('mantém os mesmos elementos e o mesmo tamanho', () => {
    const lista = ['a', 'b', 'c', 'd'];
    const resultado = embaralhar(lista, () => 0.5);

    expect(resultado).toHaveLength(lista.length);
    expect([...resultado].sort()).toEqual([...lista].sort());
  });

  it('produz um resultado determinístico com uma fonte fixa', () => {
    expect(embaralhar([1, 2, 3, 4], () => 0.5)).toEqual([1, 4, 2, 3]);
  });

  it('funciona com uma lista vazia', () => {
    expect(embaralhar([])).toEqual([]);
  });

  it('funciona com uma lista de um elemento', () => {
    expect(embaralhar([42])).toEqual([42]);
  });
});
