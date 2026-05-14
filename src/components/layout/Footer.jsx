export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem 0',
      }}
    >
      <div
        className="container-xl"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-head)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.05em',
            color: 'var(--text-primary)',
          }}
        >
          SHIVARAJ B PATIL
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.05em',
          }}
        >
          © {year} — All rights reserved
        </span>
        <span
          style={{
            fontSize: '0.72rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.03em',
          }}
        >
          Designed & Built with precision
        </span>
      </div>
    </footer>
  );
}
