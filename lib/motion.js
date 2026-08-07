/**
 * Centralized Motion (Framer Motion) presets for BoxKart.
 * Import these instead of defining transitions/variants inline.
 *
 * Respects reduced-motion via CSS. Motion durations are defined here
 * so every component uses consistent timing.
 */

/* ── Duration Tokens ── */

export const duration = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  slower: 0.6,
};

/* ── Easing Tokens ── */

export const ease = {
  default: [0.25, 0.1, 0.25, 1],
  in: [0.4, 0, 1, 1],
  out: [0, 0, 0.2, 1],
  inOut: [0.4, 0, 0.2, 1],
  spring: { type: 'spring', damping: 25, stiffness: 300 },
  springBouncy: { type: 'spring', damping: 20, stiffness: 250 },
  springStiff: { type: 'spring', damping: 30, stiffness: 400 },
};

/* ── Reusable Variants ── */

/** Fade in from below — good for section entrances. */
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

/** Simple opacity fade — subtle, non-intrusive. */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal },
  },
};

/** Scale up from slightly smaller — good for modals, cards. */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: ease.out },
  },
};

/** Slide in from left — good for drawers. */
export const slideInLeft = {
  hidden: { x: '-100%' },
  visible: { x: 0, transition: ease.spring },
  exit: { x: '-100%', transition: { duration: duration.normal } },
};

/** Slide in from right — good for cart drawer, mobile menu. */
export const slideInRight = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: ease.spring },
  exit: { x: '100%', transition: { duration: duration.normal } },
};

/** Slide down — good for dropdowns, search overlays. */
export const slideDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.fast },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: duration.fast },
  },
};

/** Drawer overlay backdrop. */
export const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.normal } },
  exit: { opacity: 0, transition: { duration: duration.fast } },
};

/** Modal entrance with scale + fade. */
export const modal = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: duration.normal, ease: ease.out },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: duration.fast },
  },
};

/**
 * Stagger children — wrap parent with this variant,
 * and each child with fadeUp or fadeIn.
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

/** Stagger child — pair with staggerContainer on parent. */
export const staggerChild = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: ease.out },
  },
};

/* ── Transition Shorthands ── */

/** Standard transition for whileInView sections. */
export const sectionTransition = {
  duration: duration.slow,
  ease: ease.out,
};

/** Quick feedback transition for interactive elements. */
export const interactionTransition = {
  duration: duration.fast,
  ease: ease.out,
};

/* ── Hover / Tap Presets ── */

/** Subtle scale on hover + shrink on tap — for buttons and cards. */
export const hoverTap = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

/** InView trigger config — fire once, with small margin. */
export const inViewConfig = {
  once: true,
  margin: '-50px',
};
