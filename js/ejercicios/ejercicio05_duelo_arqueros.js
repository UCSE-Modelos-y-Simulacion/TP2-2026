/**
 * ============================================================================
 * TRABAJO PRÁCTICO N° 2 - MODELOS Y SIMULACIÓN (UCSE)
 * ============================================================================
 * EJERCICIO 05: DUELO DE PUNTERÍA POR TURNOS
 * 
 * ALUMNO ASIGNADO: ___________________________________________________________
 * 
 * ENUNCIADO:
 * Dos arqueros compiten en un duelo por turnos disparando a una diana:
 * - Arquero A: Probabilidad de acertar en cada disparo `probA` (por defecto p_A = 0.30).
 * - Arquero B: Probabilidad de acertar en cada disparo `probB` (por defecto p_B = 0.45).
 * - El parámetro `iniciaPrimero` define quién efectúa el primer tiro ('A' o 'B').
 * 
 * El duelo se desarrolla de forma alternada (ej. A -> B -> A -> B...) y concluye
 * inmediatamente en el instante en que uno de los dos arqueros acierta el blanco.
 * 
 * OBJETIVO:
 * Simular `replicas` duelos completos para determinar:
 * 1. La probabilidad de victoria del Arquero A y del Arquero B.
 * 2. El número promedio de disparos totales por duelo.
 * 3. Analizar si la ventaja de disparar primero compensa una menor puntería.
 * ============================================================================
 */

window.Simulaciones = window.Simulaciones || {};

/**
 * Simula el duelo de arqueros por turnos
 * @param {number} replicas - Cantidad de duelos a simular (ej. 2000)
 * @param {number} probA - Probabilidad de acierto del arquero A (ej. 0.30)
 * @param {number} probB - Probabilidad de acierto del arquero B (ej. 0.45)
 * @param {string} iniciaPrimero - Identificador del tirador inicial ('A' o 'B')
 * @returns {object} Objeto con los resultados de la simulación
 */
window.Simulaciones.simularDueloArqueros = function(
  replicas = 2000,
  probA = 0.30,
  probB = 0.45,
  iniciaPrimero = 'A'
) {
  let victoriasA = 0;
  let victoriasB = 0;
  let totalDisparos = 0;

  // ==========================================================================
  // TODO: PROGRAMAR AQUÍ LA LÓGICA DE SIMULACIÓN DE MONTE CARLO
  // 
  // Guía paso a paso:
  // 1. Iterar por cada duelo de 0 a replicas - 1:
  //    a. Inicializar: turno = iniciaPrimero, disparosDuelo = 0, finDuelo = false.
  //    b. Mientras no finDuelo:
  //       - disparosDuelo++.
  //       - Si turno === 'A':
  //         * Generar u = Math.random().
  //         * Si u < probA -> victoriasA++, finDuelo = true.
  //         * Si no -> turno = 'B'.
  //       - Si turno === 'B':
  //         * Generar u = Math.random().
  //         * Si u < probB -> victoriasB++, finDuelo = true.
  //         * Si no -> turno = 'A'.
  //    c. totalDisparos += disparosDuelo.
  // 2. Calcular probabilidades porcentuales y promedio de tiros.
  // ==========================================================================
  for (let i=0; i<replicas; i++){
      let turno = iniciaPrimero;
      let finDuelo = false;
      let disparosDuelo = 0;
      let u;

      while (finDuelo === false){
        disparosDuelo++;
        if (turno === 'A'){
          u = Math.random();
          if (u < probA){
            victoriasA++;
            finDuelo = true;
          } else {
            turno = 'B';
          }
        } else {
          u = Math.random();
          if (u < probB) {
            victoriasB++;
            finDuelo = true;
          } else {
            turno = 'A';
          }
        }
      }
      totalDisparos += disparosDuelo;
    }
  // --------------------------------------------------------------------------
  // RETORNO DE RESULTADOS
  // (Asegúrate de completar las variables antes de retornar)
  // --------------------------------------------------------------------------
  const probVictoriaA = replicas > 0 ? (victoriasA / replicas) * 100 : 0;
  const probVictoriaB = replicas > 0 ? (victoriasB / replicas) * 100 : 0;
  const promedioDisparos = replicas > 0 ? (totalDisparos / replicas) : 0;

  return {
    replicas: replicas,
    victoriasA: victoriasA,
    victoriasB: victoriasB,
    probabilidadA: probVictoriaA,
    probabilidadB: probVictoriaB,
    promedioDisparos: promedioDisparos
  };
};
