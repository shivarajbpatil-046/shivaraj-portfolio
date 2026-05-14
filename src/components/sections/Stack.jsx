import { stack } from '../../data/portfolio';
import ScrollReveal from '../ui/ScrollReveal';
import GlowCard from '../ui/GlowCard';

export default function Stack() {
  return (
    <section id="stack" className="section-pad" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
      <div className="container-xl">

        <ScrollReveal>
          <div style={{ marginBottom: '5rem' }}>
            <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Engineering Stack</span>
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
              Tools &amp; Technologies
            </h2>
          </div>
        </ScrollReveal>

        {/* Terminal-inspired header */}
        <ScrollReveal delay={0.1}>
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px 12px 0 0',
              padding: '0.75rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,95,86,0.6)' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,189,46,0.6)' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(40,200,64,0.6)' }} />
            <span style={{ marginLeft: '0.75rem', fontFamily: 'monospace', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              ~/shivaraj/stack — Engineering Systems
            </span>
          </div>
        </ScrollReveal>

        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderTop: 'none',
            borderRadius: '0 0 12px 12px',
            padding: '2rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
            }}
          >
            {stack.map((category, i) => (
              <ScrollReveal key={category.category} delay={0.06 * i}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '0.75rem' }}>$</span>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.72rem',
                        letterSpacing: '0.12em',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {category.category}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {category.items.map(item => (
                      <span key={item} className="pill">{item}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
