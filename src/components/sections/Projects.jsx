import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '../../data/portfolio';
import ScrollReveal from '../ui/ScrollReveal';
import MediaGallery from '../ui/MediaGallery';

// Abstract visual placeholders per project
const ProjectVisual = ({ id }) => {
  const visuals = {
    mangrove: (
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* Satellite-inspired grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(6,78,59,0.4) 0%, rgba(5,46,22,0.6) 50%, rgba(10,10,10,0.8) 100%)',
        }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }}>
          {Array.from({ length: 12 }).map((_, r) =>
            Array.from({ length: 16 }).map((_, c) => (
              <rect
                key={`${r}-${c}`}
                x={c * 40} y={r * 40}
                width={38} height={38}
                fill={Math.random() > 0.5 ? 'rgba(34,197,94,0.4)' : 'rgba(21,128,61,0.2)'}
                rx={2}
              />
            ))
          )}
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(34,211,238,0.7)', textTransform: 'uppercase' }}>
            Sentinel-2 · CNN Segmentation
          </span>
        </div>
      </div>
    ),
    jetbot: (
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(30,27,75,0.6) 0%, rgba(15,23,42,0.8) 100%)',
        }} />
        {/* Neural-ish lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <circle cx={60 + i * 70} cy={80} r={4} fill="rgba(34,211,238,0.8)" />
              <circle cx={30 + i * 70} cy={180} r={4} fill="rgba(34,211,238,0.5)" />
              <circle cx={60 + i * 70} cy={280} r={4} fill="rgba(34,211,238,0.8)" />
              <line x1={60 + i * 70} y1={80} x2={30 + i * 70} y2={180} stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
              <line x1={30 + i * 70} y1={180} x2={60 + i * 70} y2={280} stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
            </g>
          ))}
        </svg>
        {/* Detection box */}
        <div style={{
          position: 'absolute',
          top: '30%', left: '30%', right: '30%', bottom: '30%',
          border: '1px solid rgba(34,211,238,0.5)',
          borderRadius: '4px',
        }}>
          <div style={{ position: 'absolute', top: '-0.6rem', left: '0.5rem', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(34,211,238,0.8)', background: 'var(--bg-primary)', padding: '0 0.25rem' }}>
            OBJECT DETECTED
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(34,211,238,0.7)', textTransform: 'uppercase' }}>
            Edge Inference · &lt;50ms
          </span>
        </div>
      </div>
    ),
    taskmanager: (
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', padding: '1.5rem' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(10,10,10,0.9) 100%)',
        }} />
        {/* Minimal code-like lines */}
        <div style={{ position: 'relative', fontFamily: 'monospace', fontSize: '0.72rem', lineHeight: 2 }}>
          {['GET    /api/tasks', 'POST   /api/auth/login', 'PUT    /api/tasks/:id', 'DELETE /api/tasks/:id', 'GET    /api/user/profile'].map((line, i) => (
            <div key={i} style={{ color: i === 0 ? 'rgba(34,211,238,0.8)' : 'rgba(255,255,255,0.25)', display: 'flex', gap: '1rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.1)' }}>{String(i + 1).padStart(2, '0')}</span>
              <span>{line}</span>
              <span style={{ marginLeft: 'auto', color: i === 0 ? 'rgba(34,197,94,0.7)' : 'rgba(255,255,255,0.15)' }}>200</span>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(34,211,238,0.7)', textTransform: 'uppercase' }}>
            REST · JWT · Spring Boot
          </span>
        </div>
      </div>
    ),
  };
  return visuals[id] || null;
};

export default function Projects() {
  const [gallery, setGallery] = useState({ open: false, project: null });
  const openGallery = (project) => setGallery({ open: true, project });
  const closeGallery = () => setGallery({ open: false, project: null });

  return (
    <>
      <section id="projects" className="section-pad" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
        <div className="container-xl">

          {/* Header */}
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '5rem' }}>
              <div>
                <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Featured Projects</span>
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
                  Engineering Case Studies
                </h2>
              </div>
              <p style={{ maxWidth: '320px', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Selected work across AI research, edge computing and scalable backend systems.
              </p>
            </div>
          </ScrollReveal>

          {/* Projects */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onGalleryOpen={openGallery} />
            ))}
          </div>
        </div>
      </section>

      <MediaGallery
        isOpen={gallery.open}
        onClose={closeGallery}
        media={gallery.project?.media || []}
        title={gallery.project?.title}
      />
    </>
  );
}

function ProjectCard({ project, index, onGalleryOpen }) {
  const isRight = project.align === 'right';

  return (
    <ScrollReveal delay={0.05 * index}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '0',
          borderTop: '1px solid var(--border)',
          paddingTop: '3.5rem',
          paddingBottom: '3.5rem',
        }}
      >
        {/* Visual */}
        <div style={{ order: isRight ? 2 : 1 }}>
          <motion.div
            whileHover={{ scale: 1.012 }}
            transition={{ duration: 0.3 }}
            onClick={() => project.media?.length && onGalleryOpen(project)}
            style={{
              height: '320px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              position: 'relative',
              cursor: project.media?.length ? 'pointer' : 'default',
            }}
          >
            <ProjectVisual id={project.id} />
            {/* Gallery overlay hint */}
            {project.media?.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.45)',
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
          </motion.div>
        </div>

        {/* Content */}
        <div
          style={{
            order: isRight ? 1 : 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isRight ? '0 3rem 0 0' : '0 0 0 3rem',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              color: 'var(--accent)',
              marginBottom: '1rem',
            }}
          >
            {project.number}
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              color: 'var(--accent)',
              marginBottom: '1.25rem',
              textTransform: 'uppercase',
            }}
          >
            {project.subtitle}
          </p>
          <p
            style={{
              fontSize: '0.92rem',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              marginBottom: '2rem',
            }}
          >
            {project.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tech.map(t => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
