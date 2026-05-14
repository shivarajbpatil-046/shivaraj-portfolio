import { leadership } from '../../data/portfolio';
import ScrollReveal from '../ui/ScrollReveal';

const highlights = [
  {
    label: 'Role',
    value: 'Student Head',
    detail: 'GIS Research Center — led research operations, student projects and technical direction.',
  },
  {
    label: 'Teaching',
    value: '40+ Hours',
    detail: 'Conducted technical sessions on AI, IoT and GIS for students across engineering disciplines.',
  },
  {
    label: 'Workshops',
    value: '3+',
    detail: 'Organized and led practical workshops on deep learning, embedded systems and satellite data.',
  },
  {
    label: 'Research',
    value: 'Published',
    detail: 'Contributed peer-reviewed research in AI applications — automotive intelligence review.',
  },
];

export default function Research() {
  return (
    <section id="research" className="section-pad" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
      <div className="container-xl">

        <ScrollReveal>
          <div style={{ marginBottom: '5rem' }}>
            <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Leadership & Research</span>
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
              Beyond Engineering
            </h2>
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '4rem',
          }}
        >
          {highlights.map((h, i) => (
            <ScrollReveal key={h.label} delay={0.08 * i}>
              <div
                style={{
                  background: 'var(--surface)',
                  padding: '2.5rem 2rem',
                  height: '100%',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
              >
                <p style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  {h.label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    letterSpacing: '-0.02em',
                    color: 'var(--accent)',
                    marginBottom: '1rem',
                    lineHeight: 1.1,
                  }}
                >
                  {h.value}
                </p>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                  {h.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Philosophy quote */}
        <ScrollReveal delay={0.2}>
          <div
            style={{
              padding: '3rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-head)',
                fontWeight: 600,
                fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                maxWidth: '700px',
                margin: '0 auto',
              }}
            >
              "The goal is not to build systems — it is to build systems that understand."
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '1.5rem', letterSpacing: '0.05em' }}>
              — Engineering Philosophy
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
