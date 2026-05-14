import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { IconSun, IconMoon, IconMenu2, IconX } from '@tabler/icons-react';

const navLinks = [
  { href: '#about',        label: 'About' },
  { href: '#projects',     label: 'Projects' },
  { href: '#labs',         label: 'Labs' },
  { href: '#experience',   label: 'Experience' },
  { href: '#stack',        label: 'Stack' },
  { href: '#research',     label: 'Research' },
  { href: '#publications', label: 'Publication' },
  { href: '#contact',      label: 'Contact' },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          width: 'calc(100% - 2.5rem)',
          maxWidth: '900px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.6rem 1.25rem',
            borderRadius: '12px',
            background: scrolled
              ? 'rgba(10,10,10,0.85)'
              : 'rgba(10,10,10,0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
            transition: 'background 0.3s ease',
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              color: 'var(--text-primary)',
              textDecoration: 'none',
            }}
          >
            SBP
          </a>

          {/* Desktop links */}
          <div
            className="hidden md:flex"
            style={{ gap: '1.5rem', alignItems: 'center' }}
          >
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`nav-link ${active === href.slice(1) ? 'active' : ''}`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                padding: '0.25rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {theme === 'dark'
                ? <IconSun size={16} stroke={1.5} />
                : <IconMoon size={16} stroke={1.5} />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(o => !o)}
              className="flex md:hidden"
              aria-label="Toggle menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                padding: '0.25rem',
              }}
            >
              {open ? <IconX size={18} stroke={1.5} /> : <IconMenu2 size={18} stroke={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                marginTop: '0.5rem',
                borderRadius: '12px',
                background: 'rgba(10,10,10,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border)',
                padding: '1rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="nav-link"
                  onClick={() => setOpen(false)}
                  style={{ fontSize: '0.9rem' }}
                >
                  {label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile nav uses md:hidden / hidden md:flex above with Tailwind */}
      <style>{`
        @media (min-width: 768px) { .hidden { display: none; } .md\\:flex { display: flex !important; } }
        @media (max-width: 767px) { .md\\:hidden { display: none !important; } }
      `}</style>
    </>
  );
}
