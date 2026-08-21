# Laboratorio Colaborativo de Simulación de Monte Carlo
## Cátedra: Modelos y Simulación (2026) - Ingeniería en Informática (UCSE)

Plataforma base interactiva para el **Trabajo Práctico N° 2 - La Simulación**.

Este proyecto está organizado para el **trabajo colaborativo mediante Git y GitHub**. La plataforma web ya cuenta con toda la infraestructura de interfaz de usuario, captura de parámetros dinámicos, cálculo de tiempos de ejecución ($ms$), tarjetas de métricas KPI y renderizado gráfico en Canvas HTML5.

---

### 📂 Estructura Modular del Repositorio

```text
TP2-Simulador-MonteCarlo/
├── index.html                  <- Tablero interactivo (abrir en el navegador)
├── css/
│   └── styles.css              <- Diseño moderno, glassmorphism y dark theme
├── js/
│   ├── visualizadores.js       <- Motor gráfico en Canvas HTML5
│   ├── app.js                  <- Orquestador de interfaz y eventos
│   └── ejercicios/             <- 🎯 ESPACIO DE TRABAJO DE LOS ALUMNOS
│       ├── ejercicio01_monty_hall.js        (Alumno Asignado #1)
│       ├── ejercicio02_dron_viento.js       (Alumno Asignado #2)
│       ├── ejercicio03_ruina_apostador.js   (Alumno Asignado #3)
│       ├── ejercicio04_blackjack.js         (Alumno Asignado #4)
│       ├── ejercicio05_duelo_arqueros.js    (Alumno Asignado #5)
│       ├── ejercicio06_vendedor_diarios.js  (Alumno Asignado #6)
│       └── ejercicio07_estacion_carga.js    (Alumno Asignado #7)
└── README.md                   <- Guía de colaboración y consignas
```

---

### 👥 Flujo de Trabajo Colaborativo en Git

Cada estudiante tiene asignado un único archivo dentro de `js/ejercicios/`. Para evitar conflictos de fusión (*merge conflicts*), sigan estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd TP2-Simulador-MonteCarlo
   ```

2. **Crear una rama de trabajo propia:**
   ```bash
   git checkout -b feature/ejercicio-XX-apellido
   # Ejemplo: git checkout -b feature/ejercicio-01-perez
   ```

3. **Resolver el ejercicio asignado:**
   - Abre únicamente tu archivo asignado (ej. `js/ejercicios/ejercicio01_monty_hall.js`).
   - Completa tu nombre en la cabecera del archivo.
   - Programa la lógica de Monte Carlo dentro del bloque `// TODO`.
   - Abre `index.html` en el navegador y haz clic en **"Ejecutar Simulación"** para probar tu solución y verificar los gráficos.

4. **Confirmar cambios y enviar Pull Request:**
   ```bash
   git add js/ejercicios/ejercicioXX_*.js
   git commit -m "feat(simulacion): resolucion de ejercicio XX por [Apellido]"
   git push origin feature/ejercicio-XX-apellido
   ```
   *Crea un Pull Request en GitHub hacia la rama `main`.*

---

### 📋 Asignación de Ejercicios

| # | Archivo | Tema / Categoría | Función a Implementar |
| :---: | :--- | :--- | :--- |
| **01** | [`ejercicio01_monty_hall.js`](js/ejercicios/ejercicio01_monty_hall.js) | Probabilidad Condicional y Decisión | `simularMontyHall(replicas, numPuertas)` |
| **02** | [`ejercicio02_dron_viento.js`](js/ejercicios/ejercicio02_dron_viento.js) | Caminata Aleatoria 2D | `simularDronViento(replicas, bateria, probViento, radio)` |
| **03** | [`ejercicio03_ruina_apostador.js`](js/ejercicios/ejercicio03_ruina_apostador.js) | Caminata 1D & Barreras Absorbentes | `simularRuinaApostador(replicas, capital, meta, apuesta, prob)` |
| **04** | [`ejercicio04_blackjack.js`](js/ejercicios/ejercicio04_blackjack.js) | Juegos de Azar y Parada Óptima | `simularBlackjack(replicas, umbralJugador, umbralBanca)` |
| **05** | [`ejercicio05_duelo_arqueros.js`](js/ejercicios/ejercicio05_duelo_arqueros.js) | Procesos Secuenciales por Turnos | `simularDueloArqueros(replicas, probA, probB, iniciaPrimero)` |
| **06** | [`ejercicio06_vendedor_diarios.js`](js/ejercicios/ejercicio06_vendedor_diarios.js) | Stock y Monte Carlo Comercial | `simularVendedorDiarios(replicas, costo, precio, rescate, Q)` |
| **07** | [`ejercicio07_estacion_carga.js`](js/ejercicios/ejercicio07_estacion_carga.js) | Demanda Continua y Penalidad | `simularEstacionCarga(replicas, minAutos, maxAutos, tarifa, limite, penalidad)` |

---

### 💡 Pautas de Modelización y Simulación

1. **Variables Uniformes Continuas en $[a, b]$:**
   ```javascript
   const x = a + Math.random() * (b - a);
   ```
2. **Variables Uniformes Discretas en $[min, max]$:**
   ```javascript
   const k = Math.floor(Math.random() * (max - min + 1)) + min;
   ```
3. **Eventos Bernoulli con probabilidad $p$:**
   ```javascript
   const ocurrio = Math.random() < p;
   ```
4. **Transformada Inversa para Variables Discretas:**
   ```javascript
   const u = Math.random();
   if (u < 0.15) return 50;
   else if (u < 0.50) return 100; // 0.15 + 0.35
   else if (u < 0.80) return 150; // 0.50 + 0.30
   else return 200;
   ```
