import { motion, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const dotX = useSpring(0, { damping: 40, stiffness: 500 });
  const dotY = useSpring(0, { damping: 40, stiffness: 500 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      setVisible(true);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseleave', leave);
    };
  }, [x, y, dotX, dotY]);

  // hide on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        style={{ x, y, opacity: visible ? 1 : 0 }}
        animate={{ scale: clicking ? 0.7 : 1 }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] mix-blend-difference"
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '1px solid rgba(255,255,255,0.5)',
            borderRadius: '50%',
          }}
        />
      </motion.div>
      <motion.div
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[9998]"
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--accent)',
            borderRadius: '50%',
          }}
        />
      </motion.div>
    </>
  );
}
