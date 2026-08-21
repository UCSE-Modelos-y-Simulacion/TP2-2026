/**
 * ============================================================================
 * TRABAJO PRÁCTICO N° 2 - MODELOS Y SIMULACIÓN (UCSE)
 * ============================================================================
 * EJERCICIO 04: BLACKJACK SIMPLIFICADO (Juego del 21)
 * 
 * ALUMNO ASIGNADO: ___________________________________________________________
 * 
 * ENUNCIADO:
 * En una mesa de Blackjack simplificada se enfrentan un Jugador y la Banca:
 * 1. Las cartas tienen valores del 1 al 10 uniformemente distribuidos con reposición.
 * 2. El jugador recibe inicialmente 2 cartas. Si su suma es menor que `umbralJugador`
 *    (por defecto 17), está obligado a robar cartas adicionales una a una.
 * 3. Si la suma del jugador supera 21, se pasa y pierde la mano de inmediato.
 * 4. Si el jugador se planta (suma <= 21), la banca roba cartas hasta alcanzar su propio
 *    `umbralBanca` (por defecto 17).
 * 5. Criterio de victoria:
 *    - Si la banca supera 21 -> Gana el Jugador.
 *    - Si la banca no se pasa: Gana quien tenga mayor puntaje.
 *    - En caso de empate en puntaje -> Gana la Banca (ventaja de la casa).
 * 
 * OBJETIVO:
 * Simular `replicas` manos para determinar:
 * 1. La probabilidad de victoria del jugador vs. la banca.
 * 2. El porcentaje de manos en las que el jugador o la banca se pasan de 21.
 * ============================================================================
 */

window.Simulaciones = window.Simulaciones || {};

/**
 * Simula manos de Blackjack simplificado
 * @param {number} replicas - Cantidad de manos a simular (ej. 5000)
 * @param {number} umbralJugador - Umbral mínimo de parada del jugador (ej. 17)
 * @param {number} umbralBanca - Umbral mínimo de parada de la banca (ej. 17)
 * @returns {object} Objeto con los resultados de la simulación
 */
window.Simulaciones.simularBlackjack = function(
  replicas = 5000,
  umbralJugador = 17,
  umbralBanca = 17
) {
  let victoriasJugador = 0;
  let victoriasBanca = 0;
  let jugadorSePasa = 0;
  let bancaSePasa = 0;

  // Función auxiliar para robar una carta aleatoria entre 1 y 10:
  const robarCarta = () => Math.floor(Math.random() * 10) + 1;

  // ==========================================================================
  // TODO: PROGRAMAR AQUÍ LA LÓGICA DE SIMULACIÓN DE MONTE CARLO
  // 
  // Guía paso a paso:
  // 1. Iterar por cada mano (0 a replicas - 1):
  //    a. Turno del Jugador:
  //       - Suma inicial: sumaJugador = robarCarta() + robarCarta().
  //       - Mientras sumaJugador < umbralJugador: sumaJugador += robarCarta().
  //       - Si sumaJugador > 21:
  //         * jugadorSePasa++.
  //         * victoriasBanca++.
  //         * Continuar con la siguiente mano (continue).
  //    b. Turno de la Banca:
  //       - Suma inicial: sumaBanca = robarCarta() + robarCarta().
  //       - Mientras sumaBanca < umbralBanca: sumaBanca += robarCarta().
  //    c. Comparación final:
  //       - Si sumaBanca > 21 -> bancaSePasa++ y victoriasJugador++.
  //       - De lo contrario, si sumaJugador > sumaBanca -> victoriasJugador++.
  //       - De lo contrario (sumaBanca >= sumaJugador) -> victoriasBanca++.
  // 2. Calcular probabilidades porcentuales.
  // ==========================================================================


  // --------------------------------------------------------------------------
  // RETORNO DE RESULTADOS
  // (Asegúrate de completar las variables antes de retornar)
  // --------------------------------------------------------------------------
  const probJugador = replicas > 0 ? (victoriasJugador / replicas) * 100 : 0;
  const probBanca = replicas > 0 ? (victoriasBanca / replicas) * 100 : 0;

  return {
    replicas: replicas,
    victoriasJugador: victoriasJugador,
    victoriasBanca: victoriasBanca,
    jugadorSePasa: jugadorSePasa,
    bancaSePasa: bancaSePasa,
    probabilidadJugador: probJugador,
    probabilidadBanca: probBanca
  };
};
