'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { createContext, useContext } from 'react';

const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: '0px 0px -200px' };

export function FadeIn({
  key = 'default',
  ...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & { key?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    <motion.div
      key={key}
      variants={{
        hidden: { opacity: 0, y: Boolean(shouldReduceMotion) ? 0 : 24 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport
          })}
      {...props}
    />
  );
}

export function FadeInStagger({
  faster = false,
  key = 'default',
  ...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & {
  faster?: boolean;
  type?: string;
  key?: string;
}) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        key={key}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  );
}
