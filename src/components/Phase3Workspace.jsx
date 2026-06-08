import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MathFormula from './MathFormula';
import {
  ArrowLeft,
  BookOpen,
  Award,
  FileText,
  Download,
  Play,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Info,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Target,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  SVG Logarithm Graph Explorer
// ─────────────────────────────────────────────────────────────
function LogGraphExplorer() {
  const [base, setBase] = useState(2);
  const [showAsymptote, setShowAsymptote] = useState(true);
  const [showKeyPoints, setShowKeyPoints] = useState(true);

  const W = 460, H = 300;
  const padL = 46, padR = 18, padT = 18, padB = 38;
  const gW = W - padL - padR;
  const gH = H - padT - padB;
  const xMin = 0.05, xMax = 7.5;
  const yMin = -2.8, yMax = 2.8;

  const toSVG = (x, y) => ({
    sx: padL + ((x - xMin) / (xMax - xMin)) * gW,
    sy: padT + ((yMax - y) / (yMax - yMin)) * gH,
  });

  // Generate curve points
  const pts = [];
  for (let i = 0; i <= 400; i++) {
    const x = xMin + (i / 400) * (xMax - xMin);
    const y = Math.log(x) / Math.log(base);
    if (y >= yMin - 0.05 && y <= yMax + 0.05) {
      const { sx, sy } = toSVG(x, y);
      pts.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
    }
  }
  const pathD = pts.length > 1 ? `M ${pts.join(' L ')}` : '';

  // Key points: (1,0), (b,1), (1/b,-1)
  const kp = [
    { x: 1, y: 0, label: '(1, 0)', color: '#8b5cf6' },
    { x: base, y: 1, label: `(${base.toFixed(1)}, 1)`, color: '#06b6d4' },
    { x: 1 / base, y: -1, label: `(${(1 / base).toFixed(2)}, -1)`, color: '#f59e0b' },
  ].filter(p => p.x > xMin && p.x < xMax && p.y >= yMin && p.y <= yMax);

  // Axis tick marks
  const xTicks = [1, 2, 3, 4, 5, 6, 7];
  const yTicks = [-2, -1, 0, 1, 2];
  const { sx: x0sx } = toSVG(0, 0);
  const { sy: y0sy } = toSVG(0, 0);

  const isDecreasing = base < 1;

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* SVG Graph */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-inner overflow-hidden">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            style={{ maxHeight: 300 }}
          >
            {/* Grid lines */}
            {xTicks.map(xt => {
              const { sx } = toSVG(xt, 0);
              return (
                <line key={`gx${xt}`} x1={sx} y1={padT} x2={sx} y2={H - padB}
                  stroke="currentColor" strokeWidth="0.4" className="text-slate-300 dark:text-slate-700" strokeDasharray="3 3" />
              );
            })}
            {yTicks.map(yt => {
              const { sy } = toSVG(0, yt);
              return (
                <line key={`gy${yt}`} x1={padL} y1={sy} x2={W - padR} y2={sy}
                  stroke="currentColor" strokeWidth="0.4" className="text-slate-300 dark:text-slate-700" strokeDasharray="3 3" />
              );
            })}

            {/* Asymptote x=0 */}
            {showAsymptote && (
              <line x1={padL} y1={padT} x2={padL} y2={H - padB}
                stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.7" />
            )}

            {/* Axes */}
            <line x1={padL} y1={y0sy} x2={W - padR} y2={y0sy}
              stroke="currentColor" strokeWidth="1.2" className="text-slate-500 dark:text-slate-400" />
            <line x1={x0sx < padL ? padL : x0sx} y1={padT} x2={x0sx < padL ? padL : x0sx} y2={H - padB}
              stroke="currentColor" strokeWidth="1.2" className="text-slate-500 dark:text-slate-400" />

            {/* Axis arrows */}
            <polygon points={`${W - padR + 1},${y0sy} ${W - padR - 5},${y0sy - 3} ${W - padR - 5},${y0sy + 3}`}
              fill="currentColor" className="text-slate-500 dark:text-slate-400" />
            <polygon points={`${padL},${padT - 1} ${padL - 3},${padT + 5} ${padL + 3},${padT + 5}`}
              fill="currentColor" className="text-slate-500 dark:text-slate-400" />

            {/* Tick labels */}
            {xTicks.map(xt => {
              const { sx, sy: sy0 } = toSVG(xt, 0);
              return (
                <text key={`lx${xt}`} x={sx} y={sy0 + 12} textAnchor="middle"
                  fontSize="9" fill="currentColor" className="text-slate-400 dark:text-slate-500">
                  {xt}
                </text>
              );
            })}
            {yTicks.filter(y => y !== 0).map(yt => {
              const { sy } = toSVG(0, yt);
              return (
                <text key={`ly${yt}`} x={padL - 6} y={sy + 3} textAnchor="end"
                  fontSize="9" fill="currentColor" className="text-slate-400 dark:text-slate-500">
                  {yt}
                </text>
              );
            })}

            {/* Axis labels */}
            <text x={W - padR + 4} y={y0sy + 3} fontSize="10" fill="currentColor"
              className="text-slate-500 dark:text-slate-400">x</text>
            <text x={padL + 4} y={padT - 4} fontSize="10" fill="currentColor"
              className="text-slate-500 dark:text-slate-400">y</text>

            {/* Curve */}
            {pathD && (
              <path d={pathD} fill="none" stroke="#8b5cf6" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" />
            )}

            {/* Key points */}
            {showKeyPoints && kp.map((p, i) => {
              const { sx, sy } = toSVG(p.x, p.y);
              const labelX = sx + (sx > W * 0.7 ? -50 : 6);
              const labelY = sy + (sy < padT + 20 ? 14 : -6);
              return (
                <g key={i}>
                  <circle cx={sx} cy={sy} r="4" fill={p.color} stroke="white" strokeWidth="1.5" />
                  <text x={labelX} y={labelY} fontSize="9" fontWeight="bold" fill={p.color}>{p.label}</text>
                </g>
              );
            })}

            {/* Asymptote label */}
            {showAsymptote && (
              <text x={padL + 3} y={padT + 10} fontSize="8" fill="#ef4444" opacity="0.8">x=0 (asíntota)</text>
            )}
          </svg>
        </div>

        {/* Controls + Info Panel */}
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-semibold">Base (b):</span>
              <span className="font-mono font-extrabold text-violet-600 dark:text-violet-400">{base.toFixed(1)}</span>
            </div>
            <input
              type="range" min="1.2" max="8" step="0.1" value={base}
              onChange={e => setBase(parseFloat(e.target.value))}
              className="w-full accent-violet-500 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex gap-3 text-[10px] text-slate-400">
              <span>b = 1.2 (casi plana)</span>
              <span className="ml-auto">b = 8 (crece rápido)</span>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={showAsymptote} onChange={e => setShowAsymptote(e.target.checked)}
                className="accent-red-500 w-3.5 h-3.5" />
              <span className="text-slate-600 dark:text-slate-400">Mostrar asíntota vertical</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={showKeyPoints} onChange={e => setShowKeyPoints(e.target.checked)}
                className="accent-violet-500 w-3.5 h-3.5" />
              <span className="text-slate-600 dark:text-slate-400">Mostrar puntos clave</span>
            </label>
          </div>

          {/* Characteristics panel */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Características de f(x) = log<sub>{base.toFixed(1)}</sub>(x)</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: 'Dominio', val: '(0, +∞)' },
                { label: 'Rango', val: '(-∞, +∞)' },
                { label: 'Asíntota', val: 'x = 0 (vertical)' },
                { label: 'Corte x', val: '(1, 0)' },
                { label: 'Monotonía', val: isDecreasing ? '↘ Decreciente' : '↗ Creciente' },
                { label: 'Concavidad', val: isDecreasing ? 'Cóncava hacia arriba' : 'Cóncava hacia abajo' },
              ].map(({ label, val }) => (
                <div key={label} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg p-2">
                  <span className="block text-slate-400 dark:text-slate-500 text-[9px] uppercase tracking-wide">{label}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────────────────────
export default function Phase3Workspace({ onBack }) {
  const [activeTab, setActiveTab] = useState('theory');
  const [quickAnswers, setQuickAnswers] = useState({ q1: null, q2: null, q3: null });

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = [
    {
      question: "¿Cuál es el dominio de la función $f(x) = \\log_2(x^2 - 4)$?",
      latex: "f(x) = \\log_2(x^2 - 4)",
      options: [
        "x > 2",
        "x < -2 \\text{ o } x > 2",
        "x \\neq \\pm 2",
        "-2 < x < 2",
      ],
      correctIndex: 1,
      explanation: "El argumento de un logaritmo debe ser estrictamente positivo: $x^2 - 4 > 0 \\Rightarrow x^2 > 4 \\Rightarrow |x| > 2$. Esto significa $x < -2$ o $x > 2$. El valor $-2 < x < 2$ hace el argumento negativo o nulo, por lo que no pertenece al dominio.",
    },
    {
      question: "Al resolver $\\log_3(x+4) + \\log_3(x-4) = 2$, obtenemos una ecuación cuadrática. ¿Cuál es la solución válida?",
      latex: "\\log_3(x+4) + \\log_3(x-4) = 2",
      options: ["x = 5", "x = -5", "x = \\pm 5", "x = 3"],
      correctIndex: 0,
      explanation: "Aplicamos la propiedad del producto: $\\log_3[(x+4)(x-4)] = 2 \\Rightarrow \\log_3(x^2-16) = 2 \\Rightarrow x^2 - 16 = 3^2 = 9 \\Rightarrow x^2 = 25 \\Rightarrow x = \\pm 5$. Verificamos: $x = 5$ → ambos argumentos son positivos ✓. $x = -5$ → argumento $(x-4) = -9 < 0$ ✗ (solución extraña). Solo $x = 5$.",
    },
    {
      question: "Resuelve la siguiente ecuación utilizando la propiedad de la igualdad logarítmica (si $\\log_b(A) = \\log_b(B)$ entonces $A = B$):",
      latex: "\\log_3(x^2) = \\log_3(9x - 18)",
      options: [
        "x = 3 \\text{ o } x = 6",
        "x = 6 \\text{ solo}",
        "x = 3 \\text{ solo}",
        "x = 9",
      ],
      correctIndex: 0,
      explanation: "Igualamos argumentos: $x^2 = 9x - 18 \\Rightarrow x^2 - 9x + 18 = 0 \\Rightarrow (x-3)(x-6) = 0 \\Rightarrow x = 3$ o $x = 6$. Verificamos $x=3$: $\\log_3(9) = \\log_3(9)$ ✓. Verificamos $x=6$: $\\log_3(36) = \\log_3(36)$ ✓. Ambas son válidas.",
    },
    {
      question: "Resuelve la ecuación con resta de logaritmos y determina la solución exacta:",
      latex: "\\log(x+1) - \\log(x-1) = \\log(5)",
      options: ["x = \\frac{3}{2}", "x = 2", "x = \\frac{5}{4}", "x = \\frac{4}{3}"],
      correctIndex: 0,
      explanation: "Condensamos el lado izquierdo: $\\log\\!\\left(\\frac{x+1}{x-1}\\right) = \\log(5)$. Como las bases son iguales: $\\frac{x+1}{x-1} = 5 \\Rightarrow x+1 = 5(x-1) = 5x - 5 \\Rightarrow 6 = 4x \\Rightarrow x = \\frac{3}{2}$. Verificamos: $x > 1$ ✓, argumentos positivos ✓.",
    },
    {
      question: "Si $\\log_b(2) \\approx 0.301$ y $\\log_b(3) \\approx 0.477$, calcula el valor aproximado de:",
      latex: "\\log_b(72)",
      options: ["1.857", "1.204", "2.103", "0.778"],
      correctIndex: 0,
      explanation: "Descomponemos $72 = 8 \\cdot 9 = 2^3 \\cdot 3^2$. Aplicamos propiedades: $\\log_b(72) = \\log_b(2^3 \\cdot 3^2) = 3\\log_b(2) + 2\\log_b(3) \\approx 3(0.301) + 2(0.477) = 0.903 + 0.954 = 1.857$.",
    },
  ];

  const handleAnswerSelection = (index) => {
    if (isSubmitted) return;
    setSelectedAnswer(index);
  };
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);
    if (selectedAnswer === quizQuestions[currentQuestion].correctIndex) {
      setScore(s => s + 1);
    }
  };
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(q => q + 1);
    } else {
      setQuizFinished(true);
    }
  };
  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setQuizStarted(false);
  };

  const tabs = [
    { id: 'theory',    icon: <BookOpen className="w-4 h-4" />, label: 'Concepto y Función' },
    { id: 'examples',  icon: <Target className="w-4 h-4" />,   label: 'Ejemplos Resueltos' },
    { id: 'explorer',  icon: <TrendingUp className="w-4 h-4" />, label: 'Explorador Gráfico' },
    { id: 'videos',    icon: <Play className="w-4 h-4" />,     label: 'Clase en Video' },
    { id: 'exercises', icon: <Award className="w-4 h-4" />,    label: 'Ejercicios de Práctica' },
    { id: 'resources', icon: <FileText className="w-4 h-4" />, label: 'Taller PDF' },
  ];

  // ── Example data ──────────────────────────────────────────
  const examplesData = {
    evaluacion: [
      {
        title: 'Evaluar una función logarítmica básica',
        given: 'f(x) = \\log_2(x)',
        find: 'f(8)',
        steps: [
          'Reemplazamos $x = 8$ en $f(x) = \\log_2(x)$.',
          'Buscamos el exponente $y$ tal que $2^y = 8$.',
          'Sabemos que $2^3 = 8$.',
          'Por tanto, $f(8) = \\log_2(8) = 3$.',
        ],
        result: 'f(8) = 3',
      },
      {
        title: 'Evaluar con argumento fraccionario',
        given: 'g(x) = \\log_3(x)',
        find: 'g\\!\\left(\\tfrac{1}{9}\\right)',
        steps: [
          'Reemplazamos $x = \\tfrac{1}{9}$.',
          'Buscamos $y$ tal que $3^y = \\tfrac{1}{9} = 3^{-2}$.',
          'Igualando exponentes: $y = -2$.',
          '$g\\!\\left(\\tfrac{1}{9}\\right) = \\log_3\\!\\left(\\tfrac{1}{9}\\right) = -2$.',
        ],
        result: 'g\\!\\left(\\tfrac{1}{9}\\right) = -2',
      },
      {
        title: 'Evaluar logaritmo decimal (base 10)',
        given: 'h(x) = \\log(x)',
        find: 'h(0.001)',
        steps: [
          'El logaritmo sin base explícita tiene base $10$.',
          'Buscamos $y$ tal que $10^y = 0.001 = 10^{-3}$.',
          'Por tanto $y = -3$.',
          '$h(0.001) = \\log(0.001) = -3$.',
        ],
        result: 'h(0.001) = -3',
      },
      {
        title: 'Evaluar logaritmo natural (ln)',
        given: 'p(x) = \\ln(x)',
        find: 'p(e^5)',
        steps: [
          '$\\ln(x) = \\log_e(x)$ tiene base $e \\approx 2.718$.',
          'Buscamos $y$ tal que $e^y = e^5$.',
          'Igualando: $y = 5$.',
          '$p(e^5) = \\ln(e^5) = 5$.',
        ],
        result: 'p(e^5) = 5',
      },
    ],
    dominio: [
      {
        title: 'Dominio con argumento lineal',
        given: 'f(x) = \\log_4(2x - 6)',
        find: '\\text{Dom}(f)',
        steps: [
          'El argumento debe ser positivo: $2x - 6 > 0$.',
          'Despejamos: $2x > 6 \\Rightarrow x > 3$.',
          'El dominio es el conjunto $x > 3$.',
        ],
        result: '\\text{Dom}(f) = (3,\\, +\\infty)',
        nota: 'El punto $x = 3$ NO pertenece al dominio porque haría $\\log_4(0)$ que es indefinido.',
      },
      {
        title: 'Dominio con argumento cuadrático',
        given: 'g(x) = \\log_2(x^2 - 9)',
        find: '\\text{Dom}(g)',
        steps: [
          'Condición: $x^2 - 9 > 0 \\Rightarrow x^2 > 9 \\Rightarrow |x| > 3$.',
          'Esto equivale a $x < -3$ o $x > 3$.',
          'Se excluyen los valores $-3 \\le x \\le 3$.',
        ],
        result: '\\text{Dom}(g) = (-\\infty,\\,-3) \\cup (3,\\,+\\infty)',
        nota: 'Factorizando: $(x-3)(x+3) > 0$. Analizar el signo en cada intervalo.',
      },
      {
        title: 'Dominio con argumento de raíz cuadrada',
        given: 'h(x) = \\log_5(\\sqrt{4 - x})',
        find: '\\text{Dom}(h)',
        steps: [
          'Primero la raíz: $4 - x \\ge 0 \\Rightarrow x \\le 4$.',
          'Luego el logaritmo: $\\sqrt{4-x} > 0 \\Rightarrow 4 - x > 0 \\Rightarrow x < 4$.',
          'Combinando ambas condiciones: $x < 4$.',
        ],
        result: '\\text{Dom}(h) = (-\\infty,\\,4)',
        nota: 'El punto $x = 4$ se excluye porque hace $\\sqrt{0} = 0$, y $\\log_5(0)$ es indefinido.',
      },
      {
        title: 'Dominio con argumento racional',
        given: 'r(x) = \\ln\\!\\left(\\dfrac{x+2}{x-1}\\right)',
        find: '\\text{Dom}(r)',
        steps: [
          'Condición: $\\dfrac{x+2}{x-1} > 0$.',
          'Numerador positivo $x + 2 > 0 \\Rightarrow x > -2$; denominador positivo $x - 1 > 0 \\Rightarrow x > 1$.',
          'Ambos positivos: $x > 1$. O ambos negativos: $x < -2$ y $x < 1$ → $x < -2$.',
          'Además $x \\neq 1$ (denominador cero).',
        ],
        result: '\\text{Dom}(r) = (-\\infty,\\,-2) \\cup (1,\\,+\\infty)',
        nota: 'Analiza el signo del cociente dividiendo en los intervalos creados por $x = -2$ y $x = 1$.',
      },
    ],
    ecuacionesBasicas: [
      {
        title: 'Ecuación logarítmica básica directa',
        given: '\\log_2(x) = 5',
        steps: [
          'Convertimos a forma exponencial: $2^5 = x$.',
          'Calculamos: $2^5 = 32$.',
          'Verificamos: $\\log_2(32) = 5$ ✓ (argumento $32 > 0$ ✓).',
        ],
        result: 'x = 32',
      },
      {
        title: 'Ecuación con logaritmo de base 10',
        given: '\\log(x) = -3',
        steps: [
          'Forma exponencial: $10^{-3} = x$.',
          '$x = 10^{-3} = \\dfrac{1}{1000} = 0.001$.',
          'Verificamos: $\\log(0.001) = -3$ ✓.',
        ],
        result: 'x = 0.001',
      },
      {
        title: 'Ecuación con logaritmo natural',
        given: '\\ln(x) = 4',
        steps: [
          'Forma exponencial: $e^4 = x$.',
          '$x = e^4 \\approx 54.598$.',
          'Verificamos: $\\ln(e^4) = 4$ ✓.',
        ],
        result: 'x = e^4 \\approx 54.598',
      },
      {
        title: 'Ecuación con argumento lineal',
        given: '\\log_3(2x + 1) = 4',
        steps: [
          'Forma exponencial: $3^4 = 2x + 1$.',
          '$81 = 2x + 1 \\Rightarrow 2x = 80 \\Rightarrow x = 40$.',
          'Verificamos: argumento $2(40)+1 = 81 > 0$ ✓, $\\log_3(81) = 4$ ✓.',
        ],
        result: 'x = 40',
      },
    ],
    ecuacionesPropiedades: [
      {
        title: 'Suma de logaritmos → igualar al número',
        given: '\\log(x) + \\log(x-3) = 1',
        steps: [
          'Propied. del producto: $\\log[x(x-3)] = 1$.',
          'Forma exp.: $x(x-3) = 10^1 = 10 \\Rightarrow x^2 - 3x - 10 = 0$.',
          'Factorizamos: $(x-5)(x+2) = 0 \\Rightarrow x = 5$ o $x = -2$.',
          'Verificamos: $x = 5$ → argumentos $5 > 0$ y $2 > 0$ ✓.',
          '$x = -2$ → argumento $x = -2 < 0$ ✗ (solución extraña).',
        ],
        result: 'x = 5',
        alerta: true,
        notaAlerta: 'La solución $x = -2$ es extraña (hace negativo el argumento). Siempre hay que verificar.',
      },
      {
        title: 'Suma de logaritmos de base 2',
        given: '\\log_2(x) + \\log_2(x + 2) = 3',
        steps: [
          'Producto: $\\log_2[x(x+2)] = 3$.',
          'Forma exp.: $x(x+2) = 2^3 = 8 \\Rightarrow x^2+2x-8 = 0$.',
          'Factorizamos: $(x+4)(x-2) = 0 \\Rightarrow x = -4$ o $x = 2$.',
          '$x = -4$ hace ambos argumentos negativos ✗.',
          '$x = 2$: argumentos $2 > 0$ y $4 > 0$ ✓.',
        ],
        result: 'x = 2',
      },
      {
        title: 'Resta de logaritmos → cociente',
        given: '\\log_5(x + 5) - \\log_5(x - 1) = 2',
        steps: [
          'Cociente: $\\log_5\\!\\left(\\dfrac{x+5}{x-1}\\right) = 2$.',
          'Forma exp.: $\\dfrac{x+5}{x-1} = 5^2 = 25$.',
          '$x + 5 = 25(x-1) = 25x - 25 \\Rightarrow 30 = 24x \\Rightarrow x = \\dfrac{30}{24} = \\dfrac{5}{4}$.',
          'Verificamos: $x-1 = \\tfrac{1}{4} > 0$ ✓, $x+5 = \\tfrac{25}{4} > 0$ ✓.',
        ],
        result: 'x = \\dfrac{5}{4}',
      },
      {
        title: 'Ecuación con coeficiente de logaritmo',
        given: '2\\log_5(x) = \\log_5(4) + \\log_5(9)',
        steps: [
          'Derecha: $\\log_5(4) + \\log_5(9) = \\log_5(36)$.',
          'Izquierda: $2\\log_5(x) = \\log_5(x^2)$.',
          'Igualamos: $\\log_5(x^2) = \\log_5(36) \\Rightarrow x^2 = 36 \\Rightarrow x = \\pm 6$.',
          '$x = -6$: argumento negativo ✗. $x = 6$: argumento $36 > 0$ ✓.',
        ],
        result: 'x = 6',
      },
    ],
    avanzados: [
      {
        title: 'Ecuación logarítmica con solución irracional',
        given: '\\log_2(x + 1) + \\log_2(x - 1) = 4',
        steps: [
          'Producto: $\\log_2[(x+1)(x-1)] = 4 \\Rightarrow \\log_2(x^2 - 1) = 4$.',
          'Forma exp.: $x^2 - 1 = 2^4 = 16 \\Rightarrow x^2 = 17 \\Rightarrow x = \\pm\\sqrt{17}$.',
          '$x = -\\sqrt{17} \\approx -4.12$: argumento $x - 1 < 0$ ✗.',
          '$x = \\sqrt{17} \\approx 4.12$: argumentos $\\sqrt{17}+1 > 0$ y $\\sqrt{17}-1 > 0$ ✓.',
        ],
        result: 'x = \\sqrt{17}',
      },
      {
        title: 'Ecuación cuadrática en forma logarítmica',
        given: '[\\log(x)]^2 - \\log(x) - 2 = 0',
        steps: [
          'Sustitución: sea $u = \\log(x)$.',
          'La ecuación queda: $u^2 - u - 2 = 0$.',
          'Factorizamos: $(u - 2)(u + 1) = 0 \\Rightarrow u = 2$ o $u = -1$.',
          'Regresamos: $\\log(x) = 2 \\Rightarrow x = 100$ y $\\log(x) = -1 \\Rightarrow x = 0.1$.',
          'Ambas soluciones tienen argumento positivo ✓.',
        ],
        result: 'x = 100 \\text{ o } x = 0.1',
        nota: 'Este tipo de sustitución es clave. Si la ecuación tiene $[\\log(x)]^2$, siempre se lineariza con $u = \\log(x)$.',
      },
      {
        title: 'Sistema con logaritmos',
        given: '\\log_2(x) + \\log_2(y) = 4 \\text{ y } \\log_2(x) - \\log_2(y) = 2',
        steps: [
          'Sumamos las dos ecuaciones: $2\\log_2(x) = 6 \\Rightarrow \\log_2(x) = 3 \\Rightarrow x = 8$.',
          'Restamos: $2\\log_2(y) = 2 \\Rightarrow \\log_2(y) = 1 \\Rightarrow y = 2$.',
          'Verificamos: $\\log_2(8) + \\log_2(2) = 3 + 1 = 4$ ✓ y $3 - 1 = 2$ ✓.',
        ],
        result: 'x = 8,\\quad y = 2',
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Back + Title */}
      <div className="flex flex-col gap-4">
        <button onClick={onBack}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer w-fit">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al Temario
        </button>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-mono text-xs md:text-sm font-bold">
            <span>Matemática Básica</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Fase 3: Funciones y Ecuaciones Logarítmicas</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 font-display">
            Fase 3: Funciones y Ecuaciones
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl text-sm md:text-base leading-relaxed font-light">
            Estudia la función logarítmica: su gráfica, dominio y características visuales. Luego aprende a resolver todo tipo de ecuaciones logarítmicas con decenas de ejemplos, desde los más básicos hasta los avanzados.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px custom-scrollbar theme-transition">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-500/5'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30'
            }`}>
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">

          {/* ── THEORY TAB ── */}
          {activeTab === 'theory' && (
            <motion.div key="theory" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="space-y-10">

              {/* 1. Definición */}
              <div className="grid md:grid-cols-2 gap-8 items-stretch">
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-600" />
                    La Función Logarítmica
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                    Una <strong className="text-slate-800 dark:text-slate-200">función logarítmica</strong> es una función de la forma:
                  </p>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-900 flex justify-center shadow-inner">
                    <MathFormula formula="f(x) = \log_b(x)" displayMode={true} />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                    donde <MathFormula formula="b > 0" /> y <MathFormula formula="b \neq 1" />. La variable independiente <MathFormula formula="x" /> es el argumento y debe ser estrictamente positiva.
                  </p>
                  <div className="space-y-2 pt-2">
                    {[
                      { label: 'Dominio', val: '(0, +\\infty)', icon: '📌', color: 'violet' },
                      { label: 'Rango (Recorrido)', val: '(-\\infty, +\\infty)', icon: '↔', color: 'cyan' },
                      { label: 'Asíntota Vertical', val: 'x = 0', icon: '‖', color: 'fuchsia' },
                      { label: 'Punto de Corte con Eje x', val: '(1,\\ 0)', icon: '●', color: 'emerald' },
                    ].map(({ label, val, icon, color }) => (
                      <div key={label} className={`flex gap-3 items-center p-3 bg-${color}-500/5 border border-${color}-200/40 dark:border-${color}-500/10 rounded-xl`}>
                        <span className="text-lg select-none">{icon}</span>
                        <div>
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{label}</p>
                          <MathFormula formula={val} className="text-xs text-slate-600 dark:text-slate-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comportamiento según la base */}
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-600" />
                    Comportamiento según la Base
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl space-y-2">
                      <p className="text-sm font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> Base mayor que 1: <MathFormula formula="b > 1" className="text-xs" />
                      </p>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 font-light list-none">
                        <li>✅ Función <strong>creciente</strong> en todo su dominio</li>
                        <li>✅ A medida que $x$ aumenta, $f(x)$ también aumenta</li>
                        <li>✅ La curva pasa por $(1, 0)$, $(b, 1)$, $(b^2, 2)$</li>
                        <li>✅ Ejemplos: $\log_2(x)$, $\log_{10}(x)$, $\ln(x)$</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-2">
                      <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                        Base entre 0 y 1: <MathFormula formula="0 < b < 1" className="text-xs" />
                      </p>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 font-light list-none">
                        <li>⚠️ Función <strong>decreciente</strong> en todo su dominio</li>
                        <li>⚠️ A medida que $x$ aumenta, $f(x)$ disminuye</li>
                        <li>⚠️ La curva pasa por <MathFormula formula="(1,0)" />, <MathFormula formula="\left(\tfrac{1}{b}, 1\right)" /></li>
                        <li>⚠️ Ejemplos: $\log_{0.5}(x)$, $\log_{0.1}(x)$</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl">
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">📌 Puntos clave comunes (para cualquier base válida):</p>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {[
                          { x: '1', y: '0', desc: 'Corte eje x' },
                          { x: 'b', y: '1', desc: 'Un paso arriba' },
                          { x: '\\tfrac{1}{b}', y: '-1', desc: 'Un paso abajo' },
                        ].map(p => (
                          <div key={p.x} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2">
                            <MathFormula formula={`(${p.x},\\ ${p.y})`} className="text-xs font-bold text-violet-600 dark:text-violet-400" />
                            <p className="text-[10px] text-slate-400 mt-0.5">{p.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Ecuaciones Logarítmicas - Marco Teórico */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-600" />
                    Ecuaciones Logarítmicas
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light mt-2 max-w-3xl">
                    Una ecuación logarítmica es cualquier ecuación donde la incógnita aparece dentro de un logaritmo. Para resolverlas, usamos la relación entre logaritmos y exponentes, junto con las propiedades.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      type: 'Tipo 1', title: 'Directa', color: 'violet',
                      formula: '\\log_b(x) = c',
                      method: 'Convertir a exponencial: $x = b^c$',
                      example: '\\log_2(x)=5 \\Rightarrow x=32',
                    },
                    {
                      type: 'Tipo 2', title: 'Con propiedades', color: 'cyan',
                      formula: '\\log_b(A) + \\log_b(B) = c',
                      method: 'Condensar con propiedades, luego convertir a exponencial',
                      example: '\\log(x)+\\log(x-3)=1',
                    },
                    {
                      type: 'Tipo 3', title: 'Igualdad de bases', color: 'fuchsia',
                      formula: '\\log_b(A) = \\log_b(B)',
                      method: 'Igualar los argumentos directamente: $A = B$',
                      example: '\\log_3(x^2)=\\log_3(9x-18)',
                    },
                    {
                      type: 'Tipo 4', title: 'Cuadrática logarítmica', color: 'amber',
                      formula: '[\\log_b(x)]^2 + k\\cdot\\log_b(x) = c',
                      method: 'Sustituir $u = \\log_b(x)$ y resolver la cuadrática resultante',
                      example: '[\\log(x)]^2 - \\log(x) - 2 = 0',
                    },
                  ].map(t => (
                    <div key={t.type} className={`bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 space-y-3 shadow-sm`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-${t.color}-500/10 text-${t.color}-600 dark:text-${t.color}-400 border border-${t.color}-500/20 font-mono`}>{t.type}</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.title}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950/40 rounded-lg p-2 flex justify-center border border-slate-200 dark:border-slate-900">
                        <MathFormula formula={t.formula} />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">{t.method}</p>
                      <div className="bg-slate-100/80 dark:bg-slate-900/60 rounded-lg p-2 overflow-x-auto">
                        <MathFormula formula={t.example} className="text-xs text-slate-700 dark:text-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Regla de oro: verificar */}
                <div className="bg-amber-500/5 border border-amber-500/30 rounded-2xl p-5 flex gap-4 items-start">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600 dark:text-amber-400 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">Regla de Oro: Siempre Verificar</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                      Al resolver ecuaciones logarítmicas, pueden aparecer <strong>soluciones extrañas</strong> (valores de $x$ que hacen inválido algún logaritmo). Una vez obtenidas las soluciones posibles, se debe sustituir en la ecuación original para confirmar que <em>todos los argumentos son estrictamente positivos</em>.
                    </p>
                    <div className="mt-2 p-3 bg-white dark:bg-slate-900/60 rounded-lg border border-amber-500/20 text-xs">
                      <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">Ejemplo de solución extraña:</p>
                      <MathFormula formula="\log(x) + \log(x+3) = 1 \Rightarrow x^2+3x-10=0 \Rightarrow x=2 \text{ o } x=-5" className="text-xs text-slate-700 dark:text-slate-300" />
                      <p className="text-slate-500 dark:text-slate-400 mt-1">$x = -5$: hace $\log(-5)$ indefinido → se descarta.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Warm-ups */}
              <div className="bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-600" />
                    Calentamiento Rápido
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-light">Comprueba tu comprensión inicial con estas 3 preguntas directas.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* WU 1 */}
                  <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">EJERCICIO 1</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">¿Cuál es el dominio de la función?</p>
                      <div className="py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-center">
                        <MathFormula formula="f(x) = \log_3(2x - 6)" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      {[
                        { label: 'x mayor 3', formula: 'x > 3', correct: true },
                        { label: 'x mayor 6', formula: 'x > 6', correct: false },
                        { label: 'x mayor 2', formula: 'x > 2', correct: false },
                      ].map(opt => (
                        <button key={opt.label} onClick={() => setQuickAnswers(p => ({ ...p, q1: opt.label }))}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            quickAnswers.q1 === opt.label
                              ? opt.correct ? 'bg-green-500/10 border-green-500/30 text-green-600' : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                          <MathFormula formula={opt.formula} />
                        </button>
                      ))}
                    </div>
                    {quickAnswers.q1 && (
                      <div className="mt-3 text-[11px] leading-relaxed">
                        {quickAnswers.q1 === 'x mayor 3'
                          ? <p className="text-green-600 dark:text-green-400 font-medium"><strong>{'✓'} ¡Correcto!</strong> El argumento debe ser positivo: <MathFormula formula="2x-6>0 \Rightarrow x>3" /></p>
                          : <p className="text-rose-600 dark:text-rose-400 font-medium"><strong>{'✗'} Incorrecto.</strong> Despeja: <MathFormula formula="2x-6>0 \Rightarrow x>3" />. Intenta de nuevo.</p>
                        }
                      </div>
                    )}
                  </div>

                  {/* WU 2 */}
                  <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">EJERCICIO 2</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Resuelve la ecuación directa:</p>
                      <div className="py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-center">
                        <MathFormula formula="\log_4(x) = 3" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {[12, 64, 7].map(opt => (
                        <button key={opt} onClick={() => setQuickAnswers(p => ({ ...p, q2: opt }))}
                          className={`flex-grow py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            quickAnswers.q2 === opt
                              ? opt === 64 ? 'bg-green-500/10 border-green-500/30 text-green-600' : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                    {quickAnswers.q2 !== null && (
                      <div className="mt-3 text-[11px] leading-relaxed">
                        {quickAnswers.q2 === 64
                          ? <p className="text-green-600 dark:text-green-400 font-medium"><strong>✓ ¡Correcto!</strong> Forma exp.: $4^3 = 64$.</p>
                          : <p className="text-rose-600 dark:text-rose-400 font-medium"><strong>✗ Incorrecto.</strong> Convertir: $4^3 = 64$. Intenta de nuevo.</p>
                        }
                      </div>
                    )}
                  </div>

                  {/* WU 3 */}
                  <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">EJERCICIO 3</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Al resolver la ecuación, ¿cuál es la solución válida?</p>
                      <div className="py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-center">
                        <MathFormula formula="\log(x) + \log(x+3) = 1" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      {[
                        { label: 'x = 2', correct: true },
                        { label: 'x = -5', correct: false },
                        { label: 'x = 5', correct: false },
                      ].map(opt => (
                        <button key={opt.label} onClick={() => setQuickAnswers(p => ({ ...p, q3: opt.label }))}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            quickAnswers.q3 === opt.label
                              ? opt.correct ? 'bg-green-500/10 border-green-500/30 text-green-600' : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                          <MathFormula formula={opt.label} />
                        </button>
                      ))}
                    </div>
                    {quickAnswers.q3 && (
                      <div className="mt-3 text-[11px] leading-relaxed">
                        {quickAnswers.q3 === 'x = 2'
                          ? <p className="text-green-600 dark:text-green-400 font-medium"><strong>✓ ¡Correcto!</strong> $x^2+3x-10=0 \Rightarrow (x+5)(x-2)=0$. Solo $x=2$ cumple la condición de argumento positivo.</p>
                          : <p className="text-rose-600 dark:text-rose-400 font-medium"><strong>✗ Incorrecto.</strong> Recuerda verificar que los argumentos sean positivos. $x=-5$ haría $\log(-5)$ que es indefinido.</p>
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── EXAMPLES TAB ── */}
          {activeTab === 'examples' && (
            <motion.div key="examples" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="space-y-10">

              {/* Section: Evaluación */}
              <ExampleSection
                title="Sección A — Evaluación de Funciones Logarítmicas"
                badge="Nivel: Inicial"
                badgeColor="violet"
                description="Aprende a sustituir valores específicos en la función y calcular su imagen directamente."
                examples={examplesData.evaluacion}
              />

              {/* Section: Dominio */}
              <ExampleSection
                title="Sección B — Dominio de Funciones Logarítmicas"
                badge="Nivel: Básico–Intermedio"
                badgeColor="cyan"
                description="El dominio es el conjunto de valores que puede tomar x para que el argumento sea estrictamente positivo."
                examples={examplesData.dominio}
                showNota
              />

              {/* Section: Ecuaciones Básicas */}
              <ExampleSection
                title="Sección C — Ecuaciones Logarítmicas Directas"
                badge="Nivel: Básico"
                badgeColor="fuchsia"
                description="La técnica principal: convertir de forma logarítmica a forma exponencial para despejar x."
                examples={examplesData.ecuacionesBasicas}
              />

              {/* Section: Ecuaciones con Propiedades */}
              <ExampleSection
                title="Sección D — Ecuaciones con Propiedades Logarítmicas"
                badge="Nivel: Intermedio"
                badgeColor="amber"
                description="Combinamos las leyes de logaritmos para simplificar la ecuación antes de resolver. No olvides verificar las soluciones obtenidas."
                examples={examplesData.ecuacionesPropiedades}
                showAlerta
                showNota
              />

              {/* Section: Avanzados */}
              <ExampleSection
                title="Sección E — Ecuaciones Avanzadas"
                badge="Nivel: Desafiante"
                badgeColor="rose"
                description="Sistemas de ecuaciones, ecuaciones cuadráticas en términos logarítmicos y casos con radicales."
                examples={examplesData.avanzados}
                showNota
              />
            </motion.div>
          )}

          {/* ── GRAPH EXPLORER TAB ── */}
          {activeTab === 'explorer' && (
            <motion.div key="explorer" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-violet-600" />
                  Explorador Interactivo de la Función Logarítmica
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-light leading-relaxed max-w-3xl">
                  Mueve el deslizador para cambiar la base <MathFormula formula="b" /> y observa en tiempo real cómo cambia la forma de la curva, los puntos clave y las características de la función.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                <LogGraphExplorer />
              </div>

              {/* Transformaciones */}
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-sm">
                <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Transformaciones de la Función Logarítmica
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { formula: 'f(x) = \\log_b(x) + k', effect: 'Desplazamiento vertical: sube (+k) o baja (-k) la curva' },
                    { formula: 'f(x) = \\log_b(x - h)', effect: 'Desplazamiento horizontal: mueve la asíntota a x = h' },
                    { formula: 'f(x) = -\\log_b(x)', effect: 'Reflexión sobre el eje x: la curva se invierte verticalmente' },
                    { formula: 'f(x) = \\log_b(-x)', effect: 'Reflexión sobre el eje y: dominio cambia a (-∞, 0)' },
                    { formula: 'f(x) = k\\cdot\\log_b(x)', effect: 'Estiramiento/compresión vertical: k > 1 estira, 0 < k < 1 comprime' },
                    { formula: 'f(x) = \\log_b(kx)', effect: 'Compresión horizontal: la curva se acerca o aleja del eje y' },
                  ].map(({ formula, effect }) => (
                    <div key={formula} className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="flex justify-center">
                        <MathFormula formula={formula} className="text-sm font-bold text-violet-600 dark:text-violet-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 text-center font-light leading-relaxed">{effect}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── VIDEO TAB ── */}
          {activeTab === 'videos' && (
            <motion.div key="videos" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="space-y-6">
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-500/10 text-red-500 dark:text-red-400 rounded-xl">
                    <Play className="w-6 h-6 fill-red-500/20" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-display">Clase Grabada: Funciones y Ecuaciones Logarítmicas</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Gráficas, dominio, características y resolución de ecuaciones</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-5 gap-8 items-start">
                  <div className="md:col-span-3 space-y-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg">
                      <iframe
                        src="https://www.youtube.com/embed/ME9SJ-_HDHA"
                        title="iSebas Portal EDU - Funciones y Ecuaciones Logarítmicas"
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 font-mono">Contenidos del Video</span>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-lg leading-snug">Funciones Logarítmicas y Ecuaciones</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                        En esta clase aprenderás a identificar y graficar funciones logarítmicas, encontrar su dominio y rango, y resolver ecuaciones logarítmicas aplicando las propiedades de forma sistemática.
                      </p>
                    </div>
                    <div className="space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {[
                        ['Tema principal:', 'Funciones y Ecuaciones'],
                        ['Requisito previo:', 'Propiedades de Logaritmos'],
                        ['Habilidades:', 'Graficar, Resolver, Verificar'],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span>{k}</span>
                          <span className="text-slate-700 dark:text-slate-300 font-mono">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── QUIZ TAB ── */}
          {activeTab === 'exercises' && (
            <motion.div key="exercises" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              {!quizStarted ? (
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 max-w-2xl mx-auto text-center space-y-6 shadow-sm">
                  <div className="w-16 h-16 bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-display">Prueba de Autoevaluación — Fase 3</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                      Demuestra tu dominio sobre funciones y ecuaciones logarítmicas. El cuestionario evalúa: dominio de funciones, resolución de ecuaciones con propiedades, verificación de soluciones y cálculo con logaritmos dados.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/50 p-4 border border-slate-200 dark:border-slate-900 rounded-xl inline-grid grid-cols-3 gap-6 text-xs text-slate-500 dark:text-slate-400 w-full shadow-inner">
                    {[['Preguntas', '5 Ejercicios'], ['Temas', 'Funciones y Ecua.'], ['Retroalimentación', 'Paso a Paso']].map(([k, v]) => (
                      <div key={k}><span className="block text-slate-400 dark:text-slate-500 mb-1">{k}</span><span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm font-mono">{v}</span></div>
                    ))}
                  </div>
                  <button onClick={() => setQuizStarted(true)}
                    className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-600/15 cursor-pointer">
                    Iniciar Ejercicios
                  </button>
                </div>
              ) : quizFinished ? (
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 max-w-2xl mx-auto text-center space-y-6 shadow-sm">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto border ${score >= 4 ? 'bg-green-500/10 border-green-500/30 text-green-600' : 'bg-amber-500/10 border-amber-500/30 text-amber-600'}`}>
                    <Award className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-display">¡Ejercicios Completados!</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Tu puntaje final es:</p>
                    <div className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 pt-2 font-mono">{score} / {quizQuestions.length}</div>
                    <p className="text-sm font-bold pt-1">
                      {score === 5 ? '¡Excelente! Dominas las funciones y ecuaciones logarítmicas.'
                        : score >= 3 ? '¡Muy bien! Tienes sólidas bases. Repasa los tipos de ecuación que fallaste.'
                        : 'Sigue practicando. Revisa la sección de Ejemplos Resueltos y vuelve a intentarlo.'}
                    </p>
                  </div>
                  <button onClick={handleResetQuiz}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition-all text-sm font-bold cursor-pointer">
                    <RefreshCw className="w-4 h-4" /> Recomenzar Cuestionario
                  </button>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto space-y-6 shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-4">
                    <span className="text-xs font-mono font-bold text-slate-500">EJERCICIO {currentQuestion + 1} DE {quizQuestions.length}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-violet-500/10 text-violet-700 dark:text-violet-400 font-mono">Puntuación: {score}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-violet-600 h-full transition-all duration-300" style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }} />
                  </div>
                  <div className="space-y-4 pt-2">
                    <p className="text-slate-800 dark:text-slate-200 font-bold md:text-lg leading-relaxed">
                      {quizQuestions[currentQuestion].question.split('$').map((part, i) => (
                        i % 2 === 0 ? part : <MathFormula key={i} formula={part} className="text-violet-600 dark:text-violet-400 font-bold mx-1" />
                      ))}
                    </p>
                    <div className="py-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl flex justify-center border border-slate-200 dark:border-slate-900/60 shadow-inner">
                      <MathFormula formula={quizQuestions[currentQuestion].latex} displayMode={true} className="text-xl font-bold" />
                    </div>
                  </div>
                  <div className="space-y-3 pt-2">
                    {quizQuestions[currentQuestion].options.map((option, idx) => {
                      const isSelected = selectedAnswer === idx;
                      const isCorrect = idx === quizQuestions[currentQuestion].correctIndex;
                      let style = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/20';
                      if (isSubmitted) {
                        if (isCorrect) style = 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 font-semibold';
                        else if (isSelected) style = 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 font-semibold';
                        else style = 'border-slate-100 dark:border-slate-900/40 text-slate-400 dark:text-slate-600 opacity-60';
                      } else if (isSelected) {
                        style = 'border-violet-500 bg-violet-500/5 text-violet-600 dark:text-violet-400 font-semibold shadow-inner';
                      }
                      return (
                        <button key={idx} onClick={() => handleAnswerSelection(idx)} disabled={isSubmitted}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-sm cursor-pointer ${style}`}>
                          <span className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-850 flex items-center justify-center font-mono font-bold text-xs shadow-sm border border-slate-200/50 dark:border-slate-800 select-none">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <MathFormula formula={option} />
                          </span>
                          {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                          {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                  {isSubmitted && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      className="p-5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-900 space-y-2 leading-relaxed shadow-inner">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                        <Info className="w-3.5 h-3.5 text-violet-600" /> Explicación Paso a Paso:
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-light">
                        {quizQuestions[currentQuestion].explanation.split('$').map((part, i) => (
                          i % 2 === 0 ? part : <MathFormula key={i} formula={part} className="text-violet-600 dark:text-violet-400 font-semibold mx-0.5" />
                        ))}
                      </p>
                    </motion.div>
                  )}
                  <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    {!isSubmitted ? (
                      <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${selectedAnswer !== null ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-450 border border-slate-200/50 dark:border-slate-700 cursor-not-allowed'}`}>
                        Enviar Respuesta
                      </button>
                    ) : (
                      <button onClick={handleNextQuestion}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold transition-all shadow-md cursor-pointer">
                        {currentQuestion + 1 === quizQuestions.length ? 'Finalizar Cuestionario' : 'Siguiente Ejercicio'}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── RESOURCES TAB ── */}
          {activeTab === 'resources' && (
            <motion.div key="resources" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-600" />
                  Descarga de Taller (PDF)
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">
                  Descarga la guía oficial de ejercicios prácticos sobre funciones y ecuaciones logarítmicas. Incluye problemas de dominio, resolución de ecuaciones, verificación de soluciones extrañas y situaciones problema aplicadas.
                </p>
                <div className="max-w-md pt-2">
                  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono font-bold text-violet-600 dark:text-violet-400 uppercase">PDF</span>
                        <span>Fase 3: Funciones y Ecuaciones</span>
                      </div>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-base leading-snug">Taller 3: Funciones y Ecuaciones Logarítmicas</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                        Ejercicios de dominio, gráficas, resolución por tipos (directa, propiedades, cuadrática logarítmica) y situaciones aplicadas con verificación de soluciones.
                      </p>
                    </div>
                    <a
                      href="./cursos/matematica-basica/logaritmos/talleres/taller_funciones_ecuaciones_01_logaritmos.pdf"
                      download="taller_funciones_ecuaciones_01_logaritmos.pdf"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-250 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer">
                      <Download className="w-3.5 h-3.5" />
                      Descargar Taller
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  ExampleSection helper component
// ─────────────────────────────────────────────────────────────
function ExampleSection({ title, badge, badgeColor, description, examples, showNota = false, showAlerta = false }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="space-y-4">
      <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded bg-${badgeColor}-500/10 text-${badgeColor}-700 dark:text-${badgeColor}-400 uppercase font-mono border border-${badgeColor}-500/20`}>
            {badge}
          </span>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-light leading-relaxed max-w-3xl">{description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {examples.map((ex, idx) => (
          <div key={idx}
            className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full text-left p-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-${badgeColor}-500/10 text-${badgeColor}-600 dark:text-${badgeColor}-400 border border-${badgeColor}-500/20 uppercase`}>
                    Ej. {idx + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{ex.title}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                  {ex.given && (
                    <span className="flex items-center gap-1">
                      <span className="font-semibold">Dado:</span>
                      <MathFormula formula={ex.given} />
                    </span>
                  )}
                  {ex.find && (
                    <span className="flex items-center gap-1">
                      <span className="font-semibold">Hallar:</span>
                      <MathFormula formula={ex.find} />
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform mt-1 ${openIdx === idx ? 'rotate-90' : ''}`} />
            </button>

            {/* Expanded steps */}
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-slate-100 dark:border-slate-800/60 p-5 space-y-4 bg-slate-50/50 dark:bg-slate-950/30">
                    {/* Steps */}
                    <div className="space-y-3">
                      {ex.steps.map((step, si) => (
                        <div key={si} className="flex gap-3 items-start">
                          <span className={`shrink-0 w-6 h-6 rounded-full bg-${badgeColor}-500/10 text-${badgeColor}-600 dark:text-${badgeColor}-400 text-[10px] font-extrabold flex items-center justify-center border border-${badgeColor}-500/20 mt-0.5`}>
                            {si + 1}
                          </span>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                            {step.split('$').map((part, pi) => (
                              pi % 2 === 0 ? part : <MathFormula key={pi} formula={part} className="text-violet-600 dark:text-violet-400 font-semibold mx-0.5" />
                            ))}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Result */}
                    {ex.result && (
                      <div className={`p-3 bg-${badgeColor}-500/5 border border-${badgeColor}-500/20 rounded-xl flex flex-col items-center gap-1`}>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Resultado:</span>
                        <MathFormula formula={ex.result} className={`font-bold text-${badgeColor}-700 dark:text-${badgeColor}-400 text-sm`} />
                      </div>
                    )}

                    {/* Alert for extraneous solutions */}
                    {showAlerta && ex.alerta && (
                      <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex gap-2 items-start">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed">{ex.notaAlerta}</p>
                      </div>
                    )}

                    {/* Nota pedagógica */}
                    {showNota && ex.nota && (
                      <div className="p-3 bg-violet-500/5 border border-violet-500/20 rounded-xl flex gap-2 items-start">
                        <Lightbulb className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-violet-700 dark:text-violet-400 leading-relaxed">{ex.nota}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
