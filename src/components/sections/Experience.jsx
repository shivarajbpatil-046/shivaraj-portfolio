import { useState } from 'react';
import { motion } from 'framer-motion';
import { experience } from '../../data/portfolio';
import ScrollReveal from '../ui/ScrollReveal';
import MediaGallery from '../ui/MediaGallery';

// ─── Abstract visual panels per experience ────────────────────────────────────

const ExperienceVisual = ({ id, onClick }) => {
  const cfg = {
    ncc: {
      bg: 'linear-gradient(135deg, rgba(15,30,60,0.8), rgba(10,10,10,0.95))',
      accent: 'rgba(34,211,238,0.10)',
      label: 'AIR WING · NCC',
      lines: true,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.35 }}>
          {/* Simplified aircraft silhouette */}
          <path d="M24 8 L40 28 L28 26 L24 38 L20 26 L8 28 Z" stroke="rgba(34,211,238,0.8)" strokeWidth="1" fill="none" />
          <circle cx="24" cy="23" r="2" fill="rgba(34,211,238,0.6)" />
          <line x1="4" y1="24" x2="44" y2="24" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5" strokeDasharray="3 6" />
        </svg>
      ),
    },
    hackathon: {
      bg: 'linear-gradient(135deg, rgba(30,10,50,0.7), rgba(10,10,10,0.95))',
      accent: 'rgba(34,211,238,0.08)',
      label: 'HACKATHON OPS · 2 YRS',
      lines: false,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.35 }}>
          {/* Terminal/event icon */}
          <rect x="6" y="10" width="36" height="28" rx="3" stroke="rgba(34,211,238,0.7)" strokeWidth="1" fill="none" />
          <line x1="6" y1="18" x2="42" y2="18" stroke="rgba(34,211,238,0.4)" strokeWidth="0.5" />
          <circle cx="12" cy="14" r="1.5" fill="rgba(34,211,238,0.5)" />
          <circle cx="18" cy="14" r="1.5" fill="rgba(255,255,255,0.2)" />
          <circle cx="24" cy="14" r="1.5" fill="rgba(255,255,255,0.2)" />
          <line x1="13" y1="26" x2="26" y2="26" stroke="rgba(34,211,238,0.5)" strokeWidth="1" strokeLinecap="round" />
          <line x1="13" y1="31" x2="22" y2="31" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
    },
  };

  const c = cfg[id] || cfg.hackathon;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'relative',
        height: '280px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: c.bg }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${c.accent} 0%, transparent 70%)` }} />

      {c.lines && (
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={40 + i * 40} x2="100%" y2={40 + i * 40}
              stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" strokeDasharray="4 8" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`v-${i}`} x1={40 + i * 60} y1="0" x2={40 + i * 60} y2="100%"
              stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" strokeDasharray="4 8" />
          ))}
        </svg>
      )}

      {/* Centered icon */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {c.icon}
      </div>

      {/* Gallery hint badge */}
      {onClick && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            border: '1px solid rgba(34,211,238,0.3)',
            padding: '0.4rem 0.85rem',
            borderRadius: '999px',
            background: 'rgba(34,211,238,0.06)',
          }}>
            View Gallery
          </span>
        </motion.div>
      )}

      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
          {c.label}
        </span>
      </div>
    </motion.div>
  );
};

// ─── Individual Experience Row ────────────────────────────────────────────────

function ExperienceRow({ item, index, onGalleryOpen }) {
  const isRight = item.align === 'right';

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
          <ExperienceVisual
            id={item.id}
            onClick={item.media?.length ? () => onGalleryOpen(item) : null}
          />
        </div>

        {/* Content */}
        <div style={{ order: isRight ? 1 : 2 }}>
          <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '1rem' }}>
            EXP {item.number}
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 700,
              fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: 'var(--text-primary)',
              marginBottom: '0.6rem',
              whiteSpace: 'pre-line',
            }}
          >
            {item.title}
          </h3>

          <p style={{
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            color: 'var(--accent)',
            marginBottom: '1.25rem',
            textTransform: 'uppercase',
          }}>
            {item.subtitle}
          </p>

          <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            {item.description}
          </p>

          {/* Highlights */}
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
            {item.highlights.map((h, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.6rem', marginTop: '0.35rem', flexShrink: 0 }}>▸</span>
                {h}
              </li>
            ))}
          </ul>

          {/* Accent tag + gallery trigger */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.3rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                background: 'var(--accent-glow)',
                border: '1px solid rgba(34,211,238,0.18)',
                color: 'var(--accent)',
              }}
            >
              {item.accent}
            </span>

            {item.media?.length > 0 && (
              <button
                onClick={() => onGalleryOpen(item)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
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
      </div>
    </ScrollReveal>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Experience() {
  const [gallery, setGallery] = useState({ open: false, item: null });

  const openGallery = (item) => setGallery({ open: true, item });
  const closeGallery = () => setGallery({ open: false, item: null });

  return (
    <>
      <section
        id="experience"
        className="section-pad"
        style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}
      >
        <div className="container-xl">

          <ScrollReveal>
            <div style={{ marginBottom: '5rem' }}>
              <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Beyond Engineering</span>
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
                Experience &amp; Leadership
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {experience.map((item, i) => (
              <ExperienceRow
                key={item.id}
                item={item}
                index={i}
                onGalleryOpen={openGallery}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Media Gallery Modal */}
      <MediaGallery
        isOpen={gallery.open}
        onClose={closeGallery}
        media={gallery.item?.media || []}
        title={gallery.item?.title?.replace('\n', ' ')}
      />
    </>
  );
}
