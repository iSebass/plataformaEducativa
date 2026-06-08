import { useState } from 'react';
import MathFormula from './MathFormula';
import { Calculator, HelpCircle, ArrowRight } from 'lucide-react';

export default function LogCalculator() {
  const [base, setBase] = useState('2');
  const [value, setValue] = useState('8');

  const b = parseFloat(base);
  const x = parseFloat(value);

  let error = '';
  let result = 0;
  let steps = [];

  if (isNaN(b) || isNaN(x)) {
    error = 'Por favor, ingresa números válidos.';
  } else if (b <= 0) {
    error = 'La base debe ser mayor que 0.';
  } else if (b === 1) {
    error = 'La base no puede ser 1 (ya que 1 elevado a cualquier número es 1).';
  } else if (x <= 0) {
    error = 'El argumento (número) debe ser mayor que 0.';
  } else {
    result = Math.log(x) / Math.log(b);

    // Paso 1: Planteamiento de la ecuación
    steps.push({
      title: 'Planteamiento de la ecuación',
      latex: `\\log_{${b}}(${x}) = y \\iff ${b}^y = ${x}`,
      desc: 'Buscamos el exponente $y$ al que debemos elevar la base para obtener el número.',
    });

    // Paso 2: Evaluar caso exacto simple
    let foundExact = false;
    for (let y = -10; y <= 15; y++) {
      if (Math.abs(Math.pow(b, y) - x) < 1e-9) {
        foundExact = true;
        steps.push({
          title: 'Cálculo por definición (Caso Exacto)',
          latex: `${b}^{${y}} = ${x}`,
          desc: `Identificamos que elevar la base $${b}$ al exponente entero $${y}$ da exactamente $${x}$. Por definición, el logaritmo es $${y}$.`,
        });
        break;
      }
    }

    // Paso 3: Evaluar base común si no es exacto directo
    if (!foundExact) {
      const basesComunes = [2, 3, 5, 10];
      let foundCommon = false;
      for (const k of basesComunes) {
        const pB = Math.log(b) / Math.log(k);
        const pX = Math.log(x) / Math.log(k);
        const pB_int = Math.round(pB);
        const pX_int = Math.round(pX);

        if (Math.abs(pB - pB_int) < 1e-9 && Math.abs(pX - pX_int) < 1e-9) {
          foundCommon = true;
          steps.push({
            title: 'Propiedad de Cambio de Base (Base Común)',
            latex: `\\log_{${b}}(${x}) = \\frac{\\log_{${k}}(${x})}{\\log_{${k}}(${b})} = \\frac{\\log_{${k}}(${k}^{${pX_int}})}{\\log_{${k}}(${k}^{${pB_int}})}`,
            desc: `Ambos números son potencias de $${k}$: $${b} = ${k}^{${pB_int}}$ y $${x} = ${k}^{${pX_int}}$.`,
          });
          steps.push({
            title: 'Resolución usando exponentes',
            latex: `\\log_{${b}}(${x}) = \\frac{${pX_int}}{${pB_int}} = ${result.toFixed(4)}`,
            desc: `Simplificamos los logaritmos en base común utilizando la propiedad de potencia $\\log_k(k^p) = p$.`,
          });
          break;
        }
      }

      // Paso 4: Cambio de base general (Logaritmo Natural o Decimal)
      if (!foundCommon) {
        steps.push({
          title: 'Fórmula de Cambio de Base General',
          latex: `\\log_{${b}}(${x}) = \\frac{\\ln(${x})}{\\ln(${b})}`,
          desc: 'Cuando no hay potencias enteras evidentes, aplicamos la propiedad de cambio de base usando el logaritmo natural (base $e$).',
        });
        steps.push({
          title: 'Evaluación Numérica',
          latex: `\\log_{${b}}(${x}) \\approx \\frac{${Math.log(x).toFixed(6)}}{${Math.log(b).toFixed(6)}} \\approx ${result.toFixed(6)}`,
          desc: 'Calculamos los logaritmos naturales en la calculadora científica para obtener la aproximación decimal.',
        });
      }
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg dark:shadow-2xl relative overflow-hidden theme-transition">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Calculadora de Logaritmos Interactiva</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Aprende el paso a paso de cualquier logaritmo</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs Panel */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  Base (b)
                  <span className="group relative text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-help">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-xs text-slate-200 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                      La base debe ser mayor a 0 y diferente de 1.
                    </span>
                  </span>
                </label>
                <span className="text-xs text-violet-600 dark:text-violet-400 font-mono font-bold">b = {base}</span>
              </div>
              <input
                type="number"
                step="any"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 font-mono transition-all"
                placeholder="Ej. 2"
              />
              <input
                type="range"
                min="0.1"
                max="20"
                step="0.1"
                value={isNaN(parseFloat(base)) ? 2 : Math.max(0.1, Math.min(20, parseFloat(base)))}
                onChange={(e) => setBase(e.target.value)}
                className="w-full mt-2 accent-violet-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  Argumento (x)
                  <span className="group relative text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-help">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-xs text-slate-200 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                      El número del cual deseas calcular el logaritmo. Debe ser mayor a 0.
                    </span>
                  </span>
                </label>
                <span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-bold">x = {value}</span>
              </div>
              <input
                type="number"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 font-mono transition-all"
                placeholder="Ej. 8"
              />
              <input
                type="range"
                min="0.1"
                max="100"
                step="0.5"
                value={isNaN(parseFloat(value)) ? 8 : Math.max(0.1, Math.min(100, parseFloat(value)))}
                onChange={(e) => setValue(e.target.value)}
                className="w-full mt-2 accent-cyan-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {error ? (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 rounded-xl text-sm leading-relaxed">
              {error}
            </div>
          ) : (
            <div className="p-5 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 dark:from-violet-600/20 dark:to-cyan-600/20 border border-violet-100 dark:border-violet-500/25 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-xs uppercase tracking-widest text-violet-600 dark:text-violet-400 font-bold mb-1">Resultado</span>
              <div className="flex items-center gap-3 font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-slate-100">
                <MathFormula formula={`\\log_{${base}}(${value})`} />
                <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                <span className="text-cyan-600 dark:text-cyan-400 font-mono">
                  {Math.abs(result - Math.round(result)) < 1e-9 ? Math.round(result) : result.toFixed(5)}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
                {base}^{result.toFixed(4)} ≈ {value}
              </p>
            </div>
          )}
        </div>

        {/* Steps Panel */}
        <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl p-5 overflow-y-auto max-h-[350px] space-y-4 custom-scrollbar">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Pasos del cálculo</h4>
          {error ? (
            <div className="text-slate-400 dark:text-slate-500 text-sm flex items-center justify-center h-48">
              Corrige los errores para ver el procedimiento.
            </div>
          ) : (
            steps.map((step, idx) => (
              <div key={idx} className="border-l-2 border-violet-500/40 pl-4 py-1 space-y-1">
                <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wide">Paso {idx + 1}: {step.title}</span>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {step.desc.split('$').map((part, i) => (
                    i % 2 === 0 ? part : <code key={i} className="text-violet-600 dark:text-violet-300 font-semibold bg-violet-500/5 dark:bg-violet-950/20 px-1 py-0.5 rounded">{part}</code>
                  ))}
                </p>
                <div className="py-2 bg-slate-100 dark:bg-slate-950/60 rounded-lg flex justify-center border border-slate-200 dark:border-slate-900/60 my-1">
                  <MathFormula formula={step.latex} displayMode={true} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
