import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isYouTube(src) {
  return src && (src.includes('youtube.com') || src.includes('youtu.be'));
}

function getYouTubeEmbed(src) {
  const match = src.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : src;
}

// ─── Individual Media Renderer ────────────────────────────────────────────────

function MediaItem({ item }) {
  if (!item) return null;

  if (item.type === 'video') {
    if (isYouTube(item.src)) {
      return (
        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '10px', overflow: 'hidden', background: '#000' }}>
          <iframe
            src={getYouTubeEmbed(item.src)}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="autoplay; fullscreen"
            allowFullScreen
            title={item.caption || 'Video'}
          />
        </div>
      );
    }
    return (
      <video
        src={item.src}
        controls
        autoPlay
        style={{
          maxWidth: '100%',
          maxHeight: '70vh',
          borderRadius: '10px',
          outline: 'none',
          background: '#000',
        }}
      />
    );
  }

  // Image
  return (
    <img
      src={item.src}
      alt={item.caption || ''}
      loading="lazy"
      style={{
        maxWidth: '100%',
        maxHeight: '70vh',
        objectFit: 'contain',
        borderRadius: '10px',
        display: 'block',
      }}
      onError={(e) => {
        // Gracefully replace broken images with a styled placeholder
        e.target.style.display = 'none';
        e.target.parentNode.setAttribute('data-empty', 'true');
      }}
    />
  );
}

// ─── Placeholder for missing images ──────────────────────────────────────────

function MediaPlaceholder({ caption }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '640px',
        aspectRatio: '16/9',
        borderRadius: '10px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        color: 'var(--text-dim)',
      }}
    >
      {/* Simple camera icon via SVG */}
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
      <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textAlign: 'center', padding: '0 1rem' }}>
        {caption || 'Media coming soon'}
      </span>
    </div>
  );
}

// ─── Main MediaGallery Component ──────────────────────────────────────────────

/**
 * MediaGallery — reusable fullscreen cinematic modal
 *
 * Props:
 *   media  — array of { type: 'image'|'video', src, caption }
 *   isOpen — boolean
 *   onClose — () => void
 *   title  — optional string shown in header
 */
export default function MediaGallery({ media = [], isOpen, onClose, title }) {
  const [index, setIndex] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const total = media.length;
  const current = media[index];

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setIndex(0);
      setImgError(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset image error when index changes
  useEffect(() => { setImgError(false); }, [index]);

  const prev = useCallback(() => {
    setIndex(i => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setIndex(i => (i + 1) % total);
  }, [total]);

  // Keyboard nav
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose, prev, next]);

  // Touch swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const delta = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    setTouchStart(null);
  };

  if (total === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gallery-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5000,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          {/* Inner panel — stops click propagation */}
          <motion.div
            key="gallery-panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              width: '100%',
              maxWidth: '900px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                {title && (
                  <p style={{
                    fontFamily: 'var(--font-head)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                  }}>
                    {title}
                  </p>
                )}
                {total > 1 && (
                  <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                    {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close gallery"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.2s, border-color 0.2s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <IconX size={18} stroke={1.5} />
              </button>
            </div>

            {/* Media + Navigation */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              {/* Prev */}
              {total > 1 && (
                <button
                  onClick={prev}
                  aria-label="Previous"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    flexShrink: 0,
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <IconChevronLeft size={18} stroke={1.5} />
                </button>
              )}

              {/* Media */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '300px',
                  }}
                >
                  {imgError ? (
                    <MediaPlaceholder caption={current?.caption} />
                  ) : (
                    <div
                      style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
                      ref={el => {
                        if (el) {
                          const obs = new MutationObserver(() => {
                            if (el.getAttribute('data-empty') === 'true') setImgError(true);
                          });
                          obs.observe(el, { attributes: true });
                        }
                      }}
                    >
                      <MediaItem item={current} />
                    </div>
                  )}

                  {/* Caption */}
                  {current?.caption && !imgError && (
                    <p style={{
                      marginTop: '0.875rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      textAlign: 'center',
                      lineHeight: 1.6,
                      maxWidth: '600px',
                    }}>
                      {current.caption}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Next */}
              {total > 1 && (
                <button
                  onClick={next}
                  aria-label="Next"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    flexShrink: 0,
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <IconChevronRight size={18} stroke={1.5} />
                </button>
              )}
            </div>

            {/* Dot indicators */}
            {total > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                {media.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    style={{
                      width: i === index ? '20px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: i === index ? 'var(--accent)' : 'var(--border-md)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'width 0.3s ease, background 0.3s ease',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Keyboard hint */}
            <p style={{ textAlign: 'center', fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
              ESC to close{total > 1 ? ' · ← → to navigate' : ''}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
