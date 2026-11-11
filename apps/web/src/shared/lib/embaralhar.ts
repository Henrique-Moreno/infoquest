export function embaralhar<T>(lista: readonly T[], aleatorio: () => number = Math.random): T[] {
  const resultado = [...lista];

  for (let indice = resultado.length - 1; indice > 0; indice -= 1) {
    const indiceAleatorio = Math.floor(aleatorio() * (indice + 1));
    [resultado[indice], resultado[indiceAleatorio]] = [
      resultado[indiceAleatorio],
      resultado[indice],
    ];
  }

  return resultado;
}
