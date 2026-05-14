import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { personal, stats } from '../../data/portfolio';
import ScrollReveal from '../ui/ScrollReveal';
import GlowCard from '../ui/GlowCard';

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(target);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(num);
    };
    requestAnimationFrame(step);
  }, [inView, num]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="section-pad" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
      <div className="container-xl">

        {/* Label */}
        <ScrollReveal>
          <span className="label" style={{ display: 'block', marginBottom: '4rem' }}>About</span>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Left — Philosophy */}
          <div>
            <ScrollReveal delay={0.1}>
              <h2
                style={{
                  fontFamily: 'var(--font-head)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                }}
              >
                Engineering at the intersection of intelligence and systems.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: 'var(--text-muted)',
                  maxWidth: '480px',
                }}
              >
                {personal.philosophy}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div style={{ marginTop: '2.5rem' }}>
                <div className="divider" style={{ marginBottom: '1.5rem' }} />
                <p style={{ fontSize: '0.78rem', letterSpacing: '0.12em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Current Focus
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                  Deep Learning · Remote Sensing · Edge AI · Scalable Systems
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Stats */}
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1px',
                background: 'var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              {stats.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={0.1 + i * 0.05}>
                  <div
                    style={{
                      background: 'var(--surface)',
                      padding: '2rem 1.5rem',
                      transition: 'background 0.2s',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-head)',
                        fontWeight: 800,
                        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                        letterSpacing: '-0.03em',
                        color: 'var(--accent)',
                        lineHeight: 1,
                        marginBottom: '0.5rem',
                      }}
                    >
                      <Counter
                        target={stat.value.replace(/\D/g, '') || '0'}
                        suffix={stat.value.replace(/\d/g, '')}
                      />
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                      {stat.label}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
