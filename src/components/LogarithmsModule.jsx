import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MathFormula from './MathFormula';
import LogCalculator from './LogCalculator';
import { 
  BookOpen, 
  Calculator, 
  Award, 
  FileText, 
  Download, 
  Play, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Info
} from 'lucide-react';

export default function LogarithmsModule() {
  const [activeTab, setActiveTab] = useState('theory');

  // Interactive theory states
  const [theoryBase, setTheoryBase] = useState(2);
  const [theoryExponent, setTheoryExponent] = useState(3);
  const theoryResult = Math.pow(theoryBase, theoryExponent);
  const [quickAnswers, setQuickAnswers] = useState({ q1: null, q2: null, q3: null });

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Beginner-friendly foundational questions for log definition (Phase 1)
  const quizQuestions = [
    {
      question: "¿Cuál de las siguientes igualdades representa correctamente el paso de la forma logarítmica a su forma exponencial equivalente?",
      latex: "\\log_{2}(32) = 5",
      options: ["2^5 = 32", "5^2 = 32", "32^2 = 5", "2 \\cdot 5 = 32"],
      correctIndex: 0,
      explanation: "Por definición de logaritmo: $\\log_b(x) = y \\iff b^y = x$. Aquí la base es $2$, el exponente es $5$ y el resultado obtenido es $32$. Por lo tanto, la forma exponencial correcta es $2^5 = 32$."
    },
    {
      question: "Calcula mentalmente (sin calculadora) el valor exacto de la siguiente expresión logarítmica básica:",
      latex: "\\log_{3}(81)",
      options: ["3", "9", "4", "27"],
      correctIndex: 2,
      explanation: "Buscamos el exponente al que debemos elevar la base $3$ para obtener $81$ (es decir, $3^y = 81$). Si multiplicamos consecutivamente: $3 \\cdot 3 = 9$, $9 \\cdot 3 = 27$ y $27 \\cdot 3 = 81$. Al multiplicar cuatro veces el $3$ obtenemos $81$ ($3^4 = 81$). Por definición, el logaritmo es $4$."
    },
    {
      question: "Determina el valor del logaritmo cuando el argumento es una fracción (piensa en leyes de exponentes con signo negativo):",
      latex: "\\log_{5}\\left(\\frac{1}{25}\\right)",
      options: ["-2", "2", "-5", "1/5"],
      correctIndex: 0,
      explanation: "Buscamos el exponente $y$ tal que $5^y = \\frac{1}{25}$. Como $25 = 5^2$, por leyes de exponentes recíprocos sabemos que la fracción se escribe con exponente negativo: $\\frac{1}{5^2} = 5^{-2}$. Así, $5^{-2} = \\frac{1}{25}$. Por lo tanto, el logaritmo es $-2$."
    },
    {
      question: "Analiza la existencia de los siguientes logaritmos. De acuerdo con las restricciones de la base ($b > 0$, $b \\neq 1$) y el argumento ($x > 0$), ¿cuál de ellos NO está definido en los números reales?",
      latex: "\\text{Analiza la base y el argumento en cada caso}",
      options: [
        "\\log_{3}(9) \\quad \\text{(Base 3, Argumento 9)}",
        "\\log_{1}(5) \\quad \\text{(Base 1, Argumento 5)}",
        "\\log_{2}(0.5) \\quad \\text{(Base 2, Argumento 0.5)}",
        "\\log_{10}(10) \\quad \\text{(Base 10, Argumento 10)}"
      ],
      correctIndex: 1,
      explanation: "La base $b$ de un logaritmo debe cumplir obligatoriamente dos condiciones: ser mayor a cero y ser distinta de uno ($b > 0$ y $b \\neq 1$). En el segundo caso, la base es $1$. Esto no está definido porque la base $1$ elevada a cualquier exponente siempre dará como resultado $1$ (por ejemplo, $1^y = 1$), haciendo imposible obtener el argumento $5$."
    },
    {
      question: "Calcula el resultado de la siguiente suma utilizando las propiedades elementales de la base y del número 1:",
      latex: "\\log_{4}(4) + \\log_{2}(1)",
      options: ["4", "0", "1", "5"],
      correctIndex: 2,
      explanation: "Evaluamos cada logaritmo por definición: \n1) $\\log_{4}(4) = 1$ porque cualquier base elevada a la 1 da la misma base ($4^1 = 4$). \n2) $\\log_{2}(1) = 0$ porque cualquier base válida elevada a la 0 es igual a 1 ($2^0 = 1$). \nAl sumar ambos resultados obtenemos: $1 + 0 = 1$."
    }
  ];

  const handleAnswerSelection = (index) => {
    if (isSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);
    if (selectedAnswer === quizQuestions[currentQuestion].correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen theme-transition">
      {/* Module Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-mono text-sm font-bold">
          <span>Matemática Básica</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>Fase 1: Definición de Logaritmo</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 font-display">
          Introducción a los Logaritmos
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Comienza tu aprendizaje entendiendo qué es un logaritmo, la relación con las potencias, las reglas de la base y el argumento, y practica con explicaciones sencillas.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto pb-px custom-scrollbar theme-transition">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'theory'
              ? 'border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-500/5'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Concepto y Definición
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'videos'
              ? 'border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-500/5'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30'
          }`}
        >
          <Play className="w-4 h-4" />
          Clase en Video
        </button>
        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'exercises'
              ? 'border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-500/5'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30'
          }`}
        >
          <Award className="w-4 h-4" />
          Ejercicios de Práctica
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'calculator'
              ? 'border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-500/5'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Calculadora de Pasos
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'resources'
              ? 'border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-500/5'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30'
          }`}
        >
          <FileText className="w-4 h-4" />
          Taller PDF
        </button>
      </div>

      {/* Tab Contents */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Definition Section */}
              <div className="grid md:grid-cols-2 gap-8 items-stretch">
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm dark:shadow-none">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-500" />
                      Definición de Logaritmo
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                      El logaritmo es la operación matemática inversa a la exponenciación. Calcular un logaritmo consiste en encontrar el exponente <MathFormula formula="y" /> al que debemos elevar una base <MathFormula formula="b" /> para obtener un número <MathFormula formula="x" />.
                    </p>
                    
                    <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-900 flex justify-center shadow-inner my-2">
                      <MathFormula formula="\log_{b}(x) = y \iff b^y = x" displayMode={true} className="text-xl font-bold" />
                    </div>

                    <div className="space-y-3 pt-2">
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Partes del Logaritmo:</p>
                      
                      {/* Base row */}
                      <div className="flex gap-3 items-center p-3 bg-violet-500/5 border border-violet-200/40 dark:border-violet-500/10 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-violet-600 text-white font-bold flex items-center justify-center font-mono">b</div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">La Base (b)</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-light">El número que se eleva. Siempre debe ser mayor que cero y diferente de uno (<MathFormula formula="b > 0" /> y <MathFormula formula="b \neq 1" />).</p>
                        </div>
                      </div>

                      {/* Argument row */}
                      <div className="flex gap-3 items-center p-3 bg-cyan-500/5 border border-cyan-200/40 dark:border-cyan-500/10 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white font-bold flex items-center justify-center font-mono">x</div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">El Argumento (x)</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-light">El resultado de la potencia. Siempre debe ser un número positivo y mayor que cero (<MathFormula formula="x > 0" />).</p>
                        </div>
                      </div>

                      {/* Logarithm row */}
                      <div className="flex gap-3 items-center p-3 bg-fuchsia-500/5 border border-fuchsia-200/40 dark:border-fuchsia-500/10 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-fuchsia-600 text-white font-bold flex items-center justify-center font-mono">y</div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">El Logaritmo (y)</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-light">El exponente al que se eleva la base para obtener el argumento.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Visualizer */}
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-none flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Visualizador de Definición</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                      Mueve los deslizadores para cambiar la base y el exponente entero. Observa cómo cambia el argumento y cómo se traduce la equivalencia exponencial y logarítmica.
                    </p>

                    <div className="space-y-4 pt-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                          <span>Base (b):</span>
                          <span className="font-mono text-violet-600 dark:text-violet-400 font-extrabold">{theoryBase}</span>
                        </div>
                        <input
                          type="range"
                          min="2"
                          max="10"
                          step="1"
                          value={theoryBase}
                          onChange={(e) => setTheoryBase(parseInt(e.target.value))}
                          className="w-full accent-violet-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                          <span>Exponente (y):</span>
                          <span className="font-mono text-cyan-600 dark:text-cyan-400 font-extrabold">{theoryExponent}</span>
                        </div>
                        <input
                          type="range"
                          min="-2"
                          max="6"
                          step="1"
                          value={theoryExponent}
                          onChange={(e) => setTheoryExponent(parseInt(e.target.value))}
                          className="w-full accent-cyan-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-slate-50 dark:bg-slate-950/60 p-4 border border-slate-200 dark:border-slate-900 rounded-xl text-center shadow-inner">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1">Forma Exponencial</span>
                      <MathFormula formula={`${theoryBase}^{${theoryExponent}} = ${theoryResult % 1 === 0 ? theoryResult : theoryResult.toFixed(4)}`} displayMode={true} />
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950/60 p-4 border border-slate-200 dark:border-slate-900 rounded-xl text-center shadow-inner">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1">Forma Logarítmica</span>
                      <MathFormula formula={`\\log_{${theoryBase}}(${theoryResult % 1 === 0 ? theoryResult : theoryResult.toFixed(4)}) = ${theoryExponent}`} displayMode={true} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resolved Examples Grid */}
              <div className="space-y-6">
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-500" />
                    Ejemplos de Cálculo y Conversión
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl font-light mt-1">
                    Revisa estos ejemplos clasificados para entender cómo aplicar la definición en diferentes niveles.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Category 1: Básicos */}
                  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-sm">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider rounded bg-violet-500/10 text-violet-700 dark:text-violet-400 uppercase font-mono">
                      Ejemplos Básicos
                    </span>
                    <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800/60">
                      <div className="pt-1">
                        <MathFormula formula="\log_{2}(8) = 3" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Porque la base <MathFormula formula="2" /> elevada al exponente <MathFormula formula="3" /> da como resultado el argumento <MathFormula formula="8" /> (<MathFormula formula="2^3 = 8" />).
                        </p>
                      </div>
                      <div className="pt-3">
                        <MathFormula formula="\log_{3}(9) = 2" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Porque la base <MathFormula formula="3" /> multiplicada por sí misma <MathFormula formula="2" /> veces da el argumento <MathFormula formula="9" /> (<MathFormula formula="3^2 = 9" />).
                        </p>
                      </div>
                      <div className="pt-3">
                        <MathFormula formula="\log_{10}(1000) = 3" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Porque elevar la base <MathFormula formula="10" /> al cubo nos da exactamente <MathFormula formula="1000" /> (<MathFormula formula="10^3 = 1000" />).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category 2: Exponentes Negativos */}
                  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-sm">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 uppercase font-mono">
                      Argumentos Fraccionarios
                    </span>
                    <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800/60">
                      <div className="pt-1">
                        <MathFormula formula="\log_{2}\left(\frac{1}{2}\right) = -1" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Porque por leyes de potencias con signo negativo: <MathFormula formula="2^{-1} = \frac{1}{2^1} = \frac{1}{2}" />.
                        </p>
                      </div>
                      <div className="pt-3">
                        <MathFormula formula="\log_{5}\left(\frac{1}{25}\right) = -2" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Como el argumento es una fracción y <MathFormula formula="25 = 5^2" />, el exponente es negativo: <MathFormula formula="5^{-2} = \frac{1}{5^2} = \frac{1}{25}" />.
                        </p>
                      </div>
                      <div className="pt-3">
                        <MathFormula formula="\log_{3}\left(\frac{1}{27}\right) = -3" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Porque la base <MathFormula formula="3" /> elevada a la <MathFormula formula="-3" /> equivale al recíproco de <MathFormula formula="3^3" /> (<MathFormula formula="3^{-3} = \frac{1}{27}" />).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category 3: Casos Especiales */}
                  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-sm">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider rounded bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400 uppercase font-mono">
                      Casos Especiales
                    </span>
                    <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800/60">
                      <div className="pt-1">
                        <MathFormula formula="\log_{8}(1) = 0" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Cualquier base válida elevada al exponente <MathFormula formula="0" /> es igual a <MathFormula formula="1" /> (<MathFormula formula="8^0 = 1" />).
                        </p>
                      </div>
                      <div className="pt-3">
                        <MathFormula formula="\log_{6}(6) = 1" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Cualquier número elevado al exponente <MathFormula formula="1" /> da como resultado la misma base (<MathFormula formula="6^1 = 6" />).
                        </p>
                      </div>
                      <div className="pt-3">
                        <MathFormula formula="\log_{10}(0.1) = -1" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Porque <MathFormula formula="0.1" /> se escribe como la fracción <MathFormula formula="\frac{1}{10}" />, lo cual equivale a <MathFormula formula="10^{-1}" />.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Practice Exercises */}
              <div className="bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-500" />
                    Ejercicios de Calentamiento Rápido
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-light">
                    Ponte a prueba respondiendo estas 3 preguntas directas para comprobar si dominas la definición antes de hacer el cuestionario formal.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-2">
                  {/* Question 1 */}
                  <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">EJERCICIO 1</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        ¿Cuál es el valor exacto del logaritmo?
                      </p>
                      <div className="py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-center">
                        <MathFormula formula="\log_{2}(64)" className="text-base font-bold" />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {[32, 6, 8].map((option) => (
                        <button
                          key={option}
                          onClick={() => setQuickAnswers(prev => ({ ...prev, q1: option }))}
                          className={`flex-grow py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            quickAnswers.q1 === option
                              ? option === 6
                                ? 'bg-green-500/10 border-green-500/30 text-green-600'
                                : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {quickAnswers.q1 !== null && (
                      <div className="mt-3 text-[11px] leading-relaxed">
                        {quickAnswers.q1 === 6 ? (
                          <p className="text-green-600 dark:text-green-400 font-medium">
                            <span className="font-extrabold">✓ ¡Correcto!</span> Elevamos la base <MathFormula formula="2" /> al exponente <MathFormula formula="6" /> para dar <MathFormula formula="64" /> (<MathFormula formula="2^6 = 64" />).
                          </p>
                        ) : (
                          <p className="text-rose-600 dark:text-rose-400 font-medium">
                            <span className="font-extrabold">✗ Incorrecto.</span> Recuerda buscar un exponente, no dividir ni tomar raíces. Intenta de nuevo.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Question 2 */}
                  <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">EJERCICIO 2</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Calcula usando exponentes negativos:
                      </p>
                      <div className="py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-center">
                        <MathFormula formula="\log_{4}\left(\frac{1}{4}\right)" className="text-base font-bold" />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {[-1, 1, 0].map((option) => (
                        <button
                          key={option}
                          onClick={() => setQuickAnswers(prev => ({ ...prev, q2: option }))}
                          className={`flex-grow py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            quickAnswers.q2 === option
                              ? option === -1
                                ? 'bg-green-500/10 border-green-500/30 text-green-600'
                                : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {quickAnswers.q2 !== null && (
                      <div className="mt-3 text-[11px] leading-relaxed">
                        {quickAnswers.q2 === -1 ? (
                          <p className="text-green-600 dark:text-green-400 font-medium">
                            <span className="font-extrabold">✓ ¡Correcto!</span> Elevamos la base al exponente negativo para dar el recíproco: <MathFormula formula="4^{-1} = \frac{1}{4}" />.
                          </p>
                        ) : (
                          <p className="text-rose-600 dark:text-rose-400 font-medium">
                            <span className="font-extrabold">✗ Incorrecto.</span> Recuerda que las fracciones indican exponentes negativos. Prueba de nuevo.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Question 3 */}
                  <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">EJERCICIO 3</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        ¿Cómo se escribe en forma exponencial?
                      </p>
                      <div className="py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-center">
                        <MathFormula formula="\log_{5}(x) = 2" className="text-base font-bold" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      {['5^2 = x', '2^5 = x', 'x^2 = 5'].map((option) => (
                        <button
                          key={option}
                          onClick={() => setQuickAnswers(prev => ({ ...prev, q3: option }))}
                          className={`w-full py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            quickAnswers.q3 === option
                              ? option === '5^2 = x'
                                ? 'bg-green-500/10 border-green-500/30 text-green-600'
                                : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <MathFormula formula={option} />
                        </button>
                      ))}
                    </div>
                    {quickAnswers.q3 !== null && (
                      <div className="mt-3 text-[11px] leading-relaxed">
                        {quickAnswers.q3 === '5^2 = x' ? (
                          <p className="text-green-600 dark:text-green-400 font-medium">
                            <span className="font-extrabold">✓ ¡Correcto!</span> La base es <MathFormula formula="5" />, el logaritmo (exponente) es <MathFormula formula="2" />, dando el argumento <MathFormula formula="x" />.
                          </p>
                        ) : (
                          <p className="text-rose-600 dark:text-rose-400 font-medium">
                            <span className="font-extrabold">✗ Incorrecto.</span> Recuerda: <MathFormula formula="\log_b(x) = y \iff b^y = x" />. Intenta de nuevo.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'videos' && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-500/10 text-red-500 dark:text-red-400 rounded-xl">
                    <Play className="w-6 h-6 fill-red-500/20 dark:fill-red-400/20" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Clase Grabada: Definición y Generalidades</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Aprende con explicaciones claras sobre la base y el argumento</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-5 gap-8 items-start">
                  {/* YouTube Embed Player */}
                  <div className="md:col-span-3 space-y-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-250 dark:border-slate-800 shadow-lg">
                      <iframe
                        src="https://www.youtube.com/embed/PBbqvd_QB3M"
                        title="PortalEdu - Definición de Logaritmo"
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* Video details metadata */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 font-mono">Contenidos del Video</span>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-lg leading-snug">Introducción al Concepto de Logaritmo</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                        En esta clase interactiva aprenderás de forma cercana cómo surgen los logaritmos, su equivalencia con las ecuaciones exponenciales y las restricciones obligatorias para la base y el argumento.
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <div className="flex justify-between">
                        <span>Tema principal:</span>
                        <span className="text-slate-700 dark:text-slate-300 font-mono">Definición y Exponentes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Requisito previo:</span>
                        <span className="text-slate-700 dark:text-slate-300 font-mono">Potenciación Básica</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ejercicios clave:</span>
                        <span className="text-slate-700 dark:text-slate-300 font-mono">Cálculo mental directo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'exercises' && (
            <motion.div
              key="exercises"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {!quizStarted ? (
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 max-w-2xl mx-auto text-center space-y-6 shadow-sm dark:shadow-none">
                  <div className="w-16 h-16 bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-display">Prueba de Autoevaluación - Fase 1</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                      Resuelve este cuestionario diseñado especialmente para estudiantes que inician con el tema. Evalúa tu comprensión de la definición, el paso de potencias a logaritmos y el cálculo mental básico sin calculadora.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/50 p-4 border border-slate-200 dark:border-slate-900 rounded-xl inline-grid grid-cols-3 gap-6 text-xs text-slate-500 dark:text-slate-400 w-full shadow-inner">
                    <div>
                      <span className="block text-slate-400 dark:text-slate-500 mb-1">Preguntas</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm font-mono">5 Ejercicios</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 dark:text-slate-500 mb-1">Cálculo</span>
                      <span className="font-extrabold text-violet-600 dark:text-violet-400 text-sm font-mono">Sin calculadora</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 dark:text-slate-500 mb-1">Retroalimentación</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm font-mono">Paso a Paso</span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => setQuizStarted(true)}
                      className="px-6 py-3 bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-600/15"
                    >
                      Iniciar Ejercicios
                    </button>
                  </div>
                </div>
              ) : quizFinished ? (
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 max-w-2xl mx-auto text-center space-y-6 shadow-sm dark:shadow-none">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto border ${
                    score >= 4 
                      ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400' 
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                  }`}>
                    <Award className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-display">¡Ejercicios Completados!</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Tu puntaje final es:
                    </p>
                    <div className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 pt-2 font-mono">
                      {score} / {quizQuestions.length}
                    </div>
                    <p className="text-sm font-bold pt-1">
                      {score === 5 
                        ? '¡Excelente trabajo! Comprendes perfectamente la base del logaritmo.'
                        : score >= 3 
                        ? '¡Muy bien! Has captado la relación fundamental con las potencias.'
                        : 'Sigue practicando, repasa el visualizador interactivo y vuelve a intentarlo.'}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={handleResetQuiz}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition-all text-sm font-bold"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Recomenzar Cuestionario
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto space-y-6 shadow-sm dark:shadow-none">
                  {/* Progress Header */}
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-4">
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">EJERCICIO {currentQuestion + 1} DE {quizQuestions.length}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-violet-500/10 text-violet-700 dark:text-violet-400 font-mono">Puntuación: {score}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-violet-600 dark:bg-violet-500 h-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question and Formula */}
                  <div className="space-y-4 pt-2">
                    <p className="text-slate-800 dark:text-slate-200 font-bold md:text-lg leading-relaxed">
                      {quizQuestions[currentQuestion].question.split('$').map((part, i) => (
                        i % 2 === 0 ? part : <MathFormula key={i} formula={part} className="text-violet-600 dark:text-violet-400 font-bold mx-1" />
                      ))}
                    </p>
                    <div className="py-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl flex justify-center border border-slate-200 dark:border-slate-900 shadow-inner">
                      <MathFormula formula={quizQuestions[currentQuestion].latex} displayMode={true} className="text-lg font-bold" />
                    </div>
                  </div>

                  {/* Options Stacked Vertically */}
                  <div className="flex flex-col gap-3">
                    {quizQuestions[currentQuestion].options.map((option, idx) => {
                      let btnClass = "flex items-center justify-between p-4 rounded-xl border font-bold text-sm transition-all text-left w-full ";
                      
                      if (isSubmitted) {
                        if (idx === quizQuestions[currentQuestion].correctIndex) {
                          btnClass += "bg-green-500/10 border-green-500/40 text-green-600 dark:text-green-400";
                        } else if (idx === selectedAnswer) {
                          btnClass += "bg-rose-500/10 border-rose-500/40 text-rose-600 dark:text-rose-400";
                        } else {
                          btnClass += "bg-slate-50 dark:bg-slate-950/20 border-slate-100 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 cursor-not-allowed";
                        }
                      } else {
                        if (idx === selectedAnswer) {
                          btnClass += "bg-violet-50 dark:bg-violet-950/30 border-violet-600 dark:border-violet-500 text-violet-700 dark:text-violet-300";
                        } else {
                          btnClass += "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-slate-100/50 dark:hover:bg-slate-900/10";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isSubmitted}
                          onClick={() => handleAnswerSelection(idx)}
                          className={btnClass}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-slate-400 dark:text-slate-500 text-xs font-bold">{String.fromCharCode(65 + idx)})</span>
                            <MathFormula formula={option} />
                          </div>
                          {isSubmitted && idx === quizQuestions[currentQuestion].correctIndex && (
                            <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400 shrink-0" />
                          )}
                          {isSubmitted && idx === selectedAnswer && idx !== quizQuestions[currentQuestion].correctIndex && (
                            <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {isSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 shadow-inner"
                    >
                      <span className="text-xs uppercase tracking-wider text-violet-600 dark:text-violet-400 font-extrabold flex items-center gap-1.5">
                        <Info className="w-4 h-4" />
                        Explicación Pedagógica
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-light">
                        {quizQuestions[currentQuestion].explanation.split('$').map((part, i) => (
                          i % 2 === 0 ? part : <MathFormula key={i} formula={part} className="text-violet-600 dark:text-violet-300 font-bold mx-1" />
                        ))}
                      </p>
                    </motion.div>
                  )}

                  {/* Next/Submit Button */}
                  <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    {!isSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          selectedAnswer === null 
                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                            : 'bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 text-white shadow-lg shadow-violet-600/15'
                        }`}
                      >
                        Enviar Respuesta
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 text-white rounded-xl shadow-lg shadow-violet-600/15 text-sm font-bold transition-all"
                      >
                        {currentQuestion + 1 === quizQuestions.length ? 'Finalizar Cuestionario' : 'Siguiente Ejercicio'}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <LogCalculator />
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 animate-fade-in"
            >
              {/* PDF Workshops */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-500" />
                  Descarga de Taller (PDF)
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">
                  Descarga la guía de ejercicios oficial de la fase de definición de logaritmos para practicar la conversión exponencial y cálculos a mano.
                </p>

                <div className="max-w-md pt-2">
                  {/* Workshop Card */}
                  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm dark:shadow-none">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono font-bold text-violet-600 dark:text-violet-400 uppercase">PDF</span>
                        <span>Fase 1: Introducción</span>
                      </div>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-base leading-snug">Taller 1: Definición y Paso a Exponencial</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                        Ejercicios clave para calcular logaritmos básicos sin calculadora y escribir las representaciones correspondientes en potencias.
                      </p>
                    </div>
                    <a 
                      href="./cursos/matematica-basica/logaritmos/talleres/taller_definicion_logaritmos.pdf" 
                      download="taller_definicion_logaritmos.pdf"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-250 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
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
