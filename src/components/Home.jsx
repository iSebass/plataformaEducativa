import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Brain, Sparkles, Award } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen text-slate-800 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 theme-transition">
      {/* Background blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-fuchsia-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <motion.div 
        className="max-w-6xl mx-auto space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>iSebas Portal EDU — Donde las matemáticas hacen clic ✨</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight"
          >
            <span className="font-display bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Domina las Matemáticas
            </span>
            <br />
            <span className="text-slate-800 dark:text-slate-100 font-display font-medium text-3xl sm:text-5xl">De forma interactiva</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl leading-relaxed font-light"
          >
            iSebas Portal EDU transforma el aprendizaje matemático. Visualiza conceptos complejos en tiempo real, resuelve paso a paso y pon a prueba tus conocimientos de forma divertida e interactiva.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Link
              to="/matematica-basica"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/20 hover:scale-[1.02]"
            >
              Comenzar con Logaritmos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-8 pt-6"
        >
          {/* Card 1: Visualizaciones */}
          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 relative group hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm dark:shadow-none">
            <div className="p-3 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-xl w-fit mb-5">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Aprendizaje Visual</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Explicaciones interactivas y fórmulas dinámicas que se ajustan para que entiendas la estructura de las ecuaciones.
            </p>
          </div>

          {/* Card 2: Calculadora paso a paso */}
          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 relative group hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm dark:shadow-none">
            <div className="p-3 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-xl w-fit mb-5">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Paso a Paso Detallado</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Nuestra calculadora desglosa cualquier logaritmo aplicando cambio de base o propiedades de forma de pasos detallados.
            </p>
          </div>

          {/* Card 3: Autoevaluación */}
          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 relative group hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm dark:shadow-none">
            <div className="p-3 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 rounded-xl w-fit mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Práctica Activa</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Resuelve cuestionarios interactivos diseñados para afianzar conceptos clave con retroalimentación inmediata y explicaciones.
            </p>
          </div>
        </motion.div>

        {/* Featured Course Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-slate-100/40 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-sm dark:shadow-none"
        >
          {/* Subtle light effect */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-violet-600 dark:text-violet-400 font-bold">Módulo Destacado</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                Curso: Matemática Básica <br />
                <span className="text-violet-600 dark:text-violet-400">Guía de Logaritmos</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                El concepto de logaritmo es fundamental para comprender funciones exponenciales, escala de decibelios, escala pH, y en ciencias de la computación. Este módulo incluye teoría completa, ejercicios prácticos y una calculadora especializada.
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-mono">
                <span className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg">Definición y Gráficas</span>
                <span className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg">Representación Exponencial</span>
                <span className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg">Cálculos Mentales sin Calculadora</span>
                <span className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg">Quiz de Logaritmos</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/matematica-basica"
                  className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 font-bold transition-colors group"
                >
                  Entrar a la guía interactiva
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center">
              {/* Graphic element for math representation */}
              <div className="w-full max-w-[320px] aspect-square rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 flex flex-col justify-between shadow-lg dark:shadow-2xl">
                <div className="flex justify-between items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex flex-col items-center justify-center flex-grow py-6">
                  <span className="text-xs text-violet-600 dark:text-violet-400 font-mono mb-2">Expresión fundamental</span>
                  <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 shadow-inner">
                    <code className="text-slate-800 dark:text-slate-100 text-base font-semibold">y = log_b(x) ⟺ b^y = x</code>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono border-t border-slate-100 dark:border-slate-800/80 pt-3">
                  <span>UNIVALLE 2026</span>
                  <span>MATEMÁTICA BÁSICA</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
