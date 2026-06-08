import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import LogarithmsModule from './components/LogarithmsModule';

function App() {
  // Persistence in localStorage, default to dark
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 font-sans selection:bg-violet-500/30 selection:text-violet-200 theme-transition">
      {/* Navigation bar with theme toggle */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main page content area */}
      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matematica-basica" element={<LogarithmsModule />} />
          {/* Catch-all route to redirect back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Page footer */}
      <Footer />
    </div>
  );
}

export default App;
