/**
 * ============================================================================
 * TRABAJO PRÁCTICO N° 2 - MODELOS Y SIMULACIÓN (UCSE)
 * ============================================================================
 * EJERCICIO 02: DRON DE INSPECCIÓN CON DERIVA POR VIENTO (Caminata Aleatoria 2D)
 * 
 * ALUMNO ASIGNADO: ___________________________________________________________
 * 
 * ENUNCIADO:
 * Un dron autónomo despega de su base ubicada en el origen de coordenadas (0,0).
 * Debido al viento, en cada minuto de vuelo el dron se desplaza 1 unidad en una
 * cuadrícula en una de las cuatro direcciones cardinales con las siguientes probabilidades:
 *   - Norte (y + 1):  35% (p = 0.35)
 *   - Sur   (y - 1):  15% (p = 0.15)
 *   - Este  (x + 1):  25% (p = 0.25)
 *   - Oeste (x - 1):  25% (p = 0.25)
 * 
 * La batería le permite exactamente `bateriaPasos` movimientos (por defecto 30).
 * Si al terminar su batería se encuentra a una distancia euclidiana mayor a `radioCritico`
 * de la base (distancia = sqrt(x^2 + y^2) > radioCritico), se considera que el dron
 * cayó fuera de la zona segura de recuperación.
 * 
 * OBJETIVO:
 * Simular `replicas` vuelos completos para determinar:
 * 1. La probabilidad de aterrizar fuera del radio de seguridad.
 * 2. La distancia euclidiana promedio final a la base.
 * 3. La distribución de aterrizajes por cuadrante (I, II, III, IV) y sobre los ejes.
 * ============================================================================
 */

window.Simulaciones = window.Simulaciones || {};

/**
 * Simula la caminata 2D del dron con deriva de viento
 * @param {number} replicas - Cantidad de vuelos completos (ej. 1000)
 * @param {number} bateriaPasos - Pasos máximos por vuelo (ej. 30)
 * @param {object} probViento - Objeto con probabilidades { norte: 0.35, sur: 0.15, este: 0.25, oeste: 0.25 }
 * @param {number} radioCritico - Límite de distancia de seguridad (ej. 10)
 * @returns {object} Objeto con los resultados de la simulación
 */
window.Simulaciones.simularDronViento = function(
  replicas = 1000,
  bateriaPasos = 30,
  probViento = { norte: 0.35, sur: 0.15, este: 0.25, oeste: 0.25 },
  radioCritico = 10
) {
  let aterrizajesFueraRadio = 0;
  let sumaDistancias = 0;
  const puntosFinales = []; // Array de objetos { x: number, y: number } para graficar en Canvas
  const cuadrantes = { Q1: 0, Q2: 0, Q3: 0, Q4: 0, Ejes: 0 };

  // ==========================================================================
  // TODO: PROGRAMAR AQUÍ LA LÓGICA DE SIMULACIÓN DE MONTE CARLO
  // 
  // Guía paso a paso:
  // 1. Definir los límites acumulados para el método de la transformada inversa:
  //    - Norte: [0, pNorte)
  //    - Sur:   [pNorte, pNorte + pSur)
  //    - Este:  [pNorte + pSur, pNorte + pSur + pEste)
  //    - Oeste: [pNorte + pSur + pEste, 1.0]
  // 2. Iterar por cada réplica de vuelo (0 a replicas - 1):
  //    a. Inicializar posición: x = 0, y = 0.
  //    b. Ejecutar un bucle de 0 a bateriaPasos - 1:
  //       - Generar un número aleatorio u = Math.random().
  //       - Actualizar (x, y) según el intervalo donde cayó u.
  //    c. Guardar la posición final: puntosFinales.push({ x, y }).
  //    d. Calcular distancia = Math.sqrt(x * x + y * y) y acumularla en sumaDistancias.
  //    e. Si distancia > radioCritico -> incrementar aterrizajesFueraRadio.
  //    f. Clasificar en cuadrantes:
  //       - Q1: x > 0 && y > 0 (Noreste)
  //       - Q2: x < 0 && y > 0 (Noroeste)
  //       - Q3: x < 0 && y < 0 (Suroeste)
  //       - Q4: x > 0 && y < 0 (Sureste)
  //       - Ejes: x === 0 || y === 0
  // ==========================================================================


  // --------------------------------------------------------------------------
  // RETORNO DE RESULTADOS
  // (Asegúrate de completar las variables antes de retornar)
  // --------------------------------------------------------------------------
  const distMedia = replicas > 0 ? (sumaDistancias / replicas) : 0;
  const probFuera = replicas > 0 ? (aterrizajesFueraRadio / replicas) * 100 : 0;

  return {
    replicas: replicas,
    puntosFinales: puntosFinales,
    aterrizajesFueraRadio: aterrizajesFueraRadio,
    probabilidadFueraRadio: probFuera,
    distanciaPromedioFinal: distMedia,
    distribucionCuadrantes: cuadrantes,
    cuadranteMasFrecuente: "Pendiente de simulación"
  };
};
