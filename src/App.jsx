import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Cursor from './components/ui/Cursor';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Labs from './components/sections/Labs';
import Experience from './components/sections/Experience';
import Stack from './components/sections/Stack';
import Research from './components/sections/Research';
import Publications from './components/sections/Publications';
import Contact from './components/sections/Contact';
import { ThemeProvider } from './context/ThemeContext';

// Loading screen
function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 300);
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="loader-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
      >
        {/* Animated logo mark */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <motion.rect
            x="4" y="4" width="18" height="18" rx="3"
            stroke="var(--accent)" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          <motion.rect
            x="26" y="4" width="18" height="18" rx="3"
            stroke="rgba(34,211,238,0.3)" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.rect
            x="4" y="26" width="18" height="18" rx="3"
            stroke="rgba(34,211,238,0.3)" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.rect
            x="26" y="26" width="18" height="18" rx="3"
            stroke="var(--accent)" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </svg>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-head)',
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '0.12em',
            color: 'var(--text-primary)',
          }}
        >
          SHIVARAJ B PATIL
        </motion.p>

        {/* Progress bar */}
        <div
          style={{
            width: '160px',
            height: '1px',
            background: 'var(--border)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'var(--accent)',
              borderRadius: '1px',
            }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Mouse glow tracker (global)
function MouseGlow() {
  useEffect(() => {
    const el = document.getElementById('global-mouse-glow');
    if (!el) return;
    const move = (e) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div
      id="global-mouse-glow"
      className="mouse-glow"
      style={{ opacity: 0.5, pointerEvents: 'none' }}
    />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      smooth: true,
      direction: 'vertical',
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [loading]);

  return (
    <ThemeProvider>
      {/* Noise texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Global mouse glow */}
      <MouseGlow />

      {/* Custom cursor (desktop only) */}
      <Cursor />

      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="loader" onDone={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Labs />
            <Experience />
            <Stack />
            <Research />
            <Publications />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </ThemeProvider>
  );
}
