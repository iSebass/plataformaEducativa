import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-8 mt-auto theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="flex justify-center items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-lg">
          <GraduationCap className="w-6 h-6 text-violet-600 dark:text-violet-500" />
          <span className="bg-gradient-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
            PortalEdu
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-500 text-sm">
          Plataforma educativa modular e interactiva para la formación científica y tecnológica.
        </p>
        <p className="text-slate-500 dark:text-slate-600 text-xs font-mono">
          &copy; {new Date().getFullYear()} - Universidad del Valle. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
