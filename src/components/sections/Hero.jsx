import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { personal } from '../../data/portfolio';
import MagneticButton from '../ui/MagneticButton';
import { IconArrowDown, IconDownload, IconMail, IconUser } from '@tabler/icons-react';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Fallback Avatar SVG ─────────────────────────────────────────────────────
function AvatarFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--surface-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'inherit',
      }}
    >
      <IconUser size={64} stroke={1} color="var(--text-dim)" />
    </div>
  );
}

// ─── Profile Photo Component ─────────────────────────────────────────────────
function ProfilePhoto({ mouseX, mouseY }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef(null);

  // Handle already-cached images (onLoad won't fire again)
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, []);

  // Parallax: convert normalized mouse offset (-0.5 to 0.5) → slight rotation/translate
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);
  const translateX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-6, 6]);

  // Spring-smooth all transforms
  const springConfig = { stiffness: 80, damping: 20, mass: 0.8 };
  const sRotateX    = useSpring(rotateX,    springConfig);
  const sRotateY    = useSpring(rotateY,    springConfig);
  const sTranslateX = useSpring(translateX, springConfig);
  const sTranslateY = useSpring(translateY, springConfig);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer ambient glow ring */}
      <div
        style={{
          position: 'absolute',
          inset: '-20px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle rotating dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: '-12px',
          borderRadius: '50%',
          border: '1px dashed rgba(34,211,238,0.12)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating + parallax wrapper */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          rotateX: sRotateX,
          rotateY: sRotateY,
          x: sTranslateX,
          y: sTranslateY,
          transformStyle: 'preserve-3d',
          perspective: 800,
        }}
      >
        {/* Photo frame */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(220px, 28vw, 340px)',
            height: 'clamp(220px, 28vw, 340px)',
            borderRadius: '50%',
          }}
        >
          {/* Gradient border */}
          <div
            style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(34,211,238,0.5) 0%, rgba(34,211,238,0.05) 50%, rgba(34,211,238,0.2) 100%)',
              padding: '2px',
            }}
          />

          {/* Inner shadow inset ring */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              boxShadow: '0 0 40px rgba(34,211,238,0.08), 0 20px 60px rgba(0,0,0,0.5)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          {/* Image container */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'var(--surface)',
              border: '2px solid rgba(34,211,238,0.18)',
              position: 'relative',
            }}
          >
            {/* Loading shimmer */}
            {!imgLoaded && !imgError && (
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.05) 50%, transparent 100%)',
                  borderRadius: '50%',
                  zIndex: 1,
                }}
              />
            )}

            {!imgError ? (
              <motion.img
                ref={imgRef}
                src="/profile.png"
                alt="Shivaraj B Patil — AI/ML Engineer"
                loading="eager"
                decoding="sync"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                initial={{ filter: 'grayscale(60%) saturate(0.7)', scale: 1.02 }}
                whileHover={{ filter: 'grayscale(0%) saturate(1)', scale: 1.04 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  opacity: imgLoaded ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              />
            ) : (
              <AvatarFallback />
            )}
          </div>
        </div>
      </motion.div>

      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.4, type: 'spring', stiffness: 300 }}
        style={{
          position: 'absolute',
          bottom: '12%',
          right: '6%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.35rem 0.75rem',
          background: 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border-md)',
          borderRadius: '999px',
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#22C55E',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          Open to Opportunities
        </span>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function Hero() {
  const glowRef = useRef(null);

  // Normalized mouse position (−0.5 to 0.5) for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const move = (e) => {
      // Update grid mouse glow
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
      // Update parallax values
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Animated grid */}
      <div className="grid-bg" />

      {/* Subtle radial glow at center-top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Mouse-tracked glow */}
      <div
        ref={glowRef}
        className="mouse-glow"
        style={{ opacity: 0.7 }}
      />

      <div
        className="container-xl"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '7rem',
          paddingBottom: '5rem',
          width: '100%',
        }}
      >
        {/* ── Two-column hero grid ── */}
        <div
          className="hero-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* ── LEFT: Text content ── */}
          <motion.div
            className="hero-text"
            variants={container}
            initial="hidden"
            animate="visible"
            style={{ order: 1 }}
          >
            {/* Label */}
            <motion.div variants={item} style={{ marginBottom: '2.5rem' }}>
              <span className="label">Portfolio — 2025</span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item} style={{ marginBottom: '0.25rem' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-head)',
                  fontWeight: 900,
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                }}
              >
                SHIVARAJ
              </h1>
            </motion.div>
            <motion.div variants={item} style={{ marginBottom: '2.5rem' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-head)',
                  fontWeight: 900,
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.03em',
                  color: 'var(--accent)',
                }}
              >
                B PATIL
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={item} style={{ marginBottom: '1.5rem' }}>
              <p
                style={{
                  fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                AI/ML Engineer&nbsp;&nbsp;·&nbsp;&nbsp;Researcher&nbsp;&nbsp;·&nbsp;&nbsp;Full Stack Developer
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.div variants={item} style={{ marginBottom: '3rem', maxWidth: '460px' }}>
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                }}
              >
                {personal.tagline}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
            >
              <MagneticButton>
                <a href="#projects" className="btn-primary">
                  Explore Work
                  <IconArrowDown size={15} stroke={2} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href={personal.resume} className="btn-ghost" download={personal.resumeFilename}>
                  <IconDownload size={15} stroke={1.5} />
                  Download Resume
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="#contact" className="btn-ghost">
                  <IconMail size={15} stroke={1.5} />
                  Contact
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Profile Photo ── */}
          <div
            className="hero-photo"
            style={{
              order: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ProfilePhoto mouseX={mouseX} mouseY={mouseY} />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            right: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              writingMode: 'vertical-rl',
            }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <IconArrowDown size={14} stroke={1.5} color="var(--text-dim)" />
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile order: photo on top — handled via grid auto-fit reflow */}
      <style>{`
        @media (max-width: 640px) {
          #hero .hero-grid > *:first-child  { order: 2 !important; }
          #hero .hero-grid > *:last-child   { order: 1 !important; }
        }
      `}</style>
    </section>
  );
}
