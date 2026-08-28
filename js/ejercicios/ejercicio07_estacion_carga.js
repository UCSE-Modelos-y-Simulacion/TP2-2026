/**
 * ============================================================================
 * TRABAJO PRÁCTICO N° 2 - MODELOS Y SIMULACIÓN (UCSE)
 * ============================================================================
 * EJERCICIO 07: ESTACIÓN DE CARGA DE VEHÍCULOS ELÉCTRICOS
 * 
 * ALUMNO ASIGNADO: ___________________________________________________________
 * 
 * ENUNCIADO:
 * A una estación de servicio con cargadores rápidos arriban entre `minAutos` y `maxAutos`
 * vehículos por día (distribución uniforme discreta entre 40 y 70 autos).
 * 
 * Cada vehículo demanda energía según su modalidad de recarga:
 * - Carga estándar (60% de los autos, p = 0.60): Demanda entre 20 y 40 kWh
 *   (distribución uniforme continua U[20, 40]).
 * - Carga completa (40% de los autos, p = 0.40): Demanda entre 50 y 80 kWh
 *   (distribución uniforme continua U[50, 80]).
 * 
 * Facturación y Penalidades:
 * - La estación cobra una tarifa de `$tarifaKwh` (ej. $150) por cada kWh despachado.
 * - Si el consumo diario total de la estación supera el límite contratado `limitePotencia`
 *   (ej. 3.000 kWh), la distribuidora eléctrica aplica una penalización fija de
 *   `$penalizacion` (ej. $50.000) que se deduce de la recaudación del día.
 * 
 * OBJETIVO:
 * Simular `replicas` jornadas diarias de operación para determinar:
 * 1. La ganancia neta diaria promedio (descontando penalidades).
 * 2. El consumo total diario promedio (kWh).
 * 3. La probabilidad de superar el límite de potencia y pagar la penalización.
 * 4. Registrar los consumos diarios en un array para graficar el histograma de frecuencias.
 * ============================================================================
 */

window.Simulaciones = window.Simulaciones || {};

/**
 * Simula las jornadas de la estación de carga eléctrica
 * @param {number} replicas - Cantidad de jornadas diarias a simular (ej. 1000)
 * @param {number} minAutos - Mínimo de autos diarios (ej. 40)
 * @param {number} maxAutos - Máximo de autos diarios (ej. 70)
 * @param {number} tarifaKwh - Tarifa por kWh (ej. 150)
 * @param {number} limitePotencia - Límite de potencia sin penalización (ej. 3000)
 * @param {number} penalizacion - Penalización fija en pesos (ej. 50000)
 * @returns {object} Objeto con los resultados de la simulación
 */
window.Simulaciones.simularEstacionCarga = function(
  replicas = 1000,
  minAutos = 40,
  maxAutos = 70,
  tarifaKwh = 150,
  limitePotencia = 3000,
  penalizacion = 50000
) {
  let gananciaTotal = 0;
  let consumoTotalAcumulado = 0;
  let diasConPenalizacion = 0;
  const muestrasConsumo = []; // Array numérico con el consumo total de cada día [consumoDia1, consumoDia2, ...]

  // ==========================================================================
  // TODO: PROGRAMAR AQUÍ LA LÓGICA DE SIMULACIÓN DE MONTE CARLO
  // 
  // Guía paso a paso:
  // 1. Iterar por cada día (0 a replicas - 1):
  //    a. Generar cantidad de autos del día (Uniforme Discreta):
  //       const cantAutos = Math.floor(Math.random() * (maxAutos - minAutos + 1)) + minAutos;
  //    b. Inicializar consumoDia = 0.
  //    c. Por cada auto (0 a cantAutos - 1):
  //       - Si Math.random() < 0.60:
  //         * Carga Estándar: consumoDia += 20 + Math.random() * (40 - 20);
  //       - Si no:
  //         * Carga Completa: consumoDia += 50 + Math.random() * (80 - 50);
  //    d. Guardar en muestrasConsumo.push(consumoDia).
  //    e. Acumular consumoTotalAcumulado += consumoDia.
  //    f. Calcular ganancia del día:
  //       let gananciaDia = consumoDia * tarifaKwh;
  //       si consumoDia > limitePotencia -> diasConPenalizacion++ y gananciaDia -= penalizacion.
  //    g. gananciaTotal += gananciaDia.
  // 2. Calcular promedios y probabilidad porcentual de penalización.
  // ==========================================================================
for (let i = 0; i < replicas; i++) {
    // a. Generar cantidad de autos
    const cantAutos = Math.floor(Math.random() * (maxAutos - minAutos + 1)) + minAutos;
    let consumoDia = 0;

    // c. Calcular consumo de cada vehicu
    for (let j = 0; j < cantAutos; j++) {
      const probModalidad = Math.random();

      if (probModalidad < 0.60) {
        // Carga Estándar 60% prob
        consumoDia += 20 + Math.random() * (40 - 20);
      } else {
        // Carga Completa 40% prob
        consumoDia += 50 + Math.random() * (80 - 50);
      }
    }

    // Registra y acumula el consumo del día
    muestrasConsumo.push(consumoDia);
    consumoTotalAcumulado += consumoDia;

    let gananciaDia = consumoDia * tarifaKwh;

    if (consumoDia > limitePotencia) {
      diasConPenalizacion++;
      gananciaDia -= penalizacion;
    }

    gananciaTotal += gananciaDia;
  }

  // --------------------------------------------------------------------------
  // RETORNO DE RESULTADOS
  // (Asegúrate de completar las variables antes de retornar)
  // --------------------------------------------------------------------------
  const gananciaPromedio = replicas > 0 ? (gananciaTotal / replicas) : 0;
  const consumoPromedio = replicas > 0 ? (consumoTotalAcumulado / replicas) : 0;
  const probPenalizacion = replicas > 0 ? (diasConPenalizacion / replicas) * 100 : 0;

  return {
    replicas: replicas,
    gananciaPromedio: gananciaPromedio,
    consumoPromedio: consumoPromedio,
    diasConPenalizacion: diasConPenalizacion,
    probabilidadPenalizacion: probPenalizacion,
    muestrasConsumo: muestrasConsumo
  };
};
