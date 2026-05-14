import { useState } from 'react';
import { motion } from 'framer-motion';
import { labs } from '../../data/portfolio';
import ScrollReveal from '../ui/ScrollReveal';
import MediaGallery from '../ui/MediaGallery';

const LabVisual = ({ id }) => {
  const cfg = {
    aviation: {
      bg: 'linear-gradient(135deg, rgba(30,20,10,0.7), rgba(10,10,10,0.95))',
      accent: 'rgba(251,191,36,0.15)',
      label: 'AVIATION SYSTEMS',
      lines: true,
    },
    edgeai: {
      bg: 'linear-gradient(135deg, rgba(15,23,42,0.7), rgba(10,10,10,0.95))',
      accent: 'rgba(34,211,238,0.12)',
      label: 'EDGE AI · JETSON',
      lines: false,
    },
    gis: {
      bg: 'linear-gradient(135deg, rgba(5,46,22,0.5), rgba(10,10,10,0.95))',
      accent: 'rgba(34,197,94,0.10)',
      label: 'EARTH SYSTEMS · GIS',
      lines: true,
    },
  };
  const c = cfg[id] || cfg.edgeai;

  return (
    <div
      style={{
        position: 'relative',
        height: '280px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: c.bg }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${c.accent} 0%, transparent 70%)` }} />
      {c.lines && (
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i}
              x1="0" y1={40 + i * 40}
              x2="100%" y2={40 + i * 40}
              stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" strokeDasharray="4 8"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i}
              x1={40 + i * 60} y1="0"
              x2={40 + i * 60} y2="100%"
              stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" strokeDasharray="4 8"
            />
          ))}
        </svg>
      )}
      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
          {c.label}
        </span>
      </div>
    </div>
  );
};

export default function Labs() {
  const [gallery, setGallery] = useState({ open: false, lab: null });
  const openGallery = (lab) => setGallery({ open: true, lab });
  const closeGallery = () => setGallery({ open: false, lab: null });

  return (
    <>
      <section id="labs" className="section-pad" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div className="container-xl">

          <ScrollReveal>
            <div style={{ marginBottom: '5rem' }}>
              <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Applied Research</span>
              <h2
                style={{
                  fontFamily: 'var(--font-head)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: 'var(--text-primary)',
                }}
              >
                Engineering Labs
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {labs.map((lab, i) => (
              <LabRow key={lab.id} lab={lab} index={i} onGalleryOpen={openGallery} />
            ))}
          </div>
        </div>
      </section>

      <MediaGallery
        isOpen={gallery.open}
        onClose={closeGallery}
        media={gallery.lab?.media || []}
        title={gallery.lab?.title?.replace('\n', ' ')}
      />
    </>
  );
}

function LabRow({ lab, index, onGalleryOpen }) {
  const isRight = lab.align === 'right';

  return (
    <ScrollReveal delay={0.08 * index}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          borderTop: '1px solid var(--border)',
          paddingTop: '3.5rem',
          paddingBottom: '3.5rem',
          alignItems: 'center',
        }}
      >
        {/* Visual */}
        <div style={{ order: isRight ? 2 : 1 }}>
          <motion.div
            whileHover={{ scale: 1.012 }}
            transition={{ duration: 0.3 }}
            onClick={() => lab.media?.length && onGalleryOpen(lab)}
            style={{ cursor: lab.media?.length ? 'pointer' : 'default' }}
          >
            <LabVisual id={lab.id} />
          </motion.div>
        </div>

        {/* Content */}
        <div
          style={{
            order: isRight ? 1 : 2,
          }}
        >
          <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '1rem' }}>
            LAB {lab.number}
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 700,
              fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: 'var(--text-primary)',
              marginBottom: '1.25rem',
              whiteSpace: 'pre-line',
            }}
          >
            {lab.title}
          </h3>
          <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            {lab.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {lab.tags.map(t => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
          {/* Note block */}
          <div
            style={{
              padding: '0.75rem 1rem',
              borderLeft: '2px solid var(--accent)',
              background: 'var(--accent-glow)',
              borderRadius: '0 8px 8px 0',
              marginBottom: lab.media?.length ? '1rem' : '0',
            }}
          >
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {lab.note}
            </p>
          </div>
          {/* Gallery trigger */}
          {lab.media?.length > 0 && (
            <button
              onClick={() => onGalleryOpen(lab)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginTop: '0.75rem',
                padding: '0.3rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                background: 'transparent',
                border: '1px solid var(--border-md)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-md)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              View Gallery
            </button>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}
