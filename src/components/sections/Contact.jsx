import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal } from '../../data/portfolio';
import ScrollReveal from '../ui/ScrollReveal';
import MagneticButton from '../ui/MagneticButton';
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
  IconDownload,
  IconSend,
  IconCheck,
  IconAlertCircle,
  IconLoader2,
} from '@tabler/icons-react';

// ─── Social / contact links ───────────────────────────────────────────────────
const socialLinks = [
  { icon: IconMail,          label: 'Email',    href: `mailto:${personal.email}`, download: null },
  { icon: IconBrandLinkedin, label: 'LinkedIn', href: personal.linkedin,          download: null },
  { icon: IconBrandGithub,   label: 'GitHub',   href: personal.github,            download: null },
  { icon: IconDownload,      label: 'Resume',   href: personal.resume,            download: personal.resumeFilename },
];

// ─── Form status type: 'idle' | 'sending' | 'success' | 'error' ──────────────
const IDLE    = 'idle';
const SENDING = 'sending';
const SUCCESS = 'success';
const ERROR   = 'error';

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(IDLE);
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(SENDING);
    setErrMsg('');

    try {
      const res = await fetch(personal.formspree, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus(SUCCESS);
        setForm({ name: '', email: '', message: '' });
        // Reset to idle after 5 s so the form can be used again
        setTimeout(() => setStatus(IDLE), 5000);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrMsg(data?.errors?.[0]?.message || 'Something went wrong. Please try again.');
        setStatus(ERROR);
        setTimeout(() => setStatus(IDLE), 5000);
      }
    } catch {
      setErrMsg('Network error. Please check your connection and try again.');
      setStatus(ERROR);
      setTimeout(() => setStatus(IDLE), 5000);
    }
  };

  // ─── Shared input style ──────────────────────────────────────────────────
  const inputStyle = {
    width: '100%',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '0.875rem 1rem',
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    fontSize: '0.72rem',
    letterSpacing: '0.12em',
    color: 'var(--text-dim)',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '0.5rem',
  };

  const isBusy = status === SENDING;

  return (
    <section
      id="contact"
      className="section-pad"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container-xl">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '5rem',
            alignItems: 'start',
          }}
        >
          {/* ── Left: CTA + social links ── */}
          <div>
            <ScrollReveal>
              <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>
                Get In Touch
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-head)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                }}
              >
                Interested in AI systems, research collaboration or scalable engineering?
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                  color: 'var(--text-muted)',
                  marginBottom: '3rem',
                }}
              >
                Open to research collaborations, engineering roles and technical partnerships.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {socialLinks.map(({ icon: Icon, label, href, download }) => (
                  <MagneticButton key={label} strength={0.15}>
                    <a
                      href={href}
                      target={download ? undefined : '_blank'}
                      rel={download ? undefined : 'noopener noreferrer'}
                      download={download || undefined}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.875rem 1rem',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '0.85rem',
                        transition: 'border-color 0.2s, background 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--accent)';
                        e.currentTarget.style.background   = 'var(--accent-dim)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.background   = 'var(--surface)';
                      }}
                    >
                      <Icon size={16} stroke={1.5} color="var(--accent)" />
                      {label}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right: Formspree form ── */}
          <ScrollReveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {/* Name */}
              <div>
                <label htmlFor="contact-name" style={labelStyle}>Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  disabled={isBusy}
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  style={{ ...inputStyle, opacity: isBusy ? 0.6 : 1 }}
                  onFocus={e  => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e   => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" style={labelStyle}>Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  disabled={isBusy}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  style={{ ...inputStyle, opacity: isBusy ? 0.6 : 1 }}
                  onFocus={e  => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e   => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" style={labelStyle}>Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  disabled={isBusy}
                  placeholder="Tell me about your project or collaboration idea..."
                  value={form.message}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: '130px',
                    opacity: isBusy ? 0.6 : 1,
                  }}
                  onFocus={e  => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e   => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              {/* ── Status feedback banner ── */}
              <AnimatePresence mode="wait">
                {status === SUCCESS && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.75rem 1rem',
                      background: 'rgba(34,197,94,0.08)',
                      border: '1px solid rgba(34,197,94,0.25)',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      color: '#4ADE80',
                    }}
                  >
                    <IconCheck size={16} stroke={2} />
                    Message sent — I'll get back to you soon.
                  </motion.div>
                )}

                {status === ERROR && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      padding: '0.75rem 1rem',
                      background: 'rgba(239,68,68,0.07)',
                      border: '1px solid rgba(239,68,68,0.22)',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      color: '#F87171',
                    }}
                  >
                    <IconAlertCircle size={16} stroke={1.5} style={{ flexShrink: 0, marginTop: '1px' }} />
                    {errMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Submit button ── */}
              <MagneticButton strength={0.2}>
                <motion.button
                  type="submit"
                  disabled={isBusy || status === SUCCESS}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    opacity: isBusy ? 0.75 : 1,
                    cursor: isBusy ? 'not-allowed' : 'pointer',
                  }}
                  whileTap={isBusy ? {} : { scale: 0.97 }}
                >
                  <AnimatePresence mode="wait">
                    {status === SENDING && (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'flex' }}
                        >
                          <IconLoader2 size={15} stroke={2} />
                        </motion.span>
                        Sending…
                      </motion.span>
                    )}

                    {status === SUCCESS && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <IconCheck size={15} stroke={2} />
                        Sent!
                      </motion.span>
                    )}

                    {(status === IDLE || status === ERROR) && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        Send Message
                        <IconSend size={15} stroke={1.5} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </MagneticButton>

              {/* Formspree attribution hint (only in dev) */}
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-dim)',
                  textAlign: 'center',
                  letterSpacing: '0.04em',
                }}
              >
                Powered by Formspree · Your data is never shared.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
