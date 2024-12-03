'use client';

import { G } from '@mobily/ts-belt';
import { motion, useReducedMotion } from 'framer-motion';
import { type ComponentPropsWithoutRef, createContext, useContext } from 'react';

const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: '0px 0px -2px' };

export function FadeIn({
  key = 'default',
  ...props
}: ComponentPropsWithoutRef<typeof motion.div> & { key?: string; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    <motion.div
      key={key}
      variants={{
        hidden: {
          opacity: 0,
          y: G.isNotNullable(shouldReduceMotion) && shouldReduceMotion ? 0 : 24
        },
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
}: ComponentPropsWithoutRef<typeof motion.div> & {
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
