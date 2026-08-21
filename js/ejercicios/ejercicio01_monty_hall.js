/**
 * ============================================================================
 * TRABAJO PRÁCTICO N° 2 - MODELOS Y SIMULACIÓN (UCSE)
 * ============================================================================
 * EJERCICIO 01: PARADOJA DE MONTY HALL
 * 
 * ALUMNO ASIGNADO: ___________________________________________________________
 * 
 * ENUNCIADO:
 * En un concurso televisivo hay 3 puertas cerradas (0, 1 y 2). Detrás de una de ellas
 * hay un automóvil cero kilómetro y detrás de las otras dos hay cabras.
 * 
 * Secuencia del juego:
 * 1. El concursante selecciona una puerta al azar.
 * 2. El presentador (que conoce con certeza dónde está el premio) abre una de las
 *    otras dos puertas que contiene una cabra (nunca abre la puerta del jugador
 *    ni la del auto).
 * 3. El presentador le ofrece la opción de:
 *    - Estrategia A: Mantener su elección inicial.
 *    - Estrategia B: Cambiar a la otra puerta cerrada restante.
 * 
 * OBJETIVO:
 * Simular `replicas` partidas completas evaluando ambas estrategias para determinar
 * empíricamente cuál es la probabilidad de ganar el automóvil en cada caso.
 * ============================================================================
 */

window.Simulaciones = window.Simulaciones || {};

/**
 * Simula el juego de Monty Hall
 * @param {number} replicas - Cantidad de réplicas/partidas a simular (ej. 1000)
 * @param {number} numPuertas - Cantidad de puertas en el concurso (por defecto: 3)
 * @returns {object} Objeto con los resultados de la simulación
 */
window.Simulaciones.simularMontyHall = function(replicas = 1000, numPuertas = 3) {
  let victoriasMantener = 0;
  let victoriasCambiar = 0;

  // ==========================================================================
  // TODO: PROGRAMAR AQUÍ LA LÓGICA DE SIMULACIÓN DE MONTE CARLO
  // 
  // Guía paso a paso:
  // 1. Ejecutar un bucle de 0 a replicas - 1.
  // 2. En cada iteración:
  //    a. Generar la puerta donde está el auto: entero aleatorio entre 0 y numPuertas - 1.
  //    b. Generar la elección inicial del concursante: entero aleatorio entre 0 y numPuertas - 1.
  //    c. Evaluar si la estrategia "Mantener" gana (cuando eleccionInicial === puertaAuto).
  //    d. Evaluar si la estrategia "Cambiar" gana (cuando el presentador descarta una cabra
  //       y el participante elige la otra puerta cerrada).
  // 3. Calcular las probabilidades porcentuales: (victorias / replicas) * 100.
  // ==========================================================================


  // --------------------------------------------------------------------------
  // RETORNO DE RESULTADOS
  // (Asegúrate de completar las variables antes de retornar)
  // --------------------------------------------------------------------------
  const probMantener = replicas > 0 ? (victoriasMantener / replicas) * 100 : 0;
  const probCambiar = replicas > 0 ? (victoriasCambiar / replicas) * 100 : 0;

  return {
    replicas: replicas,
    victoriasMantener: victoriasMantener,
    victoriasCambiar: victoriasCambiar,
    probabilidadMantener: probMantener,
    probabilidadCambiar: probCambiar,
    conclusion: victoriasCambiar > victoriasMantener
      ? "La estrategia de cambiar ofrece una ventaja probabilística significativa."
      : "Pendiente de simulación por el alumno."
  };
};
