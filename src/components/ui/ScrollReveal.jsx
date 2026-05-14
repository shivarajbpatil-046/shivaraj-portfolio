import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const defaultVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  variants,
  once = true,
  threshold = 0.15,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  const v = variants || defaultVariants;
  const animated = {
    ...v,
    visible: {
      ...v.visible,
      transition: {
        ...(v.visible?.transition || {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={animated}
      className={className}
    >
      {children}
    </motion.div>
  );
}
