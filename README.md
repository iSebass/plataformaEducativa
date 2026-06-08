# 🎓 PortalEdu | Guía Interactiva de Logaritmos (Matemática Básica)

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/KaTeX-0.17-005A9C?logo=katex&logoColor=white&style=flat-square)](https://katex.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-F107A3?logo=framer&logoColor=white&style=flat-square)](https://framer.com/motion/)

¡Bienvenido a **PortalEdu**! Esta es una plataforma educativa modular e interactiva diseñada especialmente para estudiantes de **Matemática Básica** en la **Universidad del Valle**. 

El propósito de este módulo interactivo es transformar el aprendizaje de los logaritmos (Fase 1: Concepto, Definición y Restricciones) en una experiencia dinámica, visual y de fácil comprensión, ideal para estudiantes que se introducen al tema por primera vez.

---

## ✨ Características Principales

### 🌓 Modo Claro y Oscuro Premium
Una interfaz visualmente impactante, diseñada para un contraste óptimo y alta legibilidad en cualquier iluminación. La preferencia del tema se almacena de forma persistente en tu navegador.

### 📐 Visualizador de Definición en Tiempo Real
Mueve los deslizadores de base y exponente y observa de inmediato la equivalencia formal y numérica:
$$\log_{b}(x) = y \iff b^y = x$$
Ayuda a crear un mapa mental claro entre la potenciación y los logaritmos.

### 💡 Ejemplos Resueltos Clasificados
Un repertorio amplio de ejemplos organizados por categorías pedagógicas:
* **Ejemplos Básicos**: Conceptos y multiplicaciones consecutivas directas.
* **Argumentos Fraccionarios**: Leyes de exponentes con signo negativo (ej. $\log_5(1/25) = -2$).
* **Casos Especiales**: El logaritmo de la base ($\log_b(b) = 1$) y el logaritmo de 1 ($\log_b(1) = 0$).

### ⚡ Calentamiento Rápido e Interactivo
Tres ejercicios autocorregibles en la misma página de teoría con retroalimentación explicativa inmediata tras cada respuesta, ideal para consolidar confianza antes de iniciar evaluaciones formales.

### ✍️ Autoevaluación Práctica (Quiz Vertical)
Cinco ejercicios clave diseñados específicamente para resolver sin calculadora. Cada alternativa se presenta en formato vertical estructurado para optimizar la visualización de fórmulas matemáticas, e incluye una **explicación pedagógica paso a paso** al enviar la respuesta.

### 🎥 Clase en Video Integrada
Mira la videoclase grabada sobre el concepto y la definición de logaritmos sin salir del portal.

### 📥 Descarga de Taller en PDF
Guía de ejercicios oficial descargable para practicar offline.

---

## 🛠️ Tecnologías Utilizadas

* **React 19** - Librería para la interfaz de usuario.
* **Vite 8** - Entorno de desarrollo rápido y empaquetador.
* **Tailwind CSS v4** - Estilizado responsivo moderno y transiciones de tema suaves.
* **KaTeX** - Renderizado matemático ultrarrápido y de calidad editorial para fórmulas.
* **Framer Motion** - Transiciones fluidas entre pestañas y animaciones sutiles.
* **Lucide Icons** - Conjunto de iconos didácticos y limpios.

---

## 🚀 Instalación y Ejecución Local

Para ejecutar el portal en tu entorno local, asegúrate de tener instalado [Node.js](https://nodejs.org/) y sigue estos pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/iSebass/plataformaEducativa.git
   cd plataformaEducativa
   ```

2. **Instalar las dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la aplicación activa.

4. **Compilar para producción**:
   ```bash
   npm run build
   ```
   Esto generará los archivos optimizados dentro de la carpeta `dist/` listos para ser desplegados en cualquier hosting web.

---

## 📁 Estructura del Proyecto

* `src/components/Navbar.jsx` - Barra de navegación con selector de tema persistente.
* `src/components/Footer.jsx` - Pie de página con créditos institucionales.
* `src/components/Home.jsx` - Página de bienvenida atractiva al portal.
* `src/components/LogarithmsModule.jsx` - Módulo principal (teoría, ejemplos, práctica rápida, quiz, video y PDF).
* `src/components/LogCalculator.jsx` - Calculadora interactiva que detalla los pasos.
* `src/components/MathFormula.jsx` - Componente de renderizado de KaTeX seguro y reactivo.
* `src/index.css` - Configuración global de temas, fuentes de Google (Outfit & Plus Jakarta Sans) y barras de desplazamiento personalizadas.

---

Universidad del Valle - 2026
