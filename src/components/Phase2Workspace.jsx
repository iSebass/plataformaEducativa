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
  Layers,
  Sparkles
} from 'lucide-react';

export default function Phase2Workspace({ onBack }) {
  const [activeTab, setActiveTab] = useState('theory');

  // Properties explorer state
  const [selectedProp, setSelectedProp] = useState('product');
  const [expBase, setExpBase] = useState(2);
  const [expM, setExpM] = useState(4);
  const [expN, setExpN] = useState(8);
  const [expK, setExpK] = useState(3);
  const [expA, setExpA] = useState(16);

  // Helper to format values for KaTeX output
  const formatLog = (val, base) => {
    const rawVal = Math.log(val) / Math.log(base);
    if (Math.abs(rawVal - Math.round(rawVal)) < 1e-9) {
      return Math.round(rawVal).toString();
    }
    return rawVal.toFixed(4);
  };

  // Helper to show steps for each property
  const getExplorerLaTeX = () => {
    if (selectedProp === 'product') {
      const prodVal = expM * expN;
      const leftLog = formatLog(prodVal, expBase);
      const logM = formatLog(expM, expBase);
      const logN = formatLog(expN, expBase);
      
      const isExactM = Math.abs(parseFloat(logM) - Math.round(parseFloat(logM))) < 1e-9;
      const isExactN = Math.abs(parseFloat(logN) - Math.round(parseFloat(logN))) < 1e-9;
      const isExactTot = Math.abs(parseFloat(leftLog) - Math.round(parseFloat(leftLog))) < 1e-9;
      
      const approxChar = (isExactM && isExactN && isExactTot) ? '=' : '\\approx';
      
      return {
        formula: `\\log_{b}(M \\cdot N) = \\log_{b}(M) + \\log_{b}(N)`,
        step1: `\\log_{${expBase}}(${expM} \\cdot ${expN}) = \\log_{${expBase}}(${prodVal}) ${approxChar} ${leftLog}`,
        step2: `\\log_{${expBase}}(${expM}) + \\log_{${expBase}}(${expN}) ${approxChar} ${logM} + ${logN} = ${leftLog}`,
        desc: `Al multiplicar los argumentos $M = ${expM}$ y $N = ${expN}$ obtenemos $${prodVal}$. Sumar los logaritmos individuales da exactamente el mismo resultado.`
      };
    } else if (selectedProp === 'quotient') {
      const quotVal = (expM / expN).toFixed(4);
      const leftLog = formatLog(expM / expN, expBase);
      const logM = formatLog(expM, expBase);
      const logN = formatLog(expN, expBase);
      
      const isExactM = Math.abs(parseFloat(logM) - Math.round(parseFloat(logM))) < 1e-9;
      const isExactN = Math.abs(parseFloat(logN) - Math.round(parseFloat(logN))) < 1e-9;
      const isExactTot = Math.abs(parseFloat(leftLog) - Math.round(parseFloat(leftLog))) < 1e-9;
      
      const approxChar = (isExactM && isExactN && isExactTot) ? '=' : '\\approx';

      return {
        formula: `\\log_{b}\\left(\\frac{M}{N}\\right) = \\log_{b}(M) - \\log_{b}(N)`,
        step1: `\\log_{${expBase}}\\left(\\frac{${expM}}{${expN}}\\right) = \\log_{${expBase}}(${parseFloat(quotVal)}) ${approxChar} ${leftLog}`,
        step2: `\\log_{${expBase}}(${expM}) - \\log_{${expBase}}(${expN}) ${approxChar} ${logM} - ${logN} = ${leftLog}`,
        desc: `Al dividir los argumentos $M = ${expM}$ entre $N = ${expN}$ obtenemos $${parseFloat(quotVal)}$. Restar los logaritmos individuales produce el mismo resultado decimal.`
      };
    } else if (selectedProp === 'power') {
      const powVal = Math.pow(expM, expK);
      const leftLog = formatLog(powVal, expBase);
      const logM = formatLog(expM, expBase);
      const rightVal = (expK * parseFloat(logM)).toFixed(4);
      
      const isExactM = Math.abs(parseFloat(logM) - Math.round(parseFloat(logM))) < 1e-9;
      const isExactTot = Math.abs(parseFloat(leftLog) - Math.round(parseFloat(leftLog))) < 1e-9;
      
      const approxChar = (isExactM && isExactTot) ? '=' : '\\approx';

      return {
        formula: `\\log_{b}(M^k) = k \\cdot \\log_{b}(M)`,
        step1: `\\log_{${expBase}}(${expM}^{${expK}}) = \\log_{${expBase}}(${powVal % 1 === 0 ? powVal : powVal.toFixed(2)}) ${approxChar} ${leftLog}`,
        step2: `${expK} \\cdot \\log_{${expBase}}(${expM}) ${approxChar} ${expK} \\cdot ${logM} = ${parseFloat(rightVal)}`,
        desc: `El exponente $k = ${expK}$ pasa a multiplicar al logaritmo de la base del argumento $M = ${expM}$. Elevar el argumento da el mismo resultado que multiplicar el exponente.`
      };
    } else {
      // Cambio de base
      const logA = formatLog(expA, expBase);
      const stdLogA = Math.log10(expA).toFixed(4);
      const stdLogB = Math.log10(expBase).toFixed(4);
      const quotVal = (parseFloat(stdLogA) / parseFloat(stdLogB)).toFixed(4);

      return {
        formula: `\\log_{b}(a) = \\frac{\\log_{c}(a)}{\\log_{c}(b)}`,
        step1: `\\log_{${expBase}}(${expA}) = ${logA}`,
        step2: `\\frac{\\log_{10}(${expA})}{\\log_{10}(${expBase})} = \\frac{${stdLogA}}{${stdLogB}} \\approx ${quotVal}`,
        desc: `Calculamos el logaritmo de $${expA}$ en base $${expBase}$ cambiando a base $10$. Dividir el logaritmo del argumento entre el de la base original da el valor exacto del logaritmo.`
      };
    }
  };

  const expLaTeX = getExplorerLaTeX();

  // Quick practice warm-ups
  const [quickAnswers, setQuickAnswers] = useState({ q1: null, q2: null, q3: null });

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // 5 properties questions for Phase 2 Quiz
  const quizQuestions = [
    {
      question: "Simplifica la expresión expandiendo completamente el siguiente logaritmo utilizando las propiedades correspondientes:",
      latex: "\\log_{b}\\left(\\frac{x^3 y}{z^2}\\right)",
      options: [
        "3\\log_{b}(x) + \\log_{b}(y) - 2\\log_{b}(z)",
        "3\\log_{b}(x) \\cdot \\log_{b}(y) - 2\\log_{b}(z)",
        "\\frac{3\\log_{b}(x) + \\log_{b}(y)}{2\\log_{b}(z)}",
        "3\\log_{b}(x) - \\log_{b}(y) - 2\\log_{b}(z)"
      ],
      correctIndex: 0,
      explanation: "Primero aplicamos la propiedad del cociente para separar el numerador y el denominador como una resta: $\\log_b(x^3 y) - \\log_b(z^2)$. Luego, separamos el producto del numerador mediante una suma: $\\log_b(x^3) + \\log_b(y) - \\log_b(z^2)$. Finalmente, aplicamos la propiedad de la potencia bajando los exponentes a multiplicar: $3\\log_b(x) + \\log_b(y) - 2\\log_b(z)$."
    },
    {
      question: "Condensa la siguiente expresión algebraica en un único término logarítmico con coeficiente principal 1:",
      latex: "2\\log_{5}(x) - \\frac{1}{2}\\log_{5}(y) + 3\\log_{5}(z)",
      options: [
        "\\log_{5}\\left(\\frac{x^2 z^3}{\\sqrt{y}}\\right)",
        "\\log_{5}\\left(\\frac{x^2 \\sqrt{y}}{z^3}\\right)",
        "\\log_{5}\\left(\\frac{2x z^3}{\\frac{1}{2}y}\\right)",
        "\\log_{5}\\left(x^2 - \\sqrt{y} + z^3\right)"
      ],
      correctIndex: 0,
      explanation: "Subimos los coeficientes como exponentes por la propiedad de la potencia: $\\log_5(x^2)$, $\\log_5(y^{1/2}) = \\log_5(\\sqrt{y})$, y $\\log_5(z^3)$. \nLos logaritmos que se suman multiplican sus argumentos, y los que se restan pasan a dividir: $\\log_5(x^2 \\cdot z^3) - \\log_5(\\sqrt{y}) = \\log_5\\left(\\frac{x^2 z^3}{\\sqrt{y}}\\right)$."
    },
    {
      question: "Calcula el valor numérico exacto de la siguiente suma utilizando propiedades de simplificación (sin calculadora):",
      latex: "\\log_{6}(4) + \\log_{6}(9)",
      options: ["13", "2", "36", "6"],
      correctIndex: 1,
      explanation: "Por la propiedad del producto, una suma de logaritmos con la misma base se condensa multiplicando los argumentos: $\\log_6(4) + \\log_6(9) = \\log_6(4 \\cdot 9) = \\log_6(36)$. \nBuscamos ahora un exponente $y$ tal que $6^y = 36$. Dado que $6^2 = 36$, el valor del logaritmo es $2$."
    },
    {
      question: "Encuentra el valor exacto de la expresión aplicando cambio de base conveniente y definición de exponentes enteros:",
      latex: "\\log_{8}(32)",
      options: ["5/3", "3/5", "4", "2"],
      correctIndex: 0,
      explanation: "Aplicamos la propiedad de cambio de base a una base común conveniente para ambos números. Tanto $8$ como $32$ son potencias de $2$. Así: $\\log_8(32) = \\frac{\\log_2(32)}{\\log_2(8)}$. \nEvaluamos individualmente: $\\log_2(32) = 5$ (ya que $2^5 = 32$) y $\\log_2(8) = 3$ (ya que $2^3 = 8$). \nReemplazando obtenemos: $\\frac{5}{3}$."
    },
    {
      question: "Si sabemos que de forma aproximada se cumple que $\\log_{b}(2) \\approx 0.301$ y $\\log_{b}(3) \\approx 0.477$, calcula el valor numérico de:",
      latex: "\\log_{b}(18)",
      options: ["0.778", "0.954", "1.255", "1.431"],
      correctIndex: 2,
      explanation: "Descomponemos el argumento $18$ en factores primos: $18 = 2 \\cdot 9 = 2 \\cdot 3^2$. \nAplicamos la propiedad del producto y de la potencia para expandir la expresión: \n$\\log_b(18) = \\log_b(2 \\cdot 3^2) = \\log_b(2) + \\log_b(3^2) = \\log_b(2) + 2\\log_b(3)$. \nReemplazamos con los valores aproximados: $0.301 + 2(0.477) = 0.301 + 0.954 = 1.255$."
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
    <div className="space-y-6">
      {/* Back to Dashboard and Title Area */}
      <div className="flex flex-col gap-4">
        <div>
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al Temario
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-mono text-xs md:text-sm font-bold">
            <span>Matemática Básica</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Fase 2: Propiedades de los Logaritmos</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 font-display">
            Fase 2: Propiedades de los Logaritmos
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Domina las reglas algebraicas del producto, cociente, potencia y cambio de base. Aprende a expandir y condensar términos complejos con herramientas didácticas.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto pb-px custom-scrollbar theme-transition">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'theory'
              ? 'border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-500/5'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Propiedades e Interacción
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
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
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'exercises'
              ? 'border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-500/5'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30'
          }`}
        >
          <Award className="w-4 h-4" />
          Ejercicios de Práctica
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
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
              {/* Properties explanations & Interactive visualizer */}
              <div className="grid md:grid-cols-12 gap-8 items-stretch">
                {/* Visualizer card */}
                <div className="md:col-span-6 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm dark:shadow-none">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-500" />
                      Explorador de Propiedades
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                      Elige una propiedad matemática abajo, ajusta las variables con los controles y observa la equivalencia expandida, condensada y resuelta paso a paso en KaTeX.
                    </p>

                    {/* Selector bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      {[
                        { id: 'product', label: 'Producto' },
                        { id: 'quotient', label: 'Cociente' },
                        { id: 'power', label: 'Potencia' },
                        { id: 'base_change', label: 'Cambio Base' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedProp(item.id)}
                          className={`py-2 px-3 text-xs font-bold border rounded-xl transition-all cursor-pointer ${
                            selectedProp === item.id
                              ? 'bg-violet-600 border-violet-600 text-white shadow-sm'
                              : 'bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-850'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Math representation card */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-900 space-y-2 shadow-inner">
                      <div className="flex justify-center border-b border-slate-200 dark:border-slate-850 pb-2">
                        <MathFormula formula={expLaTeX.formula} className="text-base font-bold text-violet-600 dark:text-violet-400" />
                      </div>
                      <div className="space-y-1.5 pt-2 text-center">
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Lado Izquierdo</div>
                        <MathFormula formula={expLaTeX.step1} className="text-sm font-semibold block" />
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-medium pt-1">Lado Derecho (Propiedad)</div>
                        <MathFormula formula={expLaTeX.step2} className="text-sm font-semibold block" />
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-450 italic font-light pt-1">
                      {expLaTeX.desc.split('$').map((part, i) => (
                        i % 2 === 0 ? part : <code key={i} className="text-violet-600 dark:text-violet-400 font-semibold px-0.5">{part}</code>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Variable inputs controller */}
                <div className="md:col-span-6 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-5 shadow-sm dark:shadow-none flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Controles de Variables</h3>
                  
                  {/* Slider Base */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Base de los logaritmos (b):</span>
                      <span className="font-mono text-violet-600 dark:text-violet-400 font-extrabold">{expBase}</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      step="1"
                      value={expBase}
                      onChange={(e) => setExpBase(parseInt(e.target.value))}
                      className="w-full accent-violet-500 h-1 bg-slate-250 dark:bg-slate-850 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Sliders dynamically changing per property */}
                  {selectedProp === 'product' && (
                    <>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>Argumento Multiplicando M:</span>
                          <span className="font-mono text-cyan-600 dark:text-cyan-400 font-extrabold">{expM}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="16"
                          step="1"
                          value={expM}
                          onChange={(e) => setExpM(parseInt(e.target.value))}
                          className="w-full accent-cyan-550 h-1 bg-slate-250 dark:bg-slate-855 rounded-lg cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>Argumento Multiplicando N:</span>
                          <span className="font-mono text-fuchsia-600 dark:text-fuchsia-400 font-extrabold">{expN}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="16"
                          step="1"
                          value={expN}
                          onChange={(e) => setExpN(parseInt(e.target.value))}
                          className="w-full accent-fuchsia-500 h-1 bg-slate-250 dark:bg-slate-855 rounded-lg cursor-pointer"
                        />
                      </div>
                    </>
                  )}

                  {selectedProp === 'quotient' && (
                    <>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>Argumento Dividendo M:</span>
                          <span className="font-mono text-cyan-600 dark:text-cyan-400 font-extrabold">{expM}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="32"
                          step="1"
                          value={expM}
                          onChange={(e) => setExpM(parseInt(e.target.value))}
                          className="w-full accent-cyan-550 h-1 bg-slate-250 dark:bg-slate-855 rounded-lg cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>Argumento Divisor N:</span>
                          <span className="font-mono text-fuchsia-600 dark:text-fuchsia-400 font-extrabold">{expN}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="16"
                          step="1"
                          value={expN}
                          onChange={(e) => setExpN(parseInt(e.target.value))}
                          className="w-full accent-fuchsia-500 h-1 bg-slate-250 dark:bg-slate-855 rounded-lg cursor-pointer"
                        />
                      </div>
                    </>
                  )}

                  {selectedProp === 'power' && (
                    <>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>Base del argumento M:</span>
                          <span className="font-mono text-cyan-600 dark:text-cyan-400 font-extrabold">{expM}</span>
                        </div>
                        <input
                          type="range"
                          min="2"
                          max="10"
                          step="1"
                          value={expM}
                          onChange={(e) => setExpM(parseInt(e.target.value))}
                          className="w-full accent-cyan-550 h-1 bg-slate-250 dark:bg-slate-855 rounded-lg cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>Exponente k:</span>
                          <span className="font-mono text-fuchsia-600 dark:text-fuchsia-400 font-extrabold">{expK}</span>
                        </div>
                        <input
                          type="range"
                          min="-3"
                          max="5"
                          step="1"
                          value={expK}
                          onChange={(e) => setExpK(parseInt(e.target.value))}
                          className="w-full accent-fuchsia-500 h-1 bg-slate-250 dark:bg-slate-855 rounded-lg cursor-pointer"
                        />
                      </div>
                    </>
                  )}

                  {selectedProp === 'base_change' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>Argumento (a):</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400 font-extrabold">{expA}</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="32"
                        step="1"
                        value={expA}
                        onChange={(e) => setExpA(parseInt(e.target.value))}
                        className="w-full accent-cyan-550 h-1 bg-slate-250 dark:bg-slate-855 rounded-lg cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 9 Resolved Examples Grid */}
              <div className="space-y-6">
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-display">
                      9 Ejemplos Resueltos de Propiedades
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                      Familiarízate con la expansión y condensación en tres niveles distintos de dificultad.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Category 1: Básicos */}
                  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-sm">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider rounded bg-violet-500/10 text-violet-700 dark:text-violet-400 uppercase font-mono">
                      Inicial: Expansión y Suma
                    </span>
                    <div className="space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800/60">
                      <div className="pt-1">
                        <MathFormula formula="\log_{2}(4x) = 2 + \log_{2}(x)" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Aplicamos producto: <MathFormula formula="\log_2(4) + \log_2(x)" />. Dado que <MathFormula formula="2^2 = 4" />, resolvemos el término numérico a <MathFormula formula="2" />.
                        </p>
                      </div>
                      <div className="pt-3.5">
                        <MathFormula formula="\log_{3}(5) + \log_{3}(x) = \log_{3}(5x)" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Propiedad de condensación de sumas. Sumar logaritmos de igual base se unifica multiplicando los argumentos.
                        </p>
                      </div>
                      <div className="pt-3.5">
                        <MathFormula formula="\log_{5}(y^3) = 3\log_{5}(y)" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Propiedad de la potencia. El exponente <MathFormula formula="3" /> del argumento pasa al frente a multiplicar todo el logaritmo.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category 2: Intermedios */}
                  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-sm">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 uppercase font-mono">
                      Medio: Expresiones Combinadas
                    </span>
                    <div className="space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800/60">
                      <div className="pt-1">
                        <MathFormula formula="\log_{b}\left(\frac{x^2}{y}\right) = 2\log_{b}(x) - \log_{b}(y)" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Combinamos cociente y potencia. Restamos logaritmos por la fracción y luego bajamos el exponente <MathFormula formula="2" />.
                        </p>
                      </div>
                      <div className="pt-3.5">
                        <MathFormula formula="2\log(a) + 3\log(b) = \log(a^2 b^3)" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Para condensar, primero subimos los coeficientes como exponentes y luego unificamos la suma como un producto.
                        </p>
                      </div>
                      <div className="pt-3.5">
                        <MathFormula formula="\log_{4}(8) = \frac{\log_{2}(8)}{\log_{2}(4)} = \frac{3}{2} = 1.5" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Cambio de base a base común <MathFormula formula="2" />. Permite calcular logaritmos no exactos de manera rápida y directa.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category 3: Avanzados */}
                  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-sm">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider rounded bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400 uppercase font-mono">
                      Desafiante: Raíces y Fracciones
                    </span>
                    <div className="space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800/60">
                      <div className="pt-1">
                        <MathFormula formula="\log_{b}(\sqrt{x}) = \frac{1}{2}\log_{b}(x)" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          La raíz cuadrada se escribe como potencia fraccionaria: <MathFormula formula="x^{1/2}" />, y luego por potencia se baja el factor <MathFormula formula="1/2" />.
                        </p>
                      </div>
                      <div className="pt-3.5">
                        <MathFormula formula="\log_{b}\left(\frac{\sqrt{x} y^3}{z^2}\right) = \frac{1}{2}\log_{b}(x) + 3\log_{b}(y) - 2\log_{b}(z)" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Ejemplo de desarrollo completo. Se restan los términos del denominador y se suman con sus potencias los del numerador.
                        </p>
                      </div>
                      <div className="pt-3.5">
                        <MathFormula formula="\frac{1}{2}\log_{2}(x) - 3\log_{2}(y) + \log_{2}(z) = \log_{2}\left(\frac{z\sqrt{x}}{y^3}\right)" className="font-bold text-slate-800 dark:text-slate-200 text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                          Condensación compleja. El término con exponente negativo (<MathFormula formula="y^3" />) va al denominador, y los positivos multiplican en el numerador.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Quick Warm-up Questions */}
              <div className="bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-violet-500" />
                    Calentamiento Rápido de Propiedades
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-light">
                    Responde estas 3 preguntas sencillas para validar tu comprensión y ver la retroalimentación inmediata.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-2">
                  {/* Warm-up 1 */}
                  <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">EJERCICIO 1</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        ¿A qué expresión es equivalente?
                      </p>
                      <div className="py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-center">
                        <MathFormula formula="\log_{2}(8x)" className="text-base font-bold" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      {[
                        { val: '3 + \\log_{2}(x)', isCorrect: true, label: '3 + log_2(x)' },
                        { val: '8 + \\log_{2}(x)', isCorrect: false, label: '8 + log_2(x)' },
                        { val: '3\\log_{2}(x)', isCorrect: false, label: '3 log_2(x)' },
                      ].map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => setQuickAnswers(prev => ({ ...prev, q1: option.label }))}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            quickAnswers.q1 === option.label
                              ? option.isCorrect
                                ? 'bg-green-500/10 border-green-500/30 text-green-600'
                                : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <MathFormula formula={option.val} />
                        </button>
                      ))}
                    </div>
                    {quickAnswers.q1 !== null && (
                      <div className="mt-3 text-[11px] leading-relaxed">
                        {quickAnswers.q1 === '3 + log_2(x)' ? (
                          <p className="text-green-600 dark:text-green-400 font-medium">
                            <span className="font-extrabold">✓ ¡Correcto!</span> Separamos como suma: <MathFormula formula="\log_2(8) + \log_2(x)" />. Y sabemos que <MathFormula formula="\log_2(8) = 3" />.
                          </p>
                        ) : (
                          <p className="text-rose-600 dark:text-rose-400 font-medium">
                            <span className="font-extrabold">✗ Incorrecto.</span> Por propiedad de producto, los argumentos que se multiplican se separan sumando sus logaritmos. Prueba de nuevo.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Warm-up 2 */}
                  <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">EJERCICIO 2</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Condensa la siguiente resta:
                      </p>
                      <div className="py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-center">
                        <MathFormula formula="2\\log_{b}(x) - \\log_{b}(y)" className="text-base font-bold" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      {[
                        { val: '\\log_{b}\\left(\\frac{x^2}{y}\\right)', isCorrect: true, label: 'div' },
                        { val: '\\log_{b}(x^2 - y)', isCorrect: false, label: 'sub' },
                        { val: '\\log_{b}\\left(\\frac{2x}{y}\\right)', isCorrect: false, label: 'coef' },
                      ].map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => setQuickAnswers(prev => ({ ...prev, q2: option.label }))}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            quickAnswers.q2 === option.label
                              ? option.isCorrect
                                ? 'bg-green-500/10 border-green-500/30 text-green-600'
                                : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <MathFormula formula={option.val} />
                        </button>
                      ))}
                    </div>
                    {quickAnswers.q2 !== null && (
                      <div className="mt-3 text-[11px] leading-relaxed">
                        {quickAnswers.q2 === 'div' ? (
                          <p className="text-green-600 dark:text-green-400 font-medium">
                            <span className="font-extrabold">✓ ¡Correcto!</span> Subimos el exponente: <MathFormula formula="\log_b(x^2)" /> y luego condensamos como división por la resta.
                          </p>
                        ) : (
                          <p className="text-rose-600 dark:text-rose-400 font-medium">
                            <span className="font-extrabold">✗ Incorrecto.</span> Sube el coeficiente <MathFormula formula="2" /> como exponente de <MathFormula formula="x" /> primero. Intenta de nuevo.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Warm-up 3 */}
                  <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">EJERCICIO 3</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Calcula por cambio de base:
                      </p>
                      <div className="py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-center">
                        <MathFormula formula="\\log_{9}(27)" className="text-base font-bold" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      {[
                        { val: '1.5', isCorrect: true, label: '1.5' },
                        { val: '3', isCorrect: false, label: '3' },
                        { val: '2', isCorrect: false, label: '2' },
                      ].map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => setQuickAnswers(prev => ({ ...prev, q3: option.label }))}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            quickAnswers.q3 === option.label
                              ? option.isCorrect
                                ? 'bg-green-500/10 border-green-500/30 text-green-600'
                                : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {option.val}
                        </button>
                      ))}
                    </div>
                    {quickAnswers.q3 !== null && (
                      <div className="mt-3 text-[11px] leading-relaxed">
                        {quickAnswers.q3 === '1.5' ? (
                          <p className="text-green-600 dark:text-green-400 font-medium">
                            <span className="font-extrabold">✓ ¡Correcto!</span> Cambiamos a base <MathFormula formula="3" />: <MathFormula formula="\frac{\log_3(27)}{\log_3(9)} = \frac{3}{2} = 1.5" />.
                          </p>
                        ) : (
                          <p className="text-rose-600 dark:text-rose-400 font-medium">
                            <span className="font-extrabold">✗ Incorrecto.</span> Dado que no es entero directo, exprésalo como potencias de base <MathFormula formula="3" />. Prueba de nuevo.
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
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-display">Clase Grabada: Propiedades de los Logaritmos</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Multiplicación, división, potencias y el cambio de base explicados</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-5 gap-8 items-start">
                  {/* YouTube Embed Player */}
                  <div className="md:col-span-3 space-y-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-250 dark:border-slate-800 shadow-lg">
                      <iframe
                        src="https://www.youtube.com/embed/yM9qt6WKFnc"
                        title="iSebas Portal EDU - Propiedades de los Logaritmos"
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
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-lg leading-snug">Propiedades de los Logaritmos</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                        En este video clase aprenderás a manipular expresiones logarítmicas de forma algebraica, cómo expandir términos complejos y el truco fundamental del cambio de base para cálculos exactos.
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <div className="flex justify-between">
                        <span>Tema principal:</span>
                        <span className="text-slate-700 dark:text-slate-300 font-mono">Leyes de Logaritmos</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Requisito previo:</span>
                        <span className="text-slate-700 dark:text-slate-300 font-mono">Definición de Logaritmo</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ejercicios clave:</span>
                        <span className="text-slate-700 dark:text-slate-300 font-mono">Expansión algebraica y Cambio de Base</span>
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
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-display">Prueba de Autoevaluación - Fase 2</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                      Evalúa tu capacidad para resolver logaritmos algebraicos complejos. Pon a prueba tus destrezas sobre expansión de raíces, unificación de sumas y restas de logaritmos y el uso correcto del cambio de base.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/50 p-4 border border-slate-200 dark:border-slate-900 rounded-xl inline-grid grid-cols-3 gap-6 text-xs text-slate-500 dark:text-slate-400 w-full shadow-inner">
                    <div>
                      <span className="block text-slate-400 dark:text-slate-500 mb-1">Preguntas</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm font-mono">5 Ejercicios</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 dark:text-slate-500 mb-1">Temas</span>
                      <span className="font-extrabold text-violet-600 dark:text-violet-400 text-sm font-mono">Propiedades y Leyes</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 dark:text-slate-500 mb-1">Retroalimentación</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm font-mono">Paso a Paso</span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => setQuizStarted(true)}
                      className="px-6 py-3 bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-600/15 cursor-pointer"
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
                        ? '¡Excelente trabajo! Dominas las leyes de los logaritmos a la perfección.'
                        : score >= 3 
                        ? '¡Muy bien! Tienes buen manejo del cambio de base y la expansión.'
                        : 'Sigue practicando. Juega un rato más con el visualizador interactivo de propiedades.'}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={handleResetQuiz}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition-all text-sm font-bold cursor-pointer"
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
                      {quizQuestions[currentQuestion].question}
                    </p>
                    <div className="py-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl flex justify-center border border-slate-200 dark:border-slate-900/60 shadow-inner">
                      <MathFormula formula={quizQuestions[currentQuestion].latex} displayMode={true} className="text-xl font-bold" />
                    </div>
                  </div>

                  {/* Vertical Quiz Options */}
                  <div className="space-y-3 pt-2">
                    {quizQuestions[currentQuestion].options.map((option, idx) => {
                      const isSelected = selectedAnswer === idx;
                      const isCorrect = idx === quizQuestions[currentQuestion].correctIndex;
                      
                      let optionStyle = "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/20";
                      
                      if (isSubmitted) {
                        if (isCorrect) {
                          optionStyle = "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 font-semibold";
                        } else if (isSelected) {
                          optionStyle = "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 font-semibold";
                        } else {
                          optionStyle = "border-slate-100 dark:border-slate-900/40 text-slate-400 dark:text-slate-600 opacity-60";
                        }
                      } else if (isSelected) {
                        optionStyle = "border-violet-500 bg-violet-500/5 text-violet-600 dark:text-violet-400 font-semibold shadow-inner";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSelection(idx)}
                          disabled={isSubmitted}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-sm cursor-pointer ${optionStyle}`}
                        >
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

                  {/* Feedback Explanation Card */}
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-900 space-y-2 leading-relaxed shadow-inner"
                    >
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                        <Info className="w-3.5 h-3.5 text-violet-600" />
                        Explicación Paso a Paso:
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-light">
                        {quizQuestions[currentQuestion].explanation.split('$').map((part, i) => (
                          i % 2 === 0 ? part : <MathFormula key={i} formula={part} className="text-violet-600 dark:text-violet-400 font-semibold mx-0.5" />
                        ))}
                      </p>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    {!isSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                          selectedAnswer !== null
                            ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-md'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-450 border border-slate-200/50 dark:border-slate-700 cursor-not-allowed'
                        }`}
                      >
                        Enviar Respuesta
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold transition-all shadow-md cursor-pointer"
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
                  Descarga la guía oficial de ejercicios prácticos sobre propiedades de los logaritmos. Resuelve retos de expansión, condensación y cambio de base.
                </p>

                <div className="max-w-md pt-2">
                  {/* Workshop Card */}
                  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm dark:shadow-none">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono font-bold text-violet-600 dark:text-violet-400 uppercase">PDF</span>
                        <span>Fase 2: Propiedades</span>
                      </div>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-base leading-snug">Taller 2: Propiedades de los Logaritmos</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                        Ejercicios didácticos enfocados en aplicar leyes del producto, cociente, cambio de base y potencias sin el uso de calculadora.
                      </p>
                    </div>
                    <a 
                      href="./cursos/matematica-basica/logaritmos/talleres/taller_propiedades_logaritmos.pdf" 
                      download="taller_propiedades_logaritmos.pdf"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-250 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer font-sans"
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
