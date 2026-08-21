/**
 * ============================================================================
 * TRABAJO PRÁCTICO N° 2 - MODELOS Y SIMULACIÓN (UCSE)
 * ============================================================================
 * EJERCICIO 03: LA RUINA DEL APOSTADOR (Caminata 1D con Barreras Absorbentes)
 * 
 * ALUMNO ASIGNADO: ___________________________________________________________
 * 
 * ENUNCIADO:
 * Un jugador ingresa al casino con un capital inicial de `$capitalInicial` (ej. $10.000)
 * y realiza apuestas consecutivas de un monto fijo `$apuestaFija` (ej. $1.000).
 * 
 * En cada ronda:
 * - Gana la ronda con probabilidad `probVictoria` (ej. p = 0.48) sumando el monto de la apuesta.
 * - Pierde la ronda con probabilidad 1 - probVictoria (1 - p = 0.52) restando el monto.
 * 
 * La partida continúa hasta que ocurre uno de dos estados absorbentes de parada:
 * 1. Capital <= 0: El jugador queda en la RUINA.
 * 2. Capital >= meta: El jugador alcanza su META de retiro (ej. $20.000).
 * 
 * OBJETIVO:
 * Simular `replicas` partidas completas para estimar:
 * 1. La probabilidad empírica de ruina frente a la de éxito.
 * 2. El promedio y máximo de rondas que dura una partida antes de concluir.
 * 3. Registrar al menos 5 trayectorias de saldo completas para visualizarlas en el gráfico.
 * ============================================================================
 */

window.Simulaciones = window.Simulaciones || {};

/**
 * Simula el proceso de la ruina del apostador
 * @param {number} replicas - Cantidad de partidas completas (ej. 2000)
 * @param {number} capitalInicial - Saldo inicial del jugador (ej. 10000)
 * @param {number} meta - Meta de dinero para retirarse (ej. 20000)
 * @param {number} apuestaFija - Monto apostado en cada ronda (ej. 1000)
 * @param {number} probVictoria - Probabilidad de ganar una ronda (ej. 0.48)
 * @returns {object} Objeto con los resultados de la simulación
 */
window.Simulaciones.simularRuinaApostador = function(
  replicas = 2000,
  capitalInicial = 10000,
  meta = 20000,
  apuestaFija = 1000,
  probVictoria = 0.48
) {
  let ruinasTotales = 0;
  let exitosTotales = 0;
  let totalRondas = 0;
  let maxRondas = 0;
  const trayectoriasMuestra = []; // Array de arrays con el historial de saldo de las primeras 5 partidas: [[c0, c1, c2...], ...]

  // ==========================================================================
  // TODO: PROGRAMAR AQUÍ LA LÓGICA DE SIMULACIÓN DE MONTE CARLO
  // 
  // Guía paso a paso:
  // 1. Iterar por cada partida de 0 a replicas - 1:
  //    a. Inicializar: saldo = capitalInicial, rondas = 0.
  //    b. Si la partida actual es una de las primeras 5 (partida < 5), crear un array
  //       de historial para guardar la evolución: const historial = [saldo].
  //    c. Mientras saldo > 0 y saldo < meta:
  //       - Incrementar rondas++.
  //       - Generar u = Math.random().
  //       - Si u < probVictoria -> saldo += apuestaFija; de lo contrario -> saldo -= apuestaFija.
  //       - Si partida < 5 -> historial.push(saldo).
  //    d. Al terminar la partida:
  //       - Si saldo <= 0 -> ruinasTotales++.
  //       - Si saldo >= meta -> exitosTotales++.
  //       - totalRondas += rondas.
  //       - Si rondas > maxRondas -> maxRondas = rondas.
  //       - Si partida < 5 -> trayectoriasMuestra.push(historial).
  // 2. Calcular porcentajes y promedios.
  // ==========================================================================


  // --------------------------------------------------------------------------
  // RETORNO DE RESULTADOS
  // (Asegúrate de completar las variables antes de retornar)
  // --------------------------------------------------------------------------
  const probRuina = replicas > 0 ? (ruinasTotales / replicas) * 100 : 0;
  const probExito = replicas > 0 ? (exitosTotales / replicas) * 100 : 0;
  const promedioRondas = replicas > 0 ? (totalRondas / replicas) : 0;

  return {
    replicas: replicas,
    ruinasTotales: ruinasTotales,
    exitosTotales: exitosTotales,
    probabilidadRuina: probRuina,
    probabilidadExito: probExito,
    promedioRondas: promedioRondas,
    maxRondas: maxRondas,
    trayectoriasMuestra: trayectoriasMuestra
  };
};
