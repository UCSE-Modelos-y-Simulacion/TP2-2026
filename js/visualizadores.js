/**
 * Visualizadores Gráficos en Canvas HTML5 para Simulación de Monte Carlo
 * Modelos y Simulación - UCSE
 */

const Visualizadores = {
  /**
   * Dibuja un gráfico de barras moderno
   */
  drawBarChart(canvas, data, options = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 40, right: 30, bottom: 50, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const labels = data.map(d => d.label);
    const values = data.map(d => d.value);
    const maxValue = options.maxValue || Math.max(...values, 1) * 1.15;

    // Fondo y Guías Horizontales
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 1;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      const val = maxValue * (1 - i / gridLines);
      ctx.fillStyle = '#64748b';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillText(options.isPercent ? `${val.toFixed(1)}%` : val.toFixed(0), padding.left - 8, y + 4);
    }

    // Dibujar Barras
    const barCount = data.length;
    const gap = 30;
    const barWidth = Math.min(70, (chartW - (barCount - 1) * gap) / barCount);
    const totalBarsWidth = barCount * barWidth + (barCount - 1) * gap;
    const startX = padding.left + (chartW - totalBarsWidth) / 2;

    data.forEach((item, index) => {
      const x = startX + index * (barWidth + gap);
      const barH = (item.value / maxValue) * chartH;
      const y = padding.top + chartH - barH;

      // Gradiente de Barra
      const gradient = ctx.createLinearGradient(0, y, 0, y + barH);
      gradient.addColorStop(0, item.color || '#6366f1');
      gradient.addColorStop(1, item.colorEnd || 'rgba(99, 102, 241, 0.4)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, [6, 6, 0, 0]);
      ctx.fill();

      // Borde de la barra
      ctx.strokeStyle = item.color || '#6366f1';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Valor encima de la barra
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      const textVal = options.isPercent ? `${item.value.toFixed(1)}%` : `${item.value.toLocaleString()}`;
      ctx.fillText(textVal, x + barWidth / 2, y - 8);

      // Etiqueta debajo
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, x + barWidth / 2, padding.top + chartH + 22);
      if (item.sublabel) {
        ctx.fillStyle = '#64748b';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(item.sublabel, x + barWidth / 2, padding.top + chartH + 36);
      }
    });
  },

  /**
   * Dibuja un plano 2D de dispersión con radio crítico y cuadrantes (Para el Dron)
   */
  drawScatter2D(canvas, points, options = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const maxCoord = options.maxCoord || 25;
    const scale = (Math.min(width, height) / 2 - 40) / maxCoord;

    // Ejes Cartesiamos
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(30, cy);
    ctx.lineTo(width - 30, cy);
    ctx.moveTo(cx, 30);
    ctx.lineTo(cx, height - 30);
    ctx.stroke();

    // Cuadrícula y Radios
    const step = 5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let r = step; r <= maxCoord; r += step) {
      ctx.beginPath();
      ctx.arc(cx, cy, r * scale, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '9px JetBrains Mono';
      ctx.fillText(`r=${r}`, cx + r * scale + 3, cy - 4);
    }

    // Radio Crítico
    if (options.criticalRadius) {
      const cr = options.criticalRadius * scale;
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(244, 63, 94, 0.9)';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(`Límite Crítico (R = ${options.criticalRadius})`, cx - 70, cy - cr - 6);
    }

    // Dibujar Puntos de Muestra (hasta 500 para rendimiento visual)
    const displayPoints = points.slice(0, 600);
    displayPoints.forEach(pt => {
      const px = cx + pt.x * scale;
      const py = cy - pt.y * scale; // Invertir eje Y
      const dist = Math.sqrt(pt.x * pt.x + pt.y * pt.y);
      const isOut = options.criticalRadius && dist > options.criticalRadius;

      ctx.fillStyle = isOut ? 'rgba(244, 63, 94, 0.75)' : 'rgba(56, 189, 248, 0.65)';
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Origen
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Inter';
    ctx.fillText('Base (0,0)', cx + 8, cy + 14);
  },

  /**
   * Dibuja trayectorias de saldo (Para la Ruina del Apostador)
   */
  drawSamplePaths(canvas, paths, meta = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 30, right: 30, bottom: 40, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxSteps = meta.maxSteps || 100;
    const maxVal = meta.target || 20000;
    const minVal = 0;

    // Guías Meta y Ruina
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)'; // Meta
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(width - padding.right, padding.top);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)'; // Ruina
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top + chartH);
    ctx.lineTo(width - padding.right, padding.top + chartH);
    ctx.stroke();
    ctx.setLineDash([]);

    // Etiquetas Y
    ctx.fillStyle = '#10b981';
    ctx.font = '10px JetBrains Mono';
    ctx.textAlign = 'right';
    ctx.fillText(`$${maxVal.toLocaleString()} (Meta)`, padding.left - 8, padding.top + 4);

    ctx.fillStyle = '#f43f5e';
    ctx.fillText('$0 (Ruina)', padding.left - 8, padding.top + chartH + 4);

    // Dibujar trayectorias de muestra
    const colors = ['#38bdf8', '#a855f7', '#f59e0b', '#10b981', '#f43f5e', '#6366f1'];
    paths.forEach((path, idx) => {
      ctx.strokeStyle = colors[idx % colors.length];
      ctx.lineWidth = 1.6;
      ctx.beginPath();

      path.forEach((val, step) => {
        const x = padding.left + (step / maxSteps) * chartW;
        const normY = (val - minVal) / (maxVal - minVal);
        const y = padding.top + chartH * (1 - normY);

        if (step === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });

    // Eje X
    ctx.fillStyle = '#64748b';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Rondas de Apuesta (Evolución temporal de 5 partidas)', padding.left + chartW / 2, height - 10);
  },

  /**
   * Dibuja un Histograma de Frecuencias con línea de umbral
   */
  drawHistogram(canvas, bins, options = {}) {
    if (!canvas || !bins || bins.length === 0) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 30, right: 30, bottom: 45, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxCount = Math.max(...bins.map(b => b.count), 1);
    const binWidth = chartW / bins.length;

    bins.forEach((bin, idx) => {
      const x = padding.left + idx * binWidth;
      const barH = (bin.count / maxCount) * chartH;
      const y = padding.top + chartH - barH;

      const isPenalty = options.threshold && bin.maxVal > options.threshold;
      ctx.fillStyle = isPenalty ? 'rgba(244, 63, 94, 0.7)' : 'rgba(56, 189, 248, 0.6)';
      ctx.strokeStyle = isPenalty ? '#f43f5e' : '#38bdf8';
      ctx.lineWidth = 1;

      ctx.fillRect(x + 1, y, binWidth - 2, barH);
      ctx.strokeRect(x + 1, y, binWidth - 2, barH);
    });

    // Línea de Umbral / Límite
    if (options.threshold && options.minX && options.maxX) {
      const range = options.maxX - options.minX;
      const normX = (options.threshold - options.minX) / range;
      const threshX = padding.left + Math.max(0, Math.min(chartW, normX * chartW));

      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(threshX, padding.top - 10);
      ctx.lineTo(threshX, padding.top + chartH);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 10px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(`Límite: ${options.threshold} kWh`, threshX, padding.top - 14);
    }

    // Etiquetas X
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono';
    ctx.textAlign = 'left';
    ctx.fillText(`${options.minX ? options.minX.toFixed(0) : ''}`, padding.left, height - 15);
    ctx.textAlign = 'right';
    ctx.fillText(`${options.maxX ? options.maxX.toFixed(0) : ''}`, width - padding.right, height - 15);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter';
    ctx.fillText(options.xLabel || 'Consumo Diario (kWh)', padding.left + chartW / 2, height - 15);
  }
};
