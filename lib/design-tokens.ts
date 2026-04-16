/**
 * CoreWin Design Tokens
 * Single source of truth for all spacing, radius, shadow, and color decisions.
 * Import from here — never hardcode values in components.
 */

// ─── Spacing ─────────────────────────────────────────────────────────────────
export const space = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
  section: 80,   // vertical rhythm between page sections
} as const;

// ─── Border Radius ───────────────────────────────────────────────────────────
export const radius = {
  sm:  6,    // badges, pills, small chips
  md:  12,   // buttons, inputs, card inner elements
  lg:  20,   // cards, panels, large containers
  full: 9999 // fully rounded (pills, toggles)
} as const;

// ─── Glow / Shadow ───────────────────────────────────────────────────────────
export const glow = {
  /** Subtle — card borders, tag highlights */
  xs:   'rgba(0,212,255,0.06)',
  sm:   'rgba(0,212,255,0.10)',
  md:   'rgba(0,212,255,0.15)',  // standard glow
  lg:   'rgba(0,212,255,0.25)',
  xl:   'rgba(0,212,255,0.35)',
  /** Pre-built box-shadow strings for direct use */
  card:      '0 0 20px rgba(0,212,255,0.08)',
  cardHover: '0 8px 32px rgba(0,212,255,0.15), inset 0 0 20px rgba(0,212,255,0.04)',
  ctaHover:  '0 8px 24px rgba(0,212,255,0.30)',
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────
export const font = {
  display: 'var(--font-display)',
  body:    'var(--font-body)',
  mono:    'var(--font-mono)',
} as const;

export const text = {
  eyebrow:  { fontSize: 12, letterSpacing: '0.08em' as const },
  label:    { fontSize: 13, letterSpacing: '0.06em' as const },
  subhead:  { fontSize: 'clamp(20px, 2.5vw, 24px)' },
  body:     { fontSize: 16, lineHeight: 1.7 },
  caption:  { fontSize: 13, lineHeight: 1.6 },
} as const;

// ─── Grid ───────────────────────────────────────────────────────────────────
export const grid = {
  /** Card grids — 3+ columns */
  card:   { minmax: '300px', gap: space.lg },
  /** Tight card grids — labels, small items */
  tight:  { minmax: '240px', gap: space.md },
  /** Wide two-column layout — About, Contact */
  wide:   { minmax: '320px', gap: space.xxl },
  /** Single-column detail */
  detail: { minmax: '280px', gap: space.section },
} as const;

// ─── Transitions ─────────────────────────────────────────────────────────────
export const transition = {
  fast:   '0.15s ease',
  normal: '0.25s ease',
  slow:   '0.4s ease',
} as const;
