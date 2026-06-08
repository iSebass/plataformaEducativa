import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogCalculator from './LogCalculator';
import Phase1Workspace from './Phase1Workspace';
import Phase2Workspace from './Phase2Workspace';
import { 
  BookOpen, 
  Calculator, 
  Lock, 
  ArrowRight,
  Compass,
  Sparkles,
  Layers
} from 'lucide-react';

export default function LogarithmsModule() {
  const [activePhase, setActivePhase] = useState(null);
  const [activeDashboardTab, setActiveDashboardTab] = useState('roadmap');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen theme-transition">
      <AnimatePresence mode="wait">
        {activePhase === null ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Dashboard Slogan Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>iSebas Portal EDU — Tu ruta hacia el éxito académico 🚀</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 font-display">
                Módulo Temático: Logaritmos
              </h1>
              <p className="text-slate-650 dark:text-slate-400 max-w-3xl text-sm md:text-base leading-relaxed font-light">
                Comprende las bases de los logaritmos y sus aplicaciones de forma estructurada. Explora las fases interactivas de aprendizaje, descarga talleres prácticos oficiales y evalúa tus conocimientos paso a paso.
              </p>
            </div>

            {/* Dashboard Tabs selector */}
            <div className="flex border-b border-slate-200 dark:border-slate-850 overflow-x-auto pb-px custom-scrollbar theme-transition">
              <button
                onClick={() => setActiveDashboardTab('roadmap')}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeDashboardTab === 'roadmap'
                    ? 'border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-500/5'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30'
                }`}
              >
                <Compass className="w-4 h-4" />
                Ruta de Aprendizaje
              </button>
              <button
                onClick={() => setActiveDashboardTab('calculator')}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeDashboardTab === 'calculator'
                    ? 'border-violet-600 dark:border-violet-500 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-500/5'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30'
                }`}
              >
                <Calculator className="w-4 h-4" />
                Calculadora Global de Pasos
              </button>
            </div>

            {/* Dashboard view body */}
            <div className="min-h-[400px] pt-2">
              {activeDashboardTab === 'roadmap' ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {/* Phase 1 Card */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-violet-500/55 hover:shadow-lg dark:hover:shadow-none hover:shadow-violet-600/5 transition-all group relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 rounded font-mono font-bold text-[10px] uppercase">
                          FASE 1
                        </span>
                        <span className="text-[11px] font-semibold text-green-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Activa
                        </span>
                      </div>
                      
                      <div className="p-3 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-xl w-fit">
                        <BookOpen className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-extrabold text-slate-800 dark:text-slate-150 text-lg group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          Definición de Logaritmo
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                          Entiende qué es un logaritmo, su estrecha relación con las potencias y las reglas obligatorias de la base y argumento.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActivePhase('fase-1')}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 hover:bg-violet-600 dark:hover:bg-violet-600 hover:text-white dark:hover:text-white dark:text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer"
                    >
                      Ingresar a la Fase 1
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>

                  {/* Phase 2 Card */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-fuchsia-500/55 hover:shadow-lg dark:hover:shadow-none hover:shadow-fuchsia-600/5 transition-all group relative overflow-hidden"
                  >
                    {/* Glow light effect for Phase 2 (new module) */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-500/5 rounded-full blur-2xl pointer-events-none" />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-500/20 rounded font-mono font-bold text-[10px] uppercase">
                          FASE 2
                        </span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-rose-500 text-white rounded uppercase tracking-wider animate-pulse">
                          Nuevo 🔥
                        </span>
                      </div>
                      
                      <div className="p-3 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 rounded-xl w-fit">
                        <Layers className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-extrabold text-slate-800 dark:text-slate-150 text-lg group-hover:text-fuchsia-650 dark:group-hover:text-fuchsia-400 transition-colors">
                          Leyes y Propiedades
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                          Domina las leyes del producto, cociente, potencia y cambio de base. Expande y condensa expresiones algebraicas de forma didáctica.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActivePhase('fase-2')}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 hover:bg-fuchsia-600 dark:hover:bg-fuchsia-600 hover:text-white dark:hover:text-white dark:text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer"
                    >
                      Ingresar a la Fase 2
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>

                  {/* Phase 3 Card (Coming Soon) */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-slate-100/40 dark:bg-slate-900/10 border border-dashed border-slate-200 dark:border-slate-850 rounded-2xl p-6 flex flex-col justify-between opacity-80"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded font-mono font-bold text-[10px] uppercase">
                          FASE 3
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 flex items-center gap-1">
                          Próximamente
                        </span>
                      </div>
                      
                      <div className="p-3 bg-slate-100 dark:bg-slate-850 text-slate-400 dark:text-slate-650 rounded-xl w-fit">
                        <Lock className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-extrabold text-slate-450 dark:text-slate-550 text-lg">
                          Función Inversa y Ecuaciones
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-light">
                          Aprende a resolver ecuaciones logarítmicas de diferentes tipos y comprende la relación inversa con la función exponencial.
                        </p>
                      </div>
                    </div>

                    <button
                      disabled
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2.5 bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 text-slate-400 dark:text-slate-550 font-bold rounded-xl text-xs cursor-not-allowed"
                    >
                      Bloqueado
                    </button>
                  </motion.div>

                  {/* Phase 4 Card (Coming Soon) */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-slate-100/40 dark:bg-slate-900/10 border border-dashed border-slate-200 dark:border-slate-850 rounded-2xl p-6 flex flex-col justify-between opacity-80"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded font-mono font-bold text-[10px] uppercase">
                          FASE 4
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 flex items-center gap-1">
                          Próximamente
                        </span>
                      </div>
                      
                      <div className="p-3 bg-slate-100 dark:bg-slate-850 text-slate-400 dark:text-slate-650 rounded-xl w-fit">
                        <Lock className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-extrabold text-slate-450 dark:text-slate-550 text-lg">
                          Desigualdades y Funciones
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-light">
                          Analiza el dominio, rango y las asíntotas de las gráficas logarítmicas y resuelve inecuaciones con rigor y claridad.
                        </p>
                      </div>
                    </div>

                    <button
                      disabled
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2.5 bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 text-slate-400 dark:text-slate-550 font-bold rounded-xl text-xs cursor-not-allowed"
                    >
                      Bloqueado
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="calculator-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LogCalculator />
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : activePhase === 'fase-1' ? (
          <motion.div
            key="fase-1-workspace"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Phase1Workspace onBack={() => setActivePhase(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="fase-2-workspace"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Phase2Workspace onBack={() => setActivePhase(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
