import { publication } from '../../data/portfolio';
import ScrollReveal from '../ui/ScrollReveal';
import { IconExternalLink, IconFileText } from '@tabler/icons-react';

export default function Publications() {
  return (
    <section id="publications" className="section-pad" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
      <div className="container-xl">

        <ScrollReveal>
          <div style={{ marginBottom: '4rem' }}>
            <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Research Output</span>
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
              Publication
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '3rem',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '2.5rem',
              alignItems: 'start',
              maxWidth: '860px',
              transition: 'border-color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-md)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            {/* Icon */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                background: 'var(--accent-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IconFileText size={22} color="var(--accent)" stroke={1.5} />
            </div>

            {/* Content */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span className="pill" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-dim)' }}>
                  {publication.type}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
                  {publication.year}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-head)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                }}
              >
                {publication.title}
              </h3>

              <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '2rem' }}>
                {publication.abstract}
              </p>

              <a
                href={publication.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ width: 'fit-content', fontSize: '0.78rem' }}
              >
                <IconExternalLink size={14} stroke={1.5} />
                View DOI
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
