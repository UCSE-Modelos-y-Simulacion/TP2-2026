/**
 * Controlador de Interfaz de Usuario y Orquestador de Simulaciones
 * Modelos y Simulación - UCSE
 */

document.addEventListener('DOMContentLoaded', () => {
  // Catálogo de Ejercicios y su archivo asignado
  const ejerciciosConfig = {
    'monty-hall': {
      numero: '01',
      titulo: 'Paradoja de Monty Hall',
      archivo: 'js/ejercicios/ejercicio01_monty_hall.js',
      categoria: 'Toma de Decisiones y Probabilidad Condicional',
      guia: 'simularMontyHall(replicas, numPuertas)',
      descripcion: 'En un concurso televisivo hay 3 puertas. Detrás de una hay un auto y detrás de las otras dos hay cabras. Tras elegir una puerta, el presentador abre otra que oculta una cabra y le ofrece cambiar de puerta. ¿Conviene cambiar o mantener?',
      renderInputs() {
        return `
          <div class="form-group">
            <label class="form-label">Número de Réplicas (Juegos) <span class="unit">N</span></label>
            <input type="number" id="inp-replicas" class="form-control" value="1000" min="100" max="100000" step="100">
          </div>
          <div class="form-group">
            <label class="form-label">Cantidad de Puertas <span class="unit">k</span></label>
            <input type="number" id="inp-puertas" class="form-control" value="3" min="3" max="10" step="1">
          </div>
        `;
      },
      ejecutar() {
        const replicas = parseInt(document.getElementById('inp-replicas').value, 10) || 1000;
        const puertas = parseInt(document.getElementById('inp-puertas').value, 10) || 3;
        
        const t0 = performance.now();
        const fn = window.Simulaciones?.simularMontyHall;
        if (!fn) throw new Error("La función 'simularMontyHall' no está definida.");
        const res = fn(replicas, puertas);
        const t1 = performance.now();
        
        return { res, timeMs: (t1 - t0).toFixed(2) };
      },
      renderResultados(data, timeMs) {
        const { res } = data;
        const noImplementado = res.victoriasCambiar === 0 && res.victoriasMantener === 0;

        return `
          ${noImplementado ? `
            <div class="status-warning" style="margin-bottom: 1.25rem;">
              <strong>ℹ️ Ejercicio pendiente de resolución:</strong>
              <p>Abre <code>js/ejercicios/ejercicio01_monty_hall.js</code> e implementa la función <code>simularMontyHall</code>.</p>
            </div>
          ` : ''}

          <div class="kpi-grid">
            <div class="kpi-card">
              <span class="kpi-label">P(Victoria Cambiando)</span>
              <span class="kpi-value cyan">${(res.probabilidadCambiar || 0).toFixed(1)}%</span>
              <span class="kpi-subtext">${(res.victoriasCambiar || 0).toLocaleString()} de ${(res.replicas || 0).toLocaleString()} partidas</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">P(Victoria Manteniendo)</span>
              <span class="kpi-value rose">${(res.probabilidadMantener || 0).toFixed(1)}%</span>
              <span class="kpi-subtext">${(res.victoriasMantener || 0).toLocaleString()} de ${(res.replicas || 0).toLocaleString()} partidas</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">Diferencial de Éxito</span>
              <span class="kpi-value emerald">+${((res.probabilidadCambiar || 0) - (res.probabilidadMantener || 0)).toFixed(1)}%</span>
              <span class="kpi-subtext">Ventaja al cambiar</span>
            </div>
          </div>

          <div class="visualization-card">
            <div class="viz-header">
              <h3 class="viz-title">Comparativa de Estrategias (Porcentaje de Victorias)</h3>
              <span class="benchmark-badge">⏱️ ${timeMs} ms</span>
            </div>
            <div class="viz-canvas-wrapper">
              <canvas id="viz-canvas" width="600" height="260"></canvas>
            </div>
          </div>

          <div class="analysis-box">
            <div class="analysis-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div class="analysis-content">
              <h4>Interpretación del Modelo:</h4>
              <p>${res.conclusion || 'Pendiente de análisis del estudiante.'}</p>
            </div>
          </div>
        `;
      },
      postRender(data) {
        const { res } = data;
        const canvas = document.getElementById('viz-canvas');
        Visualizadores.drawBarChart(canvas, [
          { label: 'Estrategia: Cambiar', value: res.probabilidadCambiar || 0, color: '#38bdf8', colorEnd: 'rgba(56, 189, 248, 0.4)', sublabel: 'Prob. Teórica ~ 66.7%' },
          { label: 'Estrategia: Mantener', value: res.probabilidadMantener || 0, color: '#f43f5e', colorEnd: 'rgba(244, 63, 94, 0.4)', sublabel: 'Prob. Teórica ~ 33.3%' }
        ], { isPercent: true, maxValue: 100 });
      }
    },

    'dron-viento': {
      numero: '02',
      titulo: 'Dron con Deriva por Viento',
      archivo: 'js/ejercicios/ejercicio02_dron_viento.js',
      categoria: 'Caminata Aleatoria 2D y Procesos Espaciales',
      guia: 'simularDronViento(replicas, bateria, probViento, radio)',
      descripcion: 'Un dron despega de la base (0,0) con batería para N pasos. En cada paso sufre deriva por viento: Norte (35%), Sur (15%), Este (25%), Oeste (25%). Se evalúa la probabilidad de quedar fuera del radio de seguridad.',
      renderInputs() {
        return `
          <div class="form-group">
            <label class="form-label">Réplicas de Vuelo <span class="unit">N</span></label>
            <input type="number" id="inp-dron-replicas" class="form-control" value="1000" min="100" max="10000" step="100">
          </div>
          <div class="form-group">
            <label class="form-label">Pasos de Batería <span class="unit">Pasos</span></label>
            <input type="number" id="inp-dron-pasos" class="form-control" value="30" min="10" max="100">
          </div>
          <div class="form-group">
            <label class="form-label">Radio Crítico de Seguridad <span class="unit">R (cuadras)</span></label>
            <input type="number" id="inp-dron-radio" class="form-control" value="10" min="2" max="30">
          </div>
          <div class="form-group">
            <label class="form-label">Probabilidades de Viento</label>
            <div class="form-control-row">
              <input type="text" class="form-control" value="N: 35% | S: 15%" readonly style="color: #94a3b8; font-size: 0.75rem;">
              <input type="text" class="form-control" value="E: 25% | O: 25%" readonly style="color: #94a3b8; font-size: 0.75rem;">
            </div>
          </div>
        `;
      },
      ejecutar() {
        const replicas = parseInt(document.getElementById('inp-dron-replicas').value, 10) || 1000;
        const pasos = parseInt(document.getElementById('inp-dron-pasos').value, 10) || 30;
        const radio = parseFloat(document.getElementById('inp-dron-radio').value) || 10;
        
        const t0 = performance.now();
        const fn = window.Simulaciones?.simularDronViento;
        if (!fn) throw new Error("La función 'simularDronViento' no está definida.");
        const res = fn(replicas, pasos, { norte: 0.35, sur: 0.15, este: 0.25, oeste: 0.25 }, radio);
        const t1 = performance.now();

        return { res, radio, timeMs: (t1 - t0).toFixed(2) };
      },
      renderResultados(data, timeMs) {
        const { res } = data;
        const q = res.distribucionCuadrantes || { Q1: 0, Q2: 0, Q3: 0, Q4: 0, Ejes: 0 };
        const noImplementado = !res.puntosFinales || res.puntosFinales.length === 0;

        return `
          ${noImplementado ? `
            <div class="status-warning" style="margin-bottom: 1.25rem;">
              <strong>ℹ️ Ejercicio pendiente de resolución:</strong>
              <p>Abre <code>js/ejercicios/ejercicio02_dron_viento.js</code> e implementa la función <code>simularDronViento</code>.</p>
            </div>
          ` : ''}

          <div class="kpi-grid">
            <div class="kpi-card">
              <span class="kpi-label">P(Aterrizaje Fuera de Límite)</span>
              <span class="kpi-value ${(res.probabilidadFueraRadio || 0) > 50 ? 'rose' : 'amber'}">${(res.probabilidadFueraRadio || 0).toFixed(1)}%</span>
              <span class="kpi-subtext">${res.aterrizajesFueraRadio || 0} de ${res.replicas || 0} vuelos</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">Distancia Media Final</span>
              <span class="kpi-value cyan">${(res.distanciaPromedioFinal || 0).toFixed(2)}</span>
              <span class="kpi-subtext">Unidades euclidianas</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">Cuadrante Predominante</span>
              <span class="kpi-value emerald">Q1 (N-E)</span>
              <span class="kpi-subtext">${q.Q1} aterrizajes</span>
            </div>
          </div>

          <div class="visualization-card">
            <div class="viz-header">
              <h3 class="viz-title">Mapa de Dispersión 2D de Aterrizajes Finales</h3>
              <span class="benchmark-badge">⏱️ ${timeMs} ms</span>
            </div>
            <div class="viz-canvas-wrapper">
              <canvas id="viz-canvas" width="600" height="320"></canvas>
            </div>
          </div>

          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Cuadrante I (N-E)</th>
                  <th>Cuadrante II (N-O)</th>
                  <th>Cuadrante III (S-O)</th>
                  <th>Cuadrante IV (S-E)</th>
                  <th>Sobre Ejes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${q.Q1} (${res.replicas ? ((q.Q1 / res.replicas) * 100).toFixed(1) : 0}%)</td>
                  <td>${q.Q2} (${res.replicas ? ((q.Q2 / res.replicas) * 100).toFixed(1) : 0}%)</td>
                  <td>${q.Q3} (${res.replicas ? ((q.Q3 / res.replicas) * 100).toFixed(1) : 0}%)</td>
                  <td>${q.Q4} (${res.replicas ? ((q.Q4 / res.replicas) * 100).toFixed(1) : 0}%)</td>
                  <td>${q.Ejes}</td>
                </tr>
              </tbody>
            </table>
          </div>
        `;
      },
      postRender(data) {
        const { res, radio } = data;
        const canvas = document.getElementById('viz-canvas');
        if (res.puntosFinales && res.puntosFinales.length > 0) {
          Visualizadores.drawScatter2D(canvas, res.puntosFinales, { criticalRadius: radio, maxCoord: 25 });
        }
      }
    },

    'ruina-apostador': {
      numero: '03',
      titulo: 'La Ruina del Apostador',
      archivo: 'js/ejercicios/ejercicio03_ruina_apostador.js',
      categoria: 'Caminata Aleatoria 1D con Barreras Absorbentes',
      guia: 'simularRuinaApostador(replicas, capital, meta, apuesta, prob)',
      descripcion: 'Un jugador inicia con $10.000 y apuesta $1.000 por ronda con probabilidad de ganar p = 0.48. El juego termina cuando su capital llega a $0 (Ruina) o alcanza su meta de $20.000 (Éxito).',
      renderInputs() {
        return `
          <div class="form-group">
            <label class="form-label">Partidas a Simular <span class="unit">N</span></label>
            <input type="number" id="inp-ruina-replicas" class="form-control" value="2000" min="100" max="20000" step="500">
          </div>
          <div class="form-group">
            <label class="form-label">Capital Inicial <span class="unit">$</span></label>
            <input type="number" id="inp-ruina-capital" class="form-control" value="10000" min="1000" step="1000">
          </div>
          <div class="form-group">
            <label class="form-label">Meta de Retiro <span class="unit">$</span></label>
            <input type="number" id="inp-ruina-meta" class="form-control" value="20000" min="2000" step="1000">
          </div>
          <div class="form-group">
            <label class="form-label">Apuesta Fija por Ronda <span class="unit">$</span></label>
            <input type="number" id="inp-ruina-apuesta" class="form-control" value="1000" min="100" step="100">
          </div>
          <div class="form-group">
            <label class="form-label">Probabilidad de Ganar Ronda <span class="unit">p</span></label>
            <input type="number" id="inp-ruina-prob" class="form-control" value="0.48" min="0.01" max="0.99" step="0.01">
          </div>
        `;
      },
      ejecutar() {
        const replicas = parseInt(document.getElementById('inp-ruina-replicas').value, 10) || 2000;
        const capital = parseFloat(document.getElementById('inp-ruina-capital').value) || 10000;
        const meta = parseFloat(document.getElementById('inp-ruina-meta').value) || 20000;
        const apuesta = parseFloat(document.getElementById('inp-ruina-apuesta').value) || 1000;
        const prob = parseFloat(document.getElementById('inp-ruina-prob').value) || 0.48;

        const t0 = performance.now();
        const fn = window.Simulaciones?.simularRuinaApostador;
        if (!fn) throw new Error("La función 'simularRuinaApostador' no está definida.");
        const res = fn(replicas, capital, meta, apuesta, prob);
        const t1 = performance.now();

        return { res, meta, timeMs: (t1 - t0).toFixed(2) };
      },
      renderResultados(data, timeMs) {
        const { res } = data;
        const noImplementado = !res.trayectoriasMuestra || res.trayectoriasMuestra.length === 0;

        return `
          ${noImplementado ? `
            <div class="status-warning" style="margin-bottom: 1.25rem;">
              <strong>ℹ️ Ejercicio pendiente de resolución:</strong>
              <p>Abre <code>js/ejercicios/ejercicio03_ruina_apostador.js</code> e implementa la función <code>simularRuinaApostador</code>.</p>
            </div>
          ` : ''}

          <div class="kpi-grid">
            <div class="kpi-card">
              <span class="kpi-label">P(Ruina del Jugador)</span>
              <span class="kpi-value rose">${(res.probabilidadRuina || 0).toFixed(1)}%</span>
              <span class="kpi-subtext">${res.ruinasTotales || 0} partidas en quiebra</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">P(Alcanzar la Meta)</span>
              <span class="kpi-value emerald">${(res.probabilidadExito || 0).toFixed(1)}%</span>
              <span class="kpi-subtext">${res.exitosTotales || 0} partidas victoriosas</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">Duración Media</span>
              <span class="kpi-value cyan">${(res.promedioRondas || 0).toFixed(0)}</span>
              <span class="kpi-subtext">Rondas por partida (Máx: ${res.maxRondas || 0})</span>
            </div>
          </div>

          <div class="visualization-card">
            <div class="viz-header">
              <h3 class="viz-title">Muestra de Trayectorias de Saldo Temporal (5 Partidas)</h3>
              <span class="benchmark-badge">⏱️ ${timeMs} ms</span>
            </div>
            <div class="viz-canvas-wrapper">
              <canvas id="viz-canvas" width="600" height="280"></canvas>
            </div>
          </div>
        `;
      },
      postRender(data) {
        const { res, meta } = data;
        const canvas = document.getElementById('viz-canvas');
        if (res.trayectoriasMuestra && res.trayectoriasMuestra.length > 0) {
          const maxSteps = Math.max(...res.trayectoriasMuestra.map(t => t.length), 30);
          Visualizadores.drawSamplePaths(canvas, res.trayectoriasMuestra, { target: meta, maxSteps });
        }
      }
    },

    'blackjack': {
      numero: '04',
      titulo: 'Blackjack Simplificado (21)',
      archivo: 'js/ejercicios/ejercicio04_blackjack.js',
      categoria: 'Juegos de Azar y Estrategia de Parada',
      guia: 'simularBlackjack(replicas, umbralJugador, umbralBanca)',
      descripcion: 'El jugador y la banca roban cartas con valores de 1 a 10. Cada uno define un umbral de parada (por defecto 17). Si el jugador supera 21, pierde de inmediato. Si la banca supera 21 o suma menos, gana el jugador. En empate, gana la banca.',
      renderInputs() {
        return `
          <div class="form-group">
            <label class="form-label">Manos a Simular <span class="unit">N</span></label>
            <input type="number" id="inp-bj-replicas" class="form-control" value="5000" min="500" max="50000" step="1000">
          </div>
          <div class="form-group">
            <label class="form-label">Umbral de Parada del Jugador <span class="unit">Puntos</span></label>
            <input type="number" id="inp-bj-ujug" class="form-control" value="17" min="12" max="20">
          </div>
          <div class="form-group">
            <label class="form-label">Umbral de Parada de la Banca <span class="unit">Puntos</span></label>
            <input type="number" id="inp-bj-uban" class="form-control" value="17" min="12" max="20">
          </div>
        `;
      },
      ejecutar() {
        const replicas = parseInt(document.getElementById('inp-bj-replicas').value, 10) || 5000;
        const uJug = parseInt(document.getElementById('inp-bj-ujug').value, 10) || 17;
        const uBan = parseInt(document.getElementById('inp-bj-uban').value, 10) || 17;

        const t0 = performance.now();
        const fn = window.Simulaciones?.simularBlackjack;
        if (!fn) throw new Error("La función 'simularBlackjack' no está definida.");
        const res = fn(replicas, uJug, uBan);
        const t1 = performance.now();

        return { res, timeMs: (t1 - t0).toFixed(2) };
      },
      renderResultados(data, timeMs) {
        const { res } = data;
        const noImplementado = (res.victoriasJugador === 0 && res.victoriasBanca === 0);

        return `
          ${noImplementado ? `
            <div class="status-warning" style="margin-bottom: 1.25rem;">
              <strong>ℹ️ Ejercicio pendiente de resolución:</strong>
              <p>Abre <code>js/ejercicios/ejercicio04_blackjack.js</code> e implementa la función <code>simularBlackjack</code>.</p>
            </div>
          ` : ''}

          <div class="kpi-grid">
            <div class="kpi-card">
              <span class="kpi-label">Victorias Jugador</span>
              <span class="kpi-value cyan">${(res.probabilidadJugador || 0).toFixed(1)}%</span>
              <span class="kpi-subtext">${(res.victoriasJugador || 0).toLocaleString()} manos</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">Victorias Banca (Casa)</span>
              <span class="kpi-value rose">${(res.probabilidadBanca || 0).toFixed(1)}%</span>
              <span class="kpi-subtext">${(res.victoriasBanca || 0).toLocaleString()} manos</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">Jugador se Pasa (>21)</span>
              <span class="kpi-value amber">${res.replicas ? (((res.jugadorSePasa || 0) / res.replicas) * 100).toFixed(1) : 0}%</span>
              <span class="kpi-subtext">${res.jugadorSePasa || 0} manos</span>
            </div>
          </div>

          <div class="visualization-card">
            <div class="viz-header">
              <h3 class="viz-title">Distribución de Victorias</h3>
              <span class="benchmark-badge">⏱️ ${timeMs} ms</span>
            </div>
            <div class="viz-canvas-wrapper">
              <canvas id="viz-canvas" width="600" height="260"></canvas>
            </div>
          </div>
        `;
      },
      postRender(data) {
        const { res } = data;
        const canvas = document.getElementById('viz-canvas');
        Visualizadores.drawBarChart(canvas, [
          { label: 'Jugador', value: res.probabilidadJugador || 0, color: '#38bdf8', colorEnd: 'rgba(56, 189, 248, 0.4)' },
          { label: 'Banca (Casa)', value: res.probabilidadBanca || 0, color: '#f43f5e', colorEnd: 'rgba(244, 63, 94, 0.4)' }
        ], { isPercent: true, maxValue: 100 });
      }
    },

    'duelo-arqueros': {
      numero: '05',
      titulo: 'Duelo de Puntería por Turnos',
      archivo: 'js/ejercicios/ejercicio05_duelo_arqueros.js',
      categoria: 'Procesos Secuenciales Estocásticos',
      guia: 'simularDueloArqueros(replicas, probA, probB, inicia)',
      descripcion: 'Dos arqueros A y B disparan por turnos. El arquero A tiene 30% de puntería y dispara primero. El arquero B tiene 45% de puntería. El duelo concluye con el primer acierto. ¿Compensa la ventaja del primer tiro la menor puntería?',
      renderInputs() {
        return `
          <div class="form-group">
            <label class="form-label">Duelos a Simular <span class="unit">N</span></label>
            <input type="number" id="inp-duelo-replicas" class="form-control" value="2000" min="200" max="20000" step="500">
          </div>
          <div class="form-group">
            <label class="form-label">Puntería Jugador A <span class="unit">p_A</span></label>
            <input type="number" id="inp-duelo-pa" class="form-control" value="0.30" min="0.05" max="0.95" step="0.05">
          </div>
          <div class="form-group">
            <label class="form-label">Puntería Jugador B <span class="unit">p_B</span></label>
            <input type="number" id="inp-duelo-pb" class="form-control" value="0.45" min="0.05" max="0.95" step="0.05">
          </div>
          <div class="form-group">
            <label class="form-label">Inicia el Duelo</label>
            <select id="inp-duelo-inicia" class="form-control">
              <option value="A" selected>Jugador A (Tira primero)</option>
              <option value="B">Jugador B (Tira primero)</option>
            </select>
          </div>
        `;
      },
      ejecutar() {
        const replicas = parseInt(document.getElementById('inp-duelo-replicas').value, 10) || 2000;
        const pa = parseFloat(document.getElementById('inp-duelo-pa').value) || 0.30;
        const pb = parseFloat(document.getElementById('inp-duelo-pb').value) || 0.45;
        const inicia = document.getElementById('inp-duelo-inicia').value || 'A';

        const t0 = performance.now();
        const fn = window.Simulaciones?.simularDueloArqueros;
        if (!fn) throw new Error("La función 'simularDueloArqueros' no está definida.");
        const res = fn(replicas, pa, pb, inicia);
        const t1 = performance.now();

        return { res, timeMs: (t1 - t0).toFixed(2) };
      },
      renderResultados(data, timeMs) {
        const { res } = data;
        const noImplementado = (res.victoriasA === 0 && res.victoriasB === 0);

        return `
          ${noImplementado ? `
            <div class="status-warning" style="margin-bottom: 1.25rem;">
              <strong>ℹ️ Ejercicio pendiente de resolución:</strong>
              <p>Abre <code>js/ejercicios/ejercicio05_duelo_arqueros.js</code> e implementa la función <code>simularDueloArqueros</code>.</p>
            </div>
          ` : ''}

          <div class="kpi-grid">
            <div class="kpi-card">
              <span class="kpi-label">P(Victoria Arquero A)</span>
              <span class="kpi-value cyan">${(res.probabilidadA || 0).toFixed(1)}%</span>
              <span class="kpi-subtext">${res.victoriasA || 0} victorias</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">P(Victoria Arquero B)</span>
              <span class="kpi-value purple">${(res.probabilidadB || 0).toFixed(1)}%</span>
              <span class="kpi-subtext">${res.victoriasB || 0} victorias</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">Disparos Promedio</span>
              <span class="kpi-value amber">${(res.promedioDisparos || 0).toFixed(2)}</span>
              <span class="kpi-subtext">Tiros por duelo</span>
            </div>
          </div>

          <div class="visualization-card">
            <div class="viz-header">
              <h3 class="viz-title">Comparación de Efectividad en el Duelo</h3>
              <span class="benchmark-badge">⏱️ ${timeMs} ms</span>
            </div>
            <div class="viz-canvas-wrapper">
              <canvas id="viz-canvas" width="600" height="260"></canvas>
            </div>
          </div>
        `;
      },
      postRender(data) {
        const { res } = data;
        const canvas = document.getElementById('viz-canvas');
        Visualizadores.drawBarChart(canvas, [
          { label: 'Arquero A', value: res.probabilidadA || 0, color: '#38bdf8', colorEnd: 'rgba(56, 189, 248, 0.4)', sublabel: 'Inicia primero' },
          { label: 'Arquero B', value: res.probabilidadB || 0, color: '#a855f7', colorEnd: 'rgba(168, 85, 247, 0.4)', sublabel: 'Mayor precisión' }
        ], { isPercent: true, maxValue: 100 });
      }
    },

    'vendedor-diarios': {
      numero: '06',
      titulo: 'El Vendedor de Diarios (Newsboy Problem)',
      archivo: 'js/ejercicios/ejercicio06_vendedor_diarios.js',
      categoria: 'Gestión de Stock y Monte Carlo Comercial',
      guia: 'simularVendedorDiarios(replicas, costo, precio, rescate, Q)',
      descripcion: 'Se compran diarios a $800 y se venden a $2.000. Los no vendidos se descartan por $100. La demanda diaria es discreta: 50 (15%), 100 (35%), 150 (30%), 200 (20%). ¿Qué política de compra Q maximiza el beneficio medio?',
      renderInputs() {
        return `
          <div class="form-group">
            <label class="form-label">Días de Simulación <span class="unit">N</span></label>
            <input type="number" id="inp-news-replicas" class="form-control" value="1000" min="200" max="10000" step="200">
          </div>
          <div class="form-group">
            <label class="form-label">Costo Unitario de Compra <span class="unit">$</span></label>
            <input type="number" id="inp-news-costo" class="form-control" value="800" min="100" step="50">
          </div>
          <div class="form-group">
            <label class="form-label">Precio Unitario de Venta <span class="unit">$</span></label>
            <input type="number" id="inp-news-precio" class="form-control" value="2000" min="500" step="100">
          </div>
          <div class="form-group">
            <label class="form-label">Valor de Rescate (Sobrante) <span class="unit">$</span></label>
            <input type="number" id="inp-news-rescate" class="form-control" value="100" min="0" step="20">
          </div>
          <div class="form-group">
            <label class="form-label">Política a Evaluar <span class="unit">Q (unidades)</span></label>
            <select id="inp-news-q" class="form-control">
              <option value="50">Q = 50 unidades</option>
              <option value="100">Q = 100 unidades</option>
              <option value="150" selected>Q = 150 unidades</option>
              <option value="200">Q = 200 unidades</option>
            </select>
          </div>
        `;
      },
      ejecutar() {
        const replicas = parseInt(document.getElementById('inp-news-replicas').value, 10) || 1000;
        const costo = parseFloat(document.getElementById('inp-news-costo').value) || 800;
        const precio = parseFloat(document.getElementById('inp-news-precio').value) || 2000;
        const rescate = parseFloat(document.getElementById('inp-news-rescate').value) || 100;
        const q = parseInt(document.getElementById('inp-news-q').value, 10) || 150;

        const t0 = performance.now();
        const fn = window.Simulaciones?.simularVendedorDiarios;
        if (!fn) throw new Error("La función 'simularVendedorDiarios' no está definida.");
        const res = fn(replicas, costo, precio, rescate, q);
        const t1 = performance.now();

        return { res, timeMs: (t1 - t0).toFixed(2) };
      },
      renderResultados(data, timeMs) {
        const { res } = data;
        const comparativa = res.comparativaPoliticas || [];
        const noImplementado = res.beneficioPromedio === 0 && res.diasConSobrante === 0 && res.diasConFaltante === 0;

        return `
          ${noImplementado ? `
            <div class="status-warning" style="margin-bottom: 1.25rem;">
              <strong>ℹ️ Ejercicio pendiente de resolución:</strong>
              <p>Abre <code>js/ejercicios/ejercicio06_vendedor_diarios.js</code> e implementa la función <code>simularVendedorDiarios</code>.</p>
            </div>
          ` : ''}

          <div class="kpi-grid">
            <div class="kpi-card">
              <span class="kpi-label">Beneficio Promedio Diario</span>
              <span class="kpi-value emerald">$${(res.beneficioPromedio || 0).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
              <span class="kpi-subtext">Política Q = ${res.politicaSeleccionada}</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">Días con Faltante de Stock</span>
              <span class="kpi-value rose">${(res.probabilidadFaltante || 0).toFixed(1)}%</span>
              <span class="kpi-subtext">${res.diasConFaltante || 0} de ${res.replicas || 0} días</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">Días con Exceso/Sobrante</span>
              <span class="kpi-value amber">${(res.probabilidadSobrante || 0).toFixed(1)}%</span>
              <span class="kpi-subtext">${res.diasConSobrante || 0} de ${res.replicas || 0} días</span>
            </div>
          </div>

          <div class="visualization-card">
            <div class="viz-header">
              <h3 class="viz-title">Comparativa de Beneficio Neto Esperado por Política Q</h3>
              <span class="benchmark-badge">⏱️ ${timeMs} ms</span>
            </div>
            <div class="viz-canvas-wrapper">
              <canvas id="viz-canvas" width="600" height="260"></canvas>
            </div>
          </div>

          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Política (Q)</th>
                  <th>Beneficio Medio Diario ($)</th>
                  <th>P(Faltante de Stock)</th>
                </tr>
              </thead>
              <tbody>
                ${comparativa.map(p => `
                  <tr style="${p.Q === res.politicaSeleccionada ? 'background: rgba(99, 102, 241, 0.15); font-weight: bold;' : ''}">
                    <td>Q = ${p.Q} u. ${p.Q === res.politicaSeleccionada ? '★ (Seleccionada)' : ''}</td>
                    <td>$${(p.beneficioMedio || 0).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</td>
                    <td>${(p.probFaltante || 0).toFixed(1)}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      },
      postRender(data) {
        const { res } = data;
        const canvas = document.getElementById('viz-canvas');
        const chartData = (res.comparativaPoliticas || []).map(p => ({
          label: `Q = ${p.Q}`,
          value: p.beneficioMedio || 0,
          color: p.Q === res.politicaSeleccionada ? '#10b981' : '#6366f1',
          colorEnd: p.Q === res.politicaSeleccionada ? 'rgba(16, 185, 129, 0.4)' : 'rgba(99, 102, 241, 0.3)',
          sublabel: `Faltante: ${(p.probFaltante || 0).toFixed(0)}%`
        }));
        Visualizadores.drawBarChart(canvas, chartData, { isPercent: false });
      }
    },

    'estacion-carga': {
      numero: '07',
      titulo: 'Estación de Carga de Vehículos Eléctricos',
      archivo: 'js/ejercicios/ejercicio07_estacion_carga.js',
      categoria: 'Demanda Continua y Penalizaciones',
      guia: 'simularEstacionCarga(replicas, minAutos, maxAutos, tarifa, limite, penalidad)',
      descripcion: 'Llegan entre 40 y 70 autos/día. El 60% hace carga estándar (20-40 kWh) y el 40% carga completa (50-80 kWh). Se cobra $150/kWh. Si el consumo total diario supera los 3.000 kWh, se aplica una penalidad fija de $50.000.',
      renderInputs() {
        return `
          <div class="form-group">
            <label class="form-label">Jornadas a Simular <span class="unit">N</span></label>
            <input type="number" id="inp-ev-replicas" class="form-control" value="1000" min="200" max="10000" step="200">
          </div>
          <div class="form-group">
            <label class="form-label">Rango de Vehículos Diarios</label>
            <div class="form-control-row">
              <input type="number" id="inp-ev-min" class="form-control" value="40" min="10" placeholder="Mín">
              <input type="number" id="inp-ev-max" class="form-control" value="70" min="20" placeholder="Máx">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Tarifa por kWh <span class="unit">$</span></label>
            <input type="number" id="inp-ev-tarifa" class="form-control" value="150" min="10" step="10">
          </div>
          <div class="form-group">
            <label class="form-label">Límite de Potencia <span class="unit">kWh/día</span></label>
            <input type="number" id="inp-ev-limite" class="form-control" value="3000" min="1000" step="100">
          </div>
          <div class="form-group">
            <label class="form-label">Penalización Fija <span class="unit">$</span></label>
            <input type="number" id="inp-ev-penalidad" class="form-control" value="50000" min="0" step="5000">
          </div>
        `;
      },
      ejecutar() {
        const replicas = parseInt(document.getElementById('inp-ev-replicas').value, 10) || 1000;
        const minAutos = parseInt(document.getElementById('inp-ev-min').value, 10) || 40;
        const maxAutos = parseInt(document.getElementById('inp-ev-max').value, 10) || 70;
        const tarifa = parseFloat(document.getElementById('inp-ev-tarifa').value) || 150;
        const limite = parseFloat(document.getElementById('inp-ev-limite').value) || 3000;
        const penalidad = parseFloat(document.getElementById('inp-ev-penalidad').value) || 50000;

        const t0 = performance.now();
        const fn = window.Simulaciones?.simularEstacionCarga;
        if (!fn) throw new Error("La función 'simularEstacionCarga' no está definida.");
        const res = fn(replicas, minAutos, maxAutos, tarifa, limite, penalidad);
        const t1 = performance.now();

        return { res, limite, timeMs: (t1 - t0).toFixed(2) };
      },
      renderResultados(data, timeMs) {
        const { res, limite } = data;
        const noImplementado = !res.muestrasConsumo || res.muestrasConsumo.length === 0;

        return `
          ${noImplementado ? `
            <div class="status-warning" style="margin-bottom: 1.25rem;">
              <strong>ℹ️ Ejercicio pendiente de resolución:</strong>
              <p>Abre <code>js/ejercicios/ejercicio07_estacion_carga.js</code> e implementa la función <code>simularEstacionCarga</code>.</p>
            </div>
          ` : ''}

          <div class="kpi-grid">
            <div class="kpi-card">
              <span class="kpi-label">Ganancia Neta Diaria Promedio</span>
              <span class="kpi-value emerald">$${(res.gananciaPromedio || 0).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
              <span class="kpi-subtext">Deduciendo penalizaciones</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">Consumo Diario Promedio</span>
              <span class="kpi-value cyan">${(res.consumoPromedio || 0).toFixed(1)} kWh</span>
              <span class="kpi-subtext">Límite: ${limite.toLocaleString()} kWh</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">P(Exceso y Penalización)</span>
              <span class="kpi-value ${(res.probabilidadPenalizacion || 0) > 20 ? 'rose' : 'amber'}">${(res.probabilidadPenalizacion || 0).toFixed(1)}%</span>
              <span class="kpi-subtext">${res.diasConPenalizacion || 0} de ${res.replicas || 0} días</span>
            </div>
          </div>

          <div class="visualization-card">
            <div class="viz-header">
              <h3 class="viz-title">Histograma de Distribución de Consumo Diario (kWh)</h3>
              <span class="benchmark-badge">⏱️ ${timeMs} ms</span>
            </div>
            <div class="viz-canvas-wrapper">
              <canvas id="viz-canvas" width="600" height="260"></canvas>
            </div>
          </div>
        `;
      },
      postRender(data) {
        const { res, limite } = data;
        const canvas = document.getElementById('viz-canvas');
        const muestras = res.muestrasConsumo;
        if (!muestras || muestras.length === 0) return;

        const minVal = Math.min(...muestras);
        const maxVal = Math.max(...muestras);
        const binCount = 25;
        const binSize = (maxVal - minVal) / binCount;
        
        const bins = Array.from({ length: binCount }, (_, i) => ({
          minVal: minVal + i * binSize,
          maxVal: minVal + (i + 1) * binSize,
          count: 0
        }));

        muestras.forEach(val => {
          const idx = Math.min(Math.floor((val - minVal) / binSize), binCount - 1);
          if (idx >= 0 && idx < binCount) bins[idx].count++;
        });

        Visualizadores.drawHistogram(canvas, bins, {
          threshold: limite,
          minX: minVal,
          maxX: maxVal,
          xLabel: 'Consumo de Energía por Jornada (kWh)'
        });
      }
    }
  };

  let ejercicioActualId = 'monty-hall';
  const exerciseRoot = document.getElementById('exercise-content-root');
  const navButtons = document.querySelectorAll('.nav-item');
  const activeFileIndicator = document.getElementById('active-file-indicator');

  // Cargar vista del ejercicio
  function cargarEjercicio(id) {
    ejercicioActualId = id;
    const config = ejerciciosConfig[id];
    if (!config) return;

    // Actualizar clase activa en navegación
    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.exercise === id);
    });

    // Actualizar indicador de archivo en el sidebar
    if (activeFileIndicator) {
      activeFileIndicator.textContent = config.archivo;
    }

    // Inyectar HTML
    exerciseRoot.innerHTML = `
      <div class="exercise-container">
        <!-- Header del Ejercicio -->
        <div class="exercise-header">
          <div>
            <div class="exercise-meta-tag">
              <span>EJERCICIO #${config.numero}</span> • <span>${config.categoria}</span>
            </div>
            <h2 class="exercise-title">${config.titulo}</h2>
            <p class="exercise-desc">${config.descripcion}</p>
          </div>
          <div class="exercise-guide-pill" title="Archivo asignado">
            📄 ${config.archivo}
          </div>
        </div>

        <!-- Grid de Configuración y Resultados -->
        <div class="exercise-grid">
          <!-- Formulario Inputs -->
          <div class="card-panel">
            <div class="panel-header">
              <h3 class="panel-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Parámetros
              </h3>
            </div>
            
            <form id="form-parametros" onsubmit="event.preventDefault();">
              ${config.renderInputs()}
              
              <button type="button" id="btn-ejecutar-simulacion" class="btn-run" style="margin-top: 1.25rem; width: 100%;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Ejecutar Simulación
              </button>
            </form>
          </div>

          <!-- Contenedor Dinámico de Resultados -->
          <div class="results-container" id="results-target">
            <!-- Se actualiza al ejecutar -->
          </div>
        </div>
      </div>
    `;

    // Vincular botón ejecutar
    const btnRun = document.getElementById('btn-ejecutar-simulacion');
    if (btnRun) {
      btnRun.addEventListener('click', ejecutarEjercicioActivo);
    }

    // Ejecutar simulación
    ejecutarEjercicioActivo();
  }

  // Ejecutar el ejercicio activo
  function ejecutarEjercicioActivo() {
    const config = ejerciciosConfig[ejercicioActualId];
    if (!config) return;

    const resultsTarget = document.getElementById('results-target');
    if (!resultsTarget) return;

    try {
      const data = config.ejecutar();
      resultsTarget.innerHTML = config.renderResultados(data, data.timeMs);
      if (typeof config.postRender === 'function') {
        requestAnimationFrame(() => {
          config.postRender(data);
        });
      }
    } catch (err) {
      console.error(err);
      resultsTarget.innerHTML = `
        <div class="status-warning">
          <strong>⚠️ Error en la simulación:</strong>
          <p>${err.message}</p>
          <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #94a3b8;">
            Revisa la función en <code>${config.archivo}</code>.
          </p>
        </div>
      `;
    }
  }

  // Event Listeners para Navegación
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      cargarEjercicio(btn.dataset.exercise);
    });
  });

  // Inicializar en el primer ejercicio
  cargarEjercicio('monty-hall');
});
