/**
 * ============================================================================
 * TRABAJO PRÁCTICO N° 2 - MODELOS Y SIMULACIÓN (UCSE)
 * ============================================================================
 * EJERCICIO 06: EL VENDEDOR DE DIARIOS (Newsboy Problem)
 * 
 * ALUMNO ASIGNADO: ___________________________________________________________
 * 
 * ENUNCIADO:
 * Un canillita compra diarios al inicio de la mañana a un costo `costoUnitario` (ej. $800)
 * y los vende a sus clientes a un precio `precioVenta` (ej. $2.000).
 * Los periódicos que no logra vender al finalizar la jornada se devuelven para reciclaje
 * a un valor de rescate `valorRescate` (ej. $100).
 * 
 * La demanda diaria de diarios (D) es una variable aleatoria discreta con la siguiente
 * distribución de probabilidades:
 *   - D = 50  diarios: 15% (p = 0.15)
 *   - D = 100 diarios: 35% (p = 0.35)
 *   - D = 150 diarios: 30% (p = 0.30)
 *   - D = 200 diarios: 20% (p = 0.20)
 * 
 * El vendedor debe evaluar una política de compra diaria fija `politicaSeleccionada` (Q)
 * entre las opciones {50, 100, 150, 200}.
 * 
 * Fórmulas de balance diario:
 * - Ventas Reales = min(Demanda, Q)
 * - Sobrante = max(0, Q - Demanda)
 * - Faltante = max(0, Demanda - Q)
 * - Ingresos = (Ventas Reales * precioVenta) + (Sobrante * valorRescate)
 * - Costos = Q * costoUnitario
 * - Beneficio Neto Diario = Ingresos - Costos
 * 
 * OBJETIVO:
 * Simular `replicas` días para la política Q seleccionada y para las demás opciones
 * {50, 100, 150, 200} para determinar qué política maximiza el beneficio neto esperado.
 * ============================================================================
 */

window.Simulaciones = window.Simulaciones || {};

/**
 * Simula el problema del vendedor de diarios
 * @param {number} replicas - Cantidad de jornadas diarias a simular (ej. 1000)
 * @param {number} costoUnitario - Costo de compra por diario (ej. 800)
 * @param {number} precioVenta - Precio de venta al público (ej. 2000)
 * @param {number} valorRescate - Valor de recupero por diario no vendido (ej. 100)
 * @param {number} politicaSeleccionada - Cantidad Q pedida diariamente (ej. 100)
 * @returns {object} Objeto con los resultados de la simulación
 */
window.Simulaciones.simularVendedorDiarios = function(
  replicas = 1000,
  costoUnitario = 800,
  precioVenta = 2000,
  valorRescate = 100,
  politicaSeleccionada = 100
) {
  let beneficioTotal = 0;
  let diasConSobrante = 0;
  let diasConFaltante = 0;

  // Función auxiliar para generar la demanda diaria discreta D:
  const generarDemanda = () => {
    const u = Math.random();
    if (u < 0.15) return 50;
    if (u < 0.50) return 100; // 0.15 + 0.35
    if (u < 0.80) return 150; // 0.50 + 0.30
    return 200;
  };

  // ==========================================================================
  // TODO: PROGRAMAR AQUÍ LA LÓGICA DE SIMULACIÓN DE MONTE CARLO
  // 
  // Guía paso a paso:
  // 1. Simular las jornadas para la `politicaSeleccionada` (Q):
  for (let i = 0; i < replicas; i++) {
  //    - Por cada día (0 a replicas - 1):
  //      a. Generar demanda = generarDemanda().
    const demanda = generarDemanda();
  //      b. Calcular ventas = Math.min(demanda, politicaSeleccionada).
    const ventas = Math.min(demanda, politicaSeleccionada);
  //      c. Calcular sobrante = Math.max(0, politicaSeleccionada - demanda).
    const sobrante = Math.max(0, politicaSeleccionada - demanda);
  //      d. Calcular faltante = Math.max(0, demanda - politicaSeleccionada).
    const faltante = Math.max(0, demanda - politicaSeleccionada);
  //      e. Calcular ingreso = (ventas * precioVenta) + (sobrante * valorRescate).
    const ingreso = (ventas * precioVenta) + (sobrante * valorRescate);
  //      f. Calcular costo = politicaSeleccionada * costoUnitario.
    const costo = politicaSeleccionada * costoUnitario;
  //      g. beneficioTotal += (ingreso - costo).
    beneficioTotal += (ingreso - costo);
  //      h. Contabilizar días con sobrante y días con faltante.
    if (sobrante > 0) diasConSobrante++;
    if (faltante > 0) diasConFaltante++;
  }
  //
  // 2. Evaluar la comparativa para todas las políticas estándar [50, 100, 150, 200]:
  //    - Para cada Q_test in [50, 100, 150, 200], simular `replicas` días y calcular
  //      su beneficioMedio y su probFaltante.
  // ==========================================================================

  // Estructura para la tabla comparativa de políticas:
  const politicas = [50, 100, 150, 200];
  const comparativa = politicas.map(Q => {
    let beneficioAcumuladoQ = 0;
    let diasFaltanteQ = 0;

    for (let i = 0; i < replicas; i++) {
      const demanda = generarDemanda();
      const ventas = Math.min(demanda, Q);
      const sobrante = Math.max(0, Q - demanda);
      const faltante = Math.max(0, demanda - Q);

      const ingreso = (ventas * precioVenta) + (sobrante * valorRescate);
      const costo = Q * costoUnitario;

      beneficioAcumuladoQ += (ingreso - costo);

      if (faltante > 0) {
        diasFaltanteQ++;
      }
    }

    return {
      Q: Q,
      beneficioMedio: replicas > 0 ? (beneficioAcumuladoQ / replicas) : 0, // Completar con el beneficio promedio obtenido para este Q
      probFaltante: replicas > 0 ? (diasFaltanteQ / replicas) * 100 : 0    // Completar con el % de días con faltante para este Q
    };
  });


  // --------------------------------------------------------------------------
  // RETORNO DE RESULTADOS
  // (Asegúrate de completar las variables antes de retornar)
  // --------------------------------------------------------------------------
  const beneficioPromedio = replicas > 0 ? (beneficioTotal / replicas) : 0;
  const probSobrante = replicas > 0 ? (diasConSobrante / replicas) * 100 : 0;
  const probFaltante = replicas > 0 ? (diasConFaltante / replicas) * 100 : 0;

  return {
    replicas: replicas,
    politicaSeleccionada: politicaSeleccionada,
    beneficioPromedio: beneficioPromedio,
    diasConSobrante: diasConSobrante,
    diasConFaltante: diasConFaltante,
    probabilidadSobrante: probSobrante,
    probabilidadFaltante: probFaltante,
    comparativaPoliticas: comparativa
  };
};
