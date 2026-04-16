/**
 * Centralized animation constants to ensure consistent
 * entrance animations across all sections.
 *
 * Usage:
 *   import { fadeUp, fadeLeft, fadeRight } from '@/lib/animations';
 *
 *   <motion.div
 *     initial={fadeLeft.initial}
 *     animate={fadeLeft.animate}
 *     transition={fadeLeft.transition}
 *   />
 */

export const TRANSITION_BASE = {
  ease: 'easeOut' as const,
};

/** Fade up — default for most section children */
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ...TRANSITION_BASE },
};

/** Fade in place — for elements already positioned */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, ...TRANSITION_BASE },
};

/** Slide in from left — left-aligned content */
export const fadeLeft = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay: 0.1, ...TRANSITION_BASE },
};

/** Slide in from right — right-aligned content */
export const fadeRight = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay: 0.1, ...TRANSITION_BASE },
};

/** Section header — slightly slower, centered */
export const fadeUpCenter = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ...TRANSITION_BASE },
};

/** Staggered card — inherits parent delay via index multiplication */
export const staggerCard = (index: number, baseDelay = 0.1) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: baseDelay + index * 0.1, ...TRANSITION_BASE },
});
