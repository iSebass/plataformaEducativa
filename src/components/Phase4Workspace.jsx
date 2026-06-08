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
  Zap,
  AlertTriangle,
  Lightbulb,
  Target,
  Calculator,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  Interactive Exponential Solver
// ─────────────────────────────────────────────────────────────
function ExponentialSolver() {
  const [base, setBase] = useState(2);
  const [rhs, setRhs] = useState(10);
  const [solved, setSolved] = useState(false);

  const logBase = Math.log10(base);
  const logRhs = Math.log10(rhs);
  const result = logRhs / logBase;
  const isValid = base > 0 && base !== 1 && rhs > 0;

  const logBaseStr = logBase.toFixed(4);
  const logRhsStr = logRhs.toFixed(4);
  const resultStr = isFinite(result) ? result.toFixed(4) : '—';

  const steps = [
    {
      label: 'Escribir la ecuación',
      formula: `${base}^x = ${rhs}`,
      note: 'Forma: base elevada a la incógnita = resultado conocido.',
    },
    {
      label: 'Aplicar logaritmo (base 10) a ambos lados',
      formula: `\\log(${base}^x) = \\log(${rhs})`,
      note: 'Principio de igualdad: si A = B entonces log(A) = log(B).',
    },
    {
      label: 'Bajar el exponente — propiedad de la potencia',
      formula: `x \\cdot \\log(${base}) = \\log(${rhs})`,
      note: `Propiedad: log(b^n) = n·log(b). El exponente x baja como multiplicador.`,
    },
    {
      label: 'Despejar x dividiendo ambos lados por log(' + base + ')',
      formula: `x = \\dfrac{\\log(${rhs})}{\\log(${base})} = \\dfrac{${logRhsStr}}{${logBaseStr}}`,
      note: 'Dividimos ambos lados entre log(base). Esto también equivale a log₍base₎(rhs).',
    },
    {
      label: 'Resultado final (aproximado)',
      formula: `x \\approx ${resultStr}`,
      note: `Verificación: ${base}^{${resultStr}} ≈ ${rhs}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 space-y-5 shadow-sm">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 text-sm">
              <Calculator className="w-4 h-4 text-orange-500" />
              Configura tu ecuación: <MathFormula formula="b^x = c" />
            </h4>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Base (b) — debe ser positivo y ≠ 1
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range" min="1.1" max="10" step="0.1" value={base}
                    onChange={e => { setBase(parseFloat(e.target.value)); setSolved(false); }}
                    className="flex-1 accent-orange-500 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number" min="1.1" max="100" step="0.1" value={base}
                    onChange={e => { const v = parseFloat(e.target.value); if (v > 0 && v !== 1) { setBase(v); setSolved(false); } }}
                    className="w-16 text-center text-sm font-extrabold text-orange-600 dark:text-orange-400 bg-orange-500/5 border border-orange-500/20 rounded-lg py-1 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Resultado (c) — debe ser positivo
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range" min="0.1" max="500" step="0.5" value={rhs}
                    onChange={e => { setRhs(parseFloat(e.target.value)); setSolved(false); }}
                    className="flex-1 accent-orange-500 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number" min="0.01" step="1" value={rhs}
                    onChange={e => { const v = parseFloat(e.target.value); if (v > 0) { setRhs(v); setSolved(false); } }}
                    className="w-16 text-center text-sm font-extrabold text-orange-600 dark:text-orange-400 bg-orange-500/5 border border-orange-500/20 rounded-lg py-1 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="py-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-900 flex justify-center shadow-inner">
              <MathFormula formula={`${base}^x = ${rhs}`} displayMode className="text-xl" />
            </div>

            <button
              onClick={() => setSolved(true)}
              disabled={!isValid}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                isValid
                  ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              {solved ? '✓ Solución mostrada abajo' : '▶ Resolver paso a paso'}
            </button>
          </div>

          {/* Preset examples */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ejemplos rápidos:</p>
            <div className="flex flex-wrap gap-2">
              {[
                { b: 2, c: 10, label: '2ˣ = 10' },
                { b: 3, c: 50, label: '3ˣ = 50' },
                { b: 5, c: 100, label: '5ˣ = 100' },
                { b: 10, c: 250, label: '10ˣ = 250' },
                { b: 2, c: 0.125, label: '2ˣ = 0.125' },
              ].map(p => (
                <button
                  key={p.label}
                  onClick={() => { setBase(p.b); setRhs(p.c); setSolved(true); }}
                  className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-orange-400 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 text-slate-700 dark:text-slate-300 rounded-lg transition-all cursor-pointer font-mono"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Steps display */}
        <div className="space-y-3">
          <AnimatePresence>
            {solved && isValid && steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12, duration: 0.3 }}
                className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 space-y-2 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-extrabold flex items-center justify-center border border-orange-500/20 shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{step.label}</span>
                </div>
                <div className="pl-8 space-y-1">
                  <div className="py-2 bg-slate-50 dark:bg-slate-950/40 rounded-lg border border-slate-100 dark:border-slate-900 flex justify-center">
                    <MathFormula formula={step.formula} displayMode={i === 4} className="text-sm font-bold" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light italic">{step.note}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {!solved && (
            <div className="h-full min-h-[220px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-400 dark:text-slate-600">
              <Calculator className="w-8 h-8 opacity-30" />
              <p className="text-sm font-light">Configura la ecuación y presiona <strong>Resolver</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  ExampleSection helper
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
          <div key={idx} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
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
                      <span className="font-semibold">Resolver:</span>
                      <MathFormula formula={ex.given} />
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform mt-1 ${openIdx === idx ? 'rotate-90' : ''}`} />
            </button>
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
                    <div className="space-y-3">
                      {ex.steps.map((step, si) => (
                        <div key={si} className="flex gap-3 items-start">
                          <span className={`shrink-0 w-6 h-6 rounded-full bg-${badgeColor}-500/10 text-${badgeColor}-600 dark:text-${badgeColor}-400 text-[10px] font-extrabold flex items-center justify-center border border-${badgeColor}-500/20 mt-0.5`}>
                            {si + 1}
                          </span>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                            {step.split('$').map((part, pi) => (
                              pi % 2 === 0 ? part : <MathFormula key={pi} formula={part} className="text-orange-600 dark:text-orange-400 font-semibold mx-0.5" />
                            ))}
                          </p>
                        </div>
                      ))}
                    </div>
                    {ex.result && (
                      <div className={`p-3 bg-${badgeColor}-500/5 border border-${badgeColor}-500/20 rounded-xl flex flex-col items-center gap-1`}>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Resultado:</span>
                        <MathFormula formula={ex.result} className={`font-bold text-${badgeColor}-700 dark:text-${badgeColor}-400 text-sm`} />
                      </div>
                    )}
                    {showAlerta && ex.alerta && (
                      <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex gap-2 items-start">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed">{ex.notaAlerta}</p>
                      </div>
                    )}
                    {showNota && ex.nota && (
                      <div className="p-3 bg-orange-500/5 border border-orange-500/20 rounded-xl flex gap-2 items-start">
                        <Lightbulb className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-orange-700 dark:text-orange-400 leading-relaxed">{ex.nota}</p>
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

// ─────────────────────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────────────────────
export default function Phase4Workspace({ onBack }) {
  const [activeTab, setActiveTab] = useState('theory');
  const [quickAnswers, setQuickAnswers] = useState({ q1: null, q2: null, q3: null });

  // Quiz
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = [
    {
      question: 'Resuelve directamente sin logaritmo (reconocimiento de potencias):',
      latex: '2^x = 64',
      options: ['x = 5', 'x = 6', 'x = 8', 'x = 7'],
      correctIndex: 1,
      explanation: 'Reconocemos que $2^6 = 64$ (ya que $2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^5=32, 2^6=64$). Por lo tanto $x = 6$. No necesitamos logaritmo cuando la solución es un número entero reconocible.',
    },
    {
      question: 'Aplica logaritmo a ambos lados. ¿Cuál es el valor exacto de x?',
      latex: '5^x = 100',
      options: [
        'x = \\dfrac{\\log 100}{\\log 5} = \\dfrac{2}{\\log 5}',
        'x = \\log_5(100) = \\log(100)\\cdot\\log(5)',
        'x = 5^{100}',
        'x = \\dfrac{\\log 5}{\\log 100}',
      ],
      correctIndex: 0,
      explanation: 'Aplicamos log a ambos lados: $\\log(5^x) = \\log(100) \\Rightarrow x\\log(5) = \\log(100) \\Rightarrow x = \\dfrac{\\log(100)}{\\log(5)} = \\dfrac{2}{\\log(5)} \\approx \\dfrac{2}{0.699} \\approx 2.861$. La opción A es la correcta y equivale a $\\log_5(100)$ por cambio de base.',
    },
    {
      question: 'Resuelve la ecuación con exponente como expresión algebraica:',
      latex: '3^{2x-1} = 81',
      options: ['x = 2.5', 'x = 2', 'x = 3', 'x = 1.5'],
      correctIndex: 0,
      explanation: 'Reconocemos $81 = 3^4$. Entonces $3^{2x-1} = 3^4 \\Rightarrow 2x - 1 = 4 \\Rightarrow 2x = 5 \\Rightarrow x = 2.5$. Cuando las bases son iguales, igualamos los exponentes directamente.',
    },
    {
      question: 'Identifica la sustitución correcta para resolver la ecuación cuadrática exponencial:',
      latex: '4^x - 5 \\cdot 2^x + 4 = 0',
      options: [
        'u = 2^x,\\quad u^2 - 5u + 4 = 0 \\Rightarrow x = 0 \\text{ o } x = 2',
        'u = 4^x,\\quad u - 5u + 4 = 0',
        'u = x^2,\\quad 4u - 5 + 4 = 0',
        'u = 2x,\\quad 4^u - 5 + 4 = 0',
      ],
      correctIndex: 0,
      explanation: 'Clave: $4^x = (2^2)^x = (2^x)^2$. Sustituimos $u = 2^x$: la ecuación queda $u^2 - 5u + 4 = 0 \\Rightarrow (u-1)(u-4) = 0 \\Rightarrow u = 1$ o $u = 4$. Regresamos: $2^x = 1 \\Rightarrow x = 0$ y $2^x = 4 \\Rightarrow x = 2$.',
    },
    {
      question: 'Un capital de $5000$ USD se invierte con una tasa del $8\\%$ anual compuesto. ¿En cuántos años se duplica?',
      latex: '5000 \\cdot (1.08)^t = 10000',
      options: [
        't \\approx 9.01 \\text{ años}',
        't \\approx 12.5 \\text{ años}',
        't \\approx 6.5 \\text{ años}',
        't = 8 \\text{ años exactos}',
      ],
      correctIndex: 0,
      explanation: 'Simplificamos: $(1.08)^t = 2$. Aplicamos log: $t \\cdot \\log(1.08) = \\log(2) \\Rightarrow t = \\dfrac{\\log(2)}{\\log(1.08)} = \\dfrac{0.30103}{0.03342} \\approx 9.006$ años. A mayor tasa de interés, menor el tiempo de duplicación.',
    },
  ];

  const handleAnswerSelection = (index) => { if (!isSubmitted) setSelectedAnswer(index); };
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);
    if (selectedAnswer === quizQuestions[currentQuestion].correctIndex) setScore(s => s + 1);
  };
  const handleNextQuestion = () => {
    setSelectedAnswer(null); setIsSubmitted(false);
    if (currentQuestion + 1 < quizQuestions.length) setCurrentQuestion(q => q + 1);
    else setQuizFinished(true);
  };
  const handleResetQuiz = () => {
    setCurrentQuestion(0); setSelectedAnswer(null); setIsSubmitted(false);
    setScore(0); setQuizFinished(false); setQuizStarted(false);
  };

  const tabs = [
    { id: 'theory',    icon: <BookOpen className="w-4 h-4" />,    label: 'Estrategia y Teoría' },
    { id: 'examples',  icon: <Target className="w-4 h-4" />,      label: 'Ejemplos Resueltos' },
    { id: 'solver',    icon: <Zap className="w-4 h-4" />,         label: 'Solver Interactivo' },
    { id: 'videos',    icon: <Play className="w-4 h-4" />,        label: 'Clase en Video' },
    { id: 'exercises', icon: <Award className="w-4 h-4" />,       label: 'Ejercicios de Práctica' },
    { id: 'resources', icon: <FileText className="w-4 h-4" />,    label: 'Taller PDF' },
  ];

  // ── Example data ──────────────────────────────────────────
  const examplesData = {
    reconocimiento: [
      {
        title: 'Solución entera por reconocimiento',
        given: '2^x = 32',
        steps: [
          'Preguntamos: ¿a qué potencia elevo 2 para obtener 32?',
          'Revisamos potencias de 2: $2^1=2,\\ 2^2=4,\\ 2^3=8,\\ 2^4=16,\\ 2^5=32$.',
          'Encontramos que $2^5 = 32$, por lo tanto $x = 5$.',
          'Verificamos: $2^5 = 32$ ✓.',
        ],
        result: 'x = 5',
        nota: 'Si la solución es un entero "redondo", siempre conviene intentar el reconocimiento antes de aplicar logaritmos.',
      },
      {
        title: 'Base fraccionaria — exponente negativo',
        given: '\\left(\\tfrac{1}{2}\\right)^x = 8',
        steps: [
          'Reescribimos la base: $\\left(\\tfrac{1}{2}\\right)^x = 2^{-x}$.',
          'Reescribimos el lado derecho: $8 = 2^3$.',
          'Igualamos: $2^{-x} = 2^3 \\Rightarrow -x = 3 \\Rightarrow x = -3$.',
          'Verificamos: $\\left(\\tfrac{1}{2}\\right)^{-3} = 2^3 = 8$ ✓.',
        ],
        result: 'x = -3',
        nota: 'Cuando la base es una fracción del tipo 1/b, conviene escribirla como b⁻¹ para unificar la base.',
      },
      {
        title: 'Resultado igual a 1 — propiedad especial',
        given: '5^x = 1',
        steps: [
          'Recordamos la propiedad: cualquier número elevado a 0 es igual a 1.',
          '$5^0 = 1$, entonces $x = 0$.',
          'Esta propiedad es válida para cualquier base $b > 0$, $b \\neq 1$: $b^0 = 1$.',
        ],
        result: 'x = 0',
      },
      {
        title: 'Bases con potencias cruzadas',
        given: '4^x = 2^{x+3}',
        steps: [
          'Reescribimos $4 = 2^2$: $4^x = (2^2)^x = 2^{2x}$.',
          'Ahora ambos lados tienen base 2: $2^{2x} = 2^{x+3}$.',
          'Igualamos exponentes: $2x = x + 3 \\Rightarrow x = 3$.',
          'Verificamos: $4^3 = 64$ y $2^{3+3} = 2^6 = 64$ ✓.',
        ],
        result: 'x = 3',
        nota: 'Clave: convertir todas las bases a la misma base mínima antes de igualar exponentes.',
      },
    ],
    logaritmoBasico: [
      {
        title: 'El caso clásico — 2ˣ = 10',
        given: '2^x = 10',
        steps: [
          'No existe entero $x$ tal que $2^x = 10$ (entre $2^3=8$ y $2^4=16$).',
          'Aplicamos $\\log$ a ambos lados: $\\log(2^x) = \\log(10)$.',
          'Propiedad de la potencia: $x \\cdot \\log(2) = \\log(10) = 1$.',
          'Despejamos: $x = \\dfrac{1}{\\log(2)} = \\dfrac{1}{0.3010} \\approx 3.3219$.',
          'Verificamos: $2^{3.3219} \\approx 10$ ✓.',
        ],
        result: 'x = \\dfrac{\\log(10)}{\\log(2)} = \\dfrac{1}{\\log 2} \\approx 3.3219',
        nota: 'Este es el ejemplo más representativo del tema. El logaritmo nos permite salir del "mundo del exponente" y resolver para x en el dominio real.',
      },
      {
        title: 'Base 3 — resultado no entero',
        given: '3^x = 20',
        steps: [
          'Aplicamos log: $\\log(3^x) = \\log(20)$.',
          'Bajamos el exponente: $x \\cdot \\log(3) = \\log(20)$.',
          '$x = \\dfrac{\\log(20)}{\\log(3)} = \\dfrac{1.30103}{0.47712} \\approx 2.7268$.',
          'Verificamos: $3^{2.7268} \\approx 20$ ✓.',
        ],
        result: 'x = \\dfrac{\\log 20}{\\log 3} \\approx 2.7268',
      },
      {
        title: 'Usando logaritmo natural (ln)',
        given: 'e^x = 7',
        steps: [
          'Aplicamos $\\ln$ a ambos lados (es el logaritmo natural, base $e$).',
          '$\\ln(e^x) = \\ln(7)$.',
          'Por definición: $\\ln(e^x) = x$. Entonces $x = \\ln(7)$.',
          '$x \\approx 1.9459$.',
          'Verificamos: $e^{1.9459} \\approx 7$ ✓.',
        ],
        result: 'x = \\ln(7) \\approx 1.9459',
        nota: 'Cuando la base es e, conviene usar el logaritmo natural ln en lugar de log₁₀, ya que ln(eˣ) = x directamente.',
      },
      {
        title: 'Resultado menor que 1 — exponente negativo',
        given: '5^x = 0.04',
        steps: [
          'Observamos que $0.04 < 1$ con base $5 > 1$, entonces $x$ debe ser negativo.',
          'Aplicamos log: $x \\cdot \\log(5) = \\log(0.04)$.',
          '$\\log(0.04) = \\log(4/100) = \\log(4) - 2 \\approx 0.60206 - 2 = -1.39794$.',
          '$x = \\dfrac{-1.39794}{0.69897} \\approx -2$.',
          'Verificamos: $5^{-2} = \\tfrac{1}{25} = 0.04$ ✓ (solución exacta).',
        ],
        result: 'x = -2',
      },
    ],
    expresionAlgebraica: [
      {
        title: 'Exponente como binomio — base reconocible',
        given: '2^{x+3} = 32',
        steps: [
          'Reconocemos $32 = 2^5$.',
          'Igualamos: $2^{x+3} = 2^5 \\Rightarrow x + 3 = 5$.',
          'Despejamos: $x = 2$.',
          'Verificamos: $2^{2+3} = 2^5 = 32$ ✓.',
        ],
        result: 'x = 2',
      },
      {
        title: 'Exponente como expresión — requiere logaritmo',
        given: '5^{x+1} = 200',
        steps: [
          '$200$ no es potencia exacta de 5 ($5^3=125,\\ 5^4=625$).',
          'Aplicamos log: $(x+1)\\log(5) = \\log(200)$.',
          '$x + 1 = \\dfrac{\\log(200)}{\\log(5)} = \\dfrac{2.30103}{0.69897} \\approx 3.2920$.',
          '$x = 3.2920 - 1 = 2.2920$.',
          'Verificamos: $5^{3.2920} \\approx 200$ ✓.',
        ],
        result: 'x \\approx 2.2920',
      },
      {
        title: 'Coeficiente en el exponente',
        given: '2^{3x} = 10',
        steps: [
          'Aplicamos log: $3x \\cdot \\log(2) = \\log(10) = 1$.',
          '$3x = \\dfrac{1}{\\log(2)} = \\dfrac{1}{0.3010} \\approx 3.3219$.',
          '$x = \\dfrac{3.3219}{3} \\approx 1.1073$.',
          'Verificamos: $2^{3(1.1073)} = 2^{3.3219} \\approx 10$ ✓.',
        ],
        result: 'x = \\dfrac{1}{3\\log 2} \\approx 1.1073',
      },
      {
        title: 'Exponente en ambos miembros — misma base',
        given: '3^{2x-1} = 81',
        steps: [
          'Reconocemos $81 = 3^4$.',
          'Igualamos exponentes: $2x - 1 = 4$.',
          '$2x = 5 \\Rightarrow x = 2.5$.',
          'Verificamos: $3^{2(2.5)-1} = 3^4 = 81$ ✓.',
        ],
        result: 'x = 2.5',
        nota: 'La estrategia de escribir ambos lados con la misma base es siempre la preferida cuando es posible, ya que evita decimales.',
      },
    ],
    basesDiferentes: [
      {
        title: 'Exponenciales con bases distintas en ambos lados',
        given: '2^x = 5^{x-1}',
        steps: [
          'Aplicamos log a ambos lados: $x\\log(2) = (x-1)\\log(5)$.',
          'Expandimos: $x\\log(2) = x\\log(5) - \\log(5)$.',
          'Agrupamos términos con $x$: $x\\log(2) - x\\log(5) = -\\log(5)$.',
          '$x[\\log(2) - \\log(5)] = -\\log(5)$.',
          '$x = \\dfrac{-\\log(5)}{\\log(2) - \\log(5)} = \\dfrac{\\log(5)}{\\log(5) - \\log(2)} = \\dfrac{\\log 5}{\\log(5/2)} \\approx \\dfrac{0.699}{0.398} \\approx 1.756$.',
        ],
        result: 'x = \\dfrac{\\log 5}{\\log 5 - \\log 2} \\approx 1.756',
        nota: 'Cuando las bases son distintas en ambos lados, la clave es agrupar todos los términos con x en un lado.',
      },
      {
        title: 'Bases primas distintas — ecuación general',
        given: '3^{x+2} = 7^x',
        steps: [
          'Aplicamos log: $(x+2)\\log(3) = x\\log(7)$.',
          'Expandimos: $x\\log(3) + 2\\log(3) = x\\log(7)$.',
          'Agrupamos: $2\\log(3) = x\\log(7) - x\\log(3) = x[\\log(7)-\\log(3)]$.',
          '$x = \\dfrac{2\\log(3)}{\\log(7) - \\log(3)} = \\dfrac{2\\log 3}{\\log(7/3)} \\approx \\dfrac{2(0.4771)}{0.3679} \\approx 2.595$.',
        ],
        result: 'x = \\dfrac{2\\log 3}{\\log 7 - \\log 3} \\approx 2.595',
      },
    ],
    cuadraticasExponenciales: [
      {
        title: 'Ecuación cuadrática — sustitución u = 2ˣ',
        given: '4^x - 5 \\cdot 2^x + 4 = 0',
        steps: [
          'Observamos que $4^x = (2^2)^x = (2^x)^2$. Definimos $u = 2^x$.',
          'La ecuación queda: $u^2 - 5u + 4 = 0$.',
          'Factorizamos: $(u - 1)(u - 4) = 0 \\Rightarrow u = 1$ o $u = 4$.',
          'Regresamos a $x$: $2^x = 1 \\Rightarrow x = 0$ y $2^x = 4 = 2^2 \\Rightarrow x = 2$.',
          'Verificamos: $4^0 - 5(1) + 4 = 0$ ✓ y $4^2 - 5(4) + 4 = 0$ ✓.',
        ],
        result: 'x = 0 \\text{ o } x = 2',
        nota: 'La sustitución u = base^x transforma la ecuación en una cuadrática clásica. Solo son válidas las soluciones con u > 0.',
      },
      {
        title: 'Sustitución u = 3ˣ',
        given: '9^x - 12 \\cdot 3^x + 27 = 0',
        steps: [
          'Observamos que $9^x = (3^2)^x = (3^x)^2$. Sea $u = 3^x$.',
          'Ecuación: $u^2 - 12u + 27 = 0$.',
          'Factorizamos: $(u - 3)(u - 9) = 0 \\Rightarrow u = 3$ o $u = 9$.',
          'Regresamos: $3^x = 3 \\Rightarrow x = 1$ y $3^x = 9 = 3^2 \\Rightarrow x = 2$.',
          'Verificamos: $9^1 - 12(3) + 27 = 9 - 36 + 27 = 0$ ✓ y $9^2 - 12(9) + 27 = 81 - 108 + 27 = 0$ ✓.',
        ],
        result: 'x = 1 \\text{ o } x = 2',
      },
      {
        title: 'Cuadrática con coeficiente en el término cuadrático',
        given: '2 \\cdot 4^x - 9 \\cdot 2^x + 4 = 0',
        steps: [
          'Recordamos $4^x = (2^x)^2$. Sea $u = 2^x$.',
          'Ecuación: $2u^2 - 9u + 4 = 0$.',
          'Fórmula cuadrática: $u = \\dfrac{9 \\pm \\sqrt{81-32}}{4} = \\dfrac{9 \\pm 7}{4}$.',
          '$u = 4$ o $u = \\tfrac{1}{2}$.',
          'Regresamos: $2^x = 4 = 2^2 \\Rightarrow x = 2$ y $2^x = \\tfrac{1}{2} = 2^{-1} \\Rightarrow x = -1$.',
        ],
        result: 'x = 2 \\text{ o } x = -1',
        nota: 'Cuando la cuadrática no factoriza fácilmente, usamos la fórmula general. Ambas soluciones dan u > 0, por lo que son válidas.',
      },
    ],
    aplicaciones: [
      {
        title: 'Crecimiento poblacional — ¿cuándo se duplica?',
        given: 'P(t) = P_0 \\cdot e^{0.05t},\\ P = 2P_0',
        steps: [
          'Queremos encontrar $t$ tal que $P_0 e^{0.05t} = 2P_0$.',
          'Simplificamos: $e^{0.05t} = 2$.',
          'Aplicamos $\\ln$: $0.05t = \\ln(2) \\approx 0.6931$.',
          '$t = \\dfrac{0.6931}{0.05} \\approx 13.86$ años.',
          'Con un 5% de tasa de crecimiento continua, la población se duplica en ≈ 13.86 años.',
        ],
        result: 't = \\dfrac{\\ln 2}{0.05} \\approx 13.86 \\text{ años}',
        nota: 'Regla del 70: el tiempo de duplicación ≈ 70/tasa(%). Para 5%: 70/5 = 14 años (aproximación rápida).',
      },
      {
        title: 'Interés compuesto — tiempo para duplicar capital',
        given: '5000 \\cdot (1.08)^t = 10000',
        steps: [
          'Simplificamos: $(1.08)^t = 2$.',
          'Aplicamos log: $t \\cdot \\log(1.08) = \\log(2)$.',
          '$t = \\dfrac{\\log(2)}{\\log(1.08)} = \\dfrac{0.30103}{0.03342} \\approx 9.006$ años.',
        ],
        result: 't \\approx 9.006 \\text{ años}',
        nota: 'Regla del 72: tiempo ≈ 72/tasa(%). Para 8%: 72/8 = 9 años. ¡Coincide muy bien!',
      },
      {
        title: 'Desintegración radiactiva — ¿cuándo queda el 25%?',
        given: 'N(t) = N_0 \\cdot \\left(\\dfrac{1}{2}\\right)^{t/10}',
        steps: [
          'Queremos $N(t) = 0.25 N_0$, con período de semidesintegración $T_{1/2} = 10$ años.',
          '$N_0 \\cdot \\left(\\tfrac{1}{2}\\right)^{t/10} = 0.25 N_0 \\Rightarrow \\left(\\tfrac{1}{2}\\right)^{t/10} = \\tfrac{1}{4}$.',
          'Reconocemos: $\\left(\\tfrac{1}{2}\\right)^2 = \\tfrac{1}{4}$, entonces $t/10 = 2 \\Rightarrow t = 20$ años.',
          'Alternativa con log: $\\dfrac{t}{10} \\cdot \\log(0.5) = \\log(0.25) \\Rightarrow t = \\dfrac{10\\log(0.25)}{\\log(0.5)} = \\dfrac{10(-0.602)}{-0.301} = 20$ ✓.',
        ],
        result: 't = 20 \\text{ años}',
        nota: 'El 25% equivale a dos períodos de semidesintegración: después de 10 años queda el 50%, y después de otros 10 años queda el 25%.',
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <button onClick={onBack}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer w-fit">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al Temario
        </button>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-mono text-xs md:text-sm font-bold">
            <span>Matemática Básica</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Fase 4: Logaritmo para Ecuaciones Exponenciales</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 font-display">
            Fase 4: Exponenciales y Desigualdades
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl text-sm md:text-base leading-relaxed font-light">
            Aprende a usar el logaritmo como la herramienta clave para resolver ecuaciones exponenciales del tipo
            <MathFormula formula=" 2^x = 10" className="mx-1 font-semibold text-orange-600 dark:text-orange-400" />.
            Desde el reconocimiento directo hasta las ecuaciones cuadráticas exponenciales y aplicaciones reales.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px custom-scrollbar theme-transition">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-500/5'
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

              {/* The Big Idea */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    El Problema Central
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                    Cuando tenemos una ecuación donde la incógnita <MathFormula formula="x" /> está en el <strong className="text-slate-800 dark:text-slate-200">exponente</strong>, no podemos despejarla directamente con álgebra básica.
                  </p>
                  <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl space-y-3">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">El problema:</p>
                    <MathFormula formula="2^x = 10 \quad \Rightarrow \quad x = \text{ ?}" displayMode className="text-lg" />
                    <p className="text-xs text-slate-500 font-light italic">No podemos dividir o sumar para despejar x del exponente...</p>
                  </div>
                  <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl space-y-3">
                    <p className="text-xs text-green-700 dark:text-green-400 font-semibold uppercase tracking-wider">✅ La solución — usar el logaritmo:</p>
                    <MathFormula formula="x = \log_2(10) = \dfrac{\log(10)}{\log(2)} = \dfrac{1}{0.301} \approx 3.322" displayMode className="text-sm" />
                  </div>
                </div>

                {/* Principle */}
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    Principio Fundamental
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                    El logaritmo y la función exponencial son <strong className="text-slate-800 dark:text-slate-200">funciones inversas</strong>. Si aplicamos el mismo logaritmo a ambos lados de una igualdad, la igualdad se mantiene.
                  </p>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-900 rounded-xl shadow-inner">
                    <MathFormula formula="\text{Si } A = B \text{, entonces } \log(A) = \log(B)" displayMode />
                  </div>
                  <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-violet-700 dark:text-violet-400">La propiedad clave que hace posible todo:</p>
                    <MathFormula formula="\log(b^x) = x \cdot \log(b)" displayMode className="text-base" />
                    <p className="text-xs text-slate-500 font-light italic">El exponente x baja como multiplicador → ¡ahora podemos despejar x!</p>
                  </div>
                </div>
              </div>

              {/* 5 Steps Framework */}
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  Algoritmo de 5 Pasos para Resolver Ecuaciones Exponenciales
                </h3>
                <div className="relative">
                  <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-orange-200 dark:bg-orange-900/40 hidden md:block" />
                  <div className="space-y-4">
                    {[
                      { n: 1, title: 'Aislar la expresión exponencial', detail: 'Mueve todo lo que no sea la exponencial al otro lado de la ecuación.', ex: '3 \\cdot 2^x = 24 \\Rightarrow 2^x = 8', color: 'orange' },
                      { n: 2, title: '¿Puedes reconocer la solución?', detail: 'Si el resultado es una potencia exacta de la base, iguala exponentes directamente. Si no, continúa al paso 3.', ex: '2^x = 8 = 2^3 \\Rightarrow x = 3 \\checkmark', color: 'green' },
                      { n: 3, title: 'Aplicar logaritmo a ambos lados', detail: 'Usa log₁₀ (o ln si la base es e). La elección no afecta el resultado, solo la conveniencia.', ex: '\\log(2^x) = \\log(10)', color: 'violet' },
                      { n: 4, title: 'Aplicar propiedad de la potencia', detail: 'El exponente x baja como multiplicador: log(bˣ) = x·log(b).', ex: 'x \\cdot \\log(2) = \\log(10)', color: 'cyan' },
                      { n: 5, title: 'Despejar x y calcular', detail: 'Divide ambos lados por log(base). Usa calculadora si el resultado no es exacto.', ex: 'x = \\dfrac{\\log(10)}{\\log(2)} \\approx 3.3219', color: 'fuchsia' },
                    ].map(step => (
                      <div key={step.n} className="flex gap-5 items-start pl-0 md:pl-12">
                        <div className={`shrink-0 w-10 h-10 rounded-full bg-${step.color}-500/10 border-2 border-${step.color}-500/30 text-${step.color}-700 dark:text-${step.color}-400 flex items-center justify-center font-extrabold text-sm md:absolute md:left-0 md:top-0 relative`}>
                          {step.n}
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex-1 space-y-2">
                          <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{step.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">{step.detail}</p>
                          <div className="bg-white dark:bg-slate-900/60 rounded-lg p-2 border border-slate-100 dark:border-slate-800/60 flex justify-center overflow-x-auto">
                            <MathFormula formula={step.ex} className="text-xs" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Types overview */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  Tipos de Ecuaciones Exponenciales
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { tipo: 'Tipo 1', nombre: 'Reconocimiento directo', formula: 'b^x = b^n \\Rightarrow x = n', color: 'green', ejemplo: '2^x = 32 \\Rightarrow x = 5' },
                    { tipo: 'Tipo 2', nombre: 'Logaritmo básico', formula: 'b^x = c \\Rightarrow x = \\log_b(c)', color: 'orange', ejemplo: '2^x = 10 \\Rightarrow x \\approx 3.32' },
                    { tipo: 'Tipo 3', nombre: 'Exponente algebraico', formula: 'b^{f(x)} = c', color: 'violet', ejemplo: '2^{x+3} = 32 \\Rightarrow x = 2' },
                    { tipo: 'Tipo 4', nombre: 'Bases distintas', formula: 'b^x = d^{g(x)}', color: 'cyan', ejemplo: '2^x = 5^{x-1}' },
                    { tipo: 'Tipo 5', nombre: 'Cuadrática exponencial', formula: '(b^x)^2 + k\\cdot b^x + c = 0', color: 'fuchsia', ejemplo: '4^x - 5 \\cdot 2^x + 4 = 0' },
                    { tipo: 'Tipo 6', nombre: 'Aplicaciones', formula: 'P_0 \\cdot b^{kt} = P', color: 'amber', ejemplo: 'e^{0.05t} = 2 \\Rightarrow t \\approx 13.86' },
                  ].map(t => (
                    <div key={t.tipo} className={`bg-white dark:bg-slate-900/40 border border-${t.color}-200/40 dark:border-${t.color}-500/10 rounded-xl p-4 space-y-3 shadow-sm`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-${t.color}-500/10 text-${t.color}-600 dark:text-${t.color}-400 border border-${t.color}-500/20 font-mono`}>{t.tipo}</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.nombre}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950/40 rounded-lg p-2 flex justify-center border border-slate-200 dark:border-slate-900">
                        <MathFormula formula={t.formula} className="text-xs" />
                      </div>
                      <div className="bg-slate-100/80 dark:bg-slate-900/60 rounded-lg p-2 overflow-x-auto">
                        <MathFormula formula={t.ejemplo} className="text-[11px] text-slate-600 dark:text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Warm-ups */}
              <div className="bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    Calentamiento Rápido
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-light">Verifica tu comprensión inicial antes de ver los ejemplos.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* WU 1 */}
                  <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">EJERCICIO 1</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Resuelve por reconocimiento:</p>
                      <div className="py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-center">
                        <MathFormula formula="2^x = 64" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {[5, 6, 7].map(opt => (
                        <button key={opt} onClick={() => setQuickAnswers(p => ({ ...p, q1: opt }))}
                          className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all cursor-pointer ${
                            quickAnswers.q1 === opt
                              ? opt === 6 ? 'bg-green-500/10 border-green-500/30 text-green-700' : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                    {quickAnswers.q1 !== null && (
                      <p className={`mt-3 text-[11px] font-medium leading-relaxed ${quickAnswers.q1 === 6 ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {quickAnswers.q1 === 6 ? '✓ ¡Correcto! 2⁶ = 64, por tanto x = 6.' : '✗ Incorrecto. Revisa: 2⁵=32, 2⁶=64, 2⁷=128. El correcto es x = 6.'}
                      </p>
                    )}
                  </div>

                  {/* WU 2 */}
                  <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">EJERCICIO 2</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">¿Cuál es el primer paso para resolver?</p>
                      <div className="py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-center">
                        <MathFormula formula="5^x = 100" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      {[
                        { label: 'Aplicar log a ambos lados', correct: true },
                        { label: 'Dividir ambos lados por 5', correct: false },
                        { label: 'Elevar al cuadrado', correct: false },
                      ].map(opt => (
                        <button key={opt.label} onClick={() => setQuickAnswers(p => ({ ...p, q2: opt.label }))}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer text-left ${
                            quickAnswers.q2 === opt.label
                              ? opt.correct ? 'bg-green-500/10 border-green-500/30 text-green-700' : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {quickAnswers.q2 && (
                      <p className={`mt-3 text-[11px] font-medium leading-relaxed ${quickAnswers.q2 === 'Aplicar log a ambos lados' ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {quickAnswers.q2 === 'Aplicar log a ambos lados' ? '✓ ¡Exacto! Aplicar log baja el exponente como multiplicador.' : '✗ Incorrecto. No podemos dividir por 5 porque x está arriba. Necesitamos aplicar logaritmo.'}
                      </p>
                    )}
                  </div>

                  {/* WU 3 */}
                  <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">EJERCICIO 3</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">¿Cuál es el resultado correcto?</p>
                      <div className="py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-center">
                        <MathFormula formula="3^{2x} = 81" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      {[
                        { label: 'x = 2', correct: false },
                        { label: 'x = 2.5', correct: false },
                        { label: 'x = 4', correct: false },
                        { label: 'x = 2 (ya que 2x=4)', correct: true },
                      ].map(opt => (
                        <button key={opt.label} onClick={() => setQuickAnswers(p => ({ ...p, q3: opt.label }))}
                          className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer text-left ${
                            quickAnswers.q3 === opt.label
                              ? opt.correct ? 'bg-green-500/10 border-green-500/30 text-green-700' : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {quickAnswers.q3 && (
                      <p className={`mt-3 text-[11px] font-medium leading-relaxed ${quickAnswers.q3 === 'x = 2 (ya que 2x=4)' ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {quickAnswers.q3 === 'x = 2 (ya que 2x=4)' ? '✓ ¡Correcto! 81=3⁴, entonces 2x=4 → x=2.' : '✗ Incorrecto. 81=3⁴, así que 2x=4 → x=2. Cuidado con el coeficiente 2 en el exponente.'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── EXAMPLES TAB ── */}
          {activeTab === 'examples' && (
            <motion.div key="examples" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="space-y-10">
              <ExampleSection title="Sección A — Reconocimiento Directo (sin calculadora)" badge="Nivel: Inicial" badgeColor="green"
                description="Cuando el resultado es una potencia exacta de la base, no necesitamos logaritmos. Identificamos el exponente por inspección o reescribiendo la base."
                examples={examplesData.reconocimiento} showNota />
              <ExampleSection title="Sección B — Logaritmo como Herramienta Fundamental" badge="Nivel: Básico" badgeColor="orange"
                description="El caso más frecuente: b^x = c donde c no es potencia exacta de b. Aplicamos log a ambos lados y usamos la propiedad de la potencia."
                examples={examplesData.logaritmoBasico} showNota />
              <ExampleSection title="Sección C — Exponente con Expresión Algebraica" badge="Nivel: Intermedio" badgeColor="violet"
                description="Cuando el exponente no es simplemente x sino una expresión como x+3, 2x-1, 3x, etc. El procedimiento es el mismo pero con un paso algebraico adicional al final."
                examples={examplesData.expresionAlgebraica} showNota />
              <ExampleSection title="Sección D — Bases Diferentes en Ambos Lados" badge="Nivel: Avanzado" badgeColor="cyan"
                description="Ecuaciones tipo b^x = d^{f(x)} donde no podemos igualar bases. Aplicamos log a ambos lados y agrupamos los términos con x para despejar."
                examples={examplesData.basesDiferentes} showNota />
              <ExampleSection title="Sección E — Ecuaciones Cuadráticas Exponenciales" badge="Nivel: Desafiante" badgeColor="fuchsia"
                description="La incógnita aparece como (b^x)² y b^x. Definimos u = b^x para transformarla en una cuadrática clásica. Al obtener u, resolvemos b^x = u para cada valor."
                examples={examplesData.cuadraticasExponenciales} showNota showAlerta />
              <ExampleSection title="Sección F — Aplicaciones Reales" badge="Nivel: Contextual" badgeColor="amber"
                description="Las ecuaciones exponenciales modelan el crecimiento poblacional, el interés compuesto y la desintegración radiactiva. Aprendemos a construir y resolver el modelo."
                examples={examplesData.aplicaciones} showNota />
            </motion.div>
          )}

          {/* ── SOLVER TAB ── */}
          {activeTab === 'solver' && (
            <motion.div key="solver" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  Solver Interactivo — Ecuaciones Exponenciales
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-light leading-relaxed max-w-3xl">
                  Configura tu propia ecuación <MathFormula formula="b^x = c" /> y el solver te mostrará la solución completa paso a paso, usando el logaritmo como herramienta.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm">
                <ExponentialSolver />
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
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-display">Clase Grabada: Logaritmo para Resolver Ecuaciones Exponenciales</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Estrategia completa con ejemplos resueltos en tiempo real</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-5 gap-8 items-start">
                  <div className="md:col-span-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg">
                      <iframe
                        src="https://www.youtube.com/embed/W1jkggYaVVc"
                        title="iSebas Portal EDU - Logaritmo para Ecuaciones Exponenciales"
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 font-mono">Contenidos del Video</span>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-lg leading-snug">Ecuaciones Exponenciales con Logaritmos</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                        Aprende la estrategia completa para resolver ecuaciones donde x está en el exponente. Desde los casos básicos hasta las cuadráticas exponenciales con sustitución.
                      </p>
                    </div>
                    <div className="space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {[
                        ['Tema principal:', 'Ecuaciones exponenciales'],
                        ['Técnica clave:', 'log(bˣ) = x·log(b)'],
                        ['Requisito previo:', 'Propiedades + Funciones'],
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
                  <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-display">Prueba de Autoevaluación — Fase 4</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                      5 ejercicios que cubren: reconocimiento directo, aplicación de logaritmos, ecuaciones con exponente algebraico, cuadrática exponencial y aplicación real de interés compuesto.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/50 p-4 border border-slate-200 dark:border-slate-900 rounded-xl grid grid-cols-3 gap-6 text-xs text-slate-500 dark:text-slate-400 shadow-inner">
                    {[['Preguntas', '5 Ejercicios'], ['Temas', 'Todos los tipos'], ['Feedback', 'Paso a Paso']].map(([k, v]) => (
                      <div key={k}><span className="block text-slate-400 dark:text-slate-500 mb-1">{k}</span><span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm font-mono">{v}</span></div>
                    ))}
                  </div>
                  <button onClick={() => setQuizStarted(true)}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/20 cursor-pointer">
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
                    <p className="text-slate-500 text-sm">Tu puntaje final:</p>
                    <div className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 pt-2 font-mono">{score} / {quizQuestions.length}</div>
                    <p className="text-sm font-bold pt-1">
                      {score === 5 ? '¡Perfecto! Dominas el logaritmo como estrategia para ecuaciones exponenciales.'
                        : score >= 3 ? '¡Muy bien! Sólidas bases. Repasa los tipos que fallaste en Ejemplos Resueltos.'
                        : 'Sigue practicando. Usa el Solver Interactivo para ver los pasos y luego vuelve a intentarlo.'}
                    </p>
                  </div>
                  <button onClick={handleResetQuiz}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border text-sm font-bold transition-all cursor-pointer">
                    <RefreshCw className="w-4 h-4" /> Recomenzar
                  </button>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto space-y-6 shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-4">
                    <span className="text-xs font-mono font-bold text-slate-500">EJERCICIO {currentQuestion + 1} DE {quizQuestions.length}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-orange-500/10 text-orange-700 dark:text-orange-400 font-mono">Puntuación: {score}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full transition-all duration-300" style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }} />
                  </div>
                  <div className="space-y-4 pt-2">
                    <p className="text-slate-800 dark:text-slate-200 font-bold md:text-lg leading-relaxed">
                      {quizQuestions[currentQuestion].question.split('$').map((part, i) => (
                        i % 2 === 0 ? part : <MathFormula key={i} formula={part} className="text-orange-600 dark:text-orange-400 font-bold mx-1" />
                      ))}
                    </p>
                    <div className="py-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl flex justify-center border border-slate-200 dark:border-slate-900/60 shadow-inner">
                      <MathFormula formula={quizQuestions[currentQuestion].latex} displayMode className="text-xl font-bold" />
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
                        else style = 'border-slate-100 dark:border-slate-900/40 opacity-50';
                      } else if (isSelected) {
                        style = 'border-orange-400 bg-orange-500/5 text-orange-700 dark:text-orange-400 font-semibold shadow-inner';
                      }
                      return (
                        <button key={idx} onClick={() => handleAnswerSelection(idx)} disabled={isSubmitted}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-sm cursor-pointer ${style}`}>
                          <span className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-850 flex items-center justify-center font-mono font-bold text-xs border border-slate-200/50 dark:border-slate-800 select-none shrink-0">
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
                        <Info className="w-3.5 h-3.5 text-orange-500" /> Explicación Paso a Paso:
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                        {quizQuestions[currentQuestion].explanation.split('$').map((part, i) => (
                          i % 2 === 0 ? part : <MathFormula key={i} formula={part} className="text-orange-600 dark:text-orange-400 font-semibold mx-0.5" />
                        ))}
                      </p>
                    </motion.div>
                  )}
                  <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    {!isSubmitted ? (
                      <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${selectedAnswer !== null ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}>
                        Enviar Respuesta
                      </button>
                    ) : (
                      <button onClick={handleNextQuestion}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all shadow-md cursor-pointer">
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
            <motion.div key="resources" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  Descarga de Taller (PDF)
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl leading-relaxed font-light">
                  Descarga la guía oficial de ejercicios sobre el logaritmo como estrategia para resolver ecuaciones exponenciales. Incluye ejercicios de todos los tipos vistos, con espacio para resolución y respuestas.
                </p>
                <div className="max-w-md pt-2">
                  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded font-mono font-bold text-orange-600 dark:text-orange-400 uppercase">PDF</span>
                        <span>Fase 4: Ecuaciones Exponenciales</span>
                      </div>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-base leading-snug">Taller 4: Logaritmo para Ecuaciones Exponenciales</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                        Reconocimiento directo, aplicación de logaritmos, exponente algebraico, bases distintas, cuadráticas exponenciales y situaciones aplicadas.
                      </p>
                    </div>
                    <a
                      href="./cursos/matematica-basica/logaritmos/talleres/taller_ecuaciones_02_logaritmos.pdf"
                      download="taller_ecuaciones_02_logaritmos.pdf"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 dark:hover:bg-orange-500 border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:text-white text-slate-700 dark:text-slate-250 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer">
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
