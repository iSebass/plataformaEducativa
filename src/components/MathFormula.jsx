import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function MathFormula({ formula, displayMode = false, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(formula, containerRef.current, {
          displayMode,
          throwOnError: false,
          trust: true,
        });
      } catch (error) {
        console.error('Error rendering math formula:', error);
        containerRef.current.textContent = formula;
      }
    }
  }, [formula, displayMode]);

  return (
    <span
      ref={containerRef}
      className={`inline-block overflow-x-auto max-w-full align-middle whitespace-nowrap ${
        displayMode ? 'w-full py-2 text-center' : ''
      } ${className}`}
    />
  );
}
