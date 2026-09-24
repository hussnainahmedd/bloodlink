/**
 * BloodLink design tokens — warm editorial system.
 *
 * Rules this file enforces:
 * - One accent (crimson), used sparingly: CTAs + urgency only.
 * - Frosted-glass surfaces over a soft ambient wash (see styles/global.css
 *   `.glass` / `.ambient-paper`); hairline-bright edges, restrained blur.
 * - Radii 6–16px by elevation. Type scale is fixed — nothing in between.
 * - Letter-spacing is stored in *pixels* (React Native unit), precomputed per size.
 */

export const colors = {
  /* light surfaces */
  paper: '#FAF9F7',
  paperDeep: '#F1ECE4',
  white: '#FFFFFF',
  skeleton: '#EAE4DA',
  /* ink + text */
  ink: '#1C1917',
  inkSoft: '#44403C',
  muted: '#78716C',
  /* hairlines */
  hairline: '#E7E2DC',
  /* the one accent — CTAs and urgency only */
  crimson: '#C8102E',
  crimsonDeep: '#A00D26', // pressed / hover-darken
  crimsonSoft: '#F9E8EB', // tinted backgrounds on paper
  /* dark sections */
  maroon: '#22090D',
  maroonSoft: '#3A151B', // raised surfaces on maroon
  paperOnDark: '#FAF9F7',
  mutedOnDark: '#A89E93', // secondary text on maroon
  hairlineOnDark: '#40292E', // hairlines on maroon
  /* status */
  leaf: '#166534',
  leafSoft: '#E7F1EA',
  amber: '#B45309',
  amberSoft: '#F7EDDD',
} as const;

export type ColorName = keyof typeof colors;

/**
 * Font family names — must match the keys registered in styles/fonts.ts
 * via expo-font. Weights are separate families (React Native has no
 * font-weight synthesis for custom fonts).
 */
export const fonts = {
  display: 'Fraunces-Regular',
  displayMedium: 'Fraunces-Medium',
  displaySemiBold: 'Fraunces-SemiBold',
  displayBold: 'Fraunces-Bold',
  sans: 'Inter-Regular',
  sansMedium: 'Inter-Medium',
  sansSemiBold: 'Inter-SemiBold',
  sansBold: 'Inter-Bold',
  mono: 'PlexMono-Regular',
  monoMedium: 'PlexMono-Medium',
  monoSemiBold: 'PlexMono-SemiBold',
} as const;

export type FontName = (typeof fonts)[keyof typeof fonts];

/** Fixed type scale — 12 / 14 / 16 / 20 / 24 / 32 / 48 / 64 / 80. Nothing else. */
export const typeScale = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
} as const;

export type TypeScaleName = keyof typeof typeScale;

const em = (size: number, ratio: number) => size * ratio;

/**
 * Canonical text styles. letterSpacing is precomputed to pixels.
 * - Display: tight -0.02em tracking at large sizes.
 * - Eyebrow/labels: mono, uppercase at usage, 0.14em tracking.
 */
export const textStyles = {
  eyebrow: {
    fontFamily: fonts.monoSemiBold,
    fontSize: typeScale.xs,
    lineHeight: typeScale.xs * 1.5,
    letterSpacing: em(typeScale.xs, 0.14),
  },
  displayHero: {
    fontFamily: fonts.displaySemiBold,
    fontSize: typeScale['4xl'],
    lineHeight: typeScale['4xl'] * 1.08,
    letterSpacing: em(typeScale['4xl'], -0.02),
  },
  display: {
    fontFamily: fonts.displaySemiBold,
    fontSize: typeScale['3xl'],
    lineHeight: typeScale['3xl'] * 1.1,
    letterSpacing: em(typeScale['3xl'], -0.02),
  },
  h1: {
    fontFamily: fonts.displaySemiBold,
    fontSize: typeScale['2xl'],
    lineHeight: typeScale['2xl'] * 1.2,
    letterSpacing: em(typeScale['2xl'], -0.015),
  },
  h2: {
    fontFamily: fonts.displaySemiBold,
    fontSize: typeScale.xl,
    lineHeight: typeScale.xl * 1.25,
    letterSpacing: em(typeScale.xl, -0.01),
  },
  h3: {
    fontFamily: fonts.sansSemiBold,
    fontSize: typeScale.lg,
    lineHeight: typeScale.lg * 1.3,
    letterSpacing: 0,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: typeScale.base,
    lineHeight: typeScale.base * 1.6,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: fonts.sans,
    fontSize: typeScale.sm,
    lineHeight: typeScale.sm * 1.55,
    letterSpacing: 0,
  },
  caption: {
    fontFamily: fonts.sans,
    fontSize: typeScale.xs,
    lineHeight: typeScale.xs * 1.5,
    letterSpacing: 0,
  },
  stat: {
    fontFamily: fonts.monoSemiBold,
    fontSize: typeScale['2xl'],
    lineHeight: typeScale['2xl'] * 1.2,
    letterSpacing: 0,
  },
} as const;

export type TextStyleName = keyof typeof textStyles;

/** 4pt grid. */
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  24: 96,
  32: 128,
} as const;

/** Small radii — 6px default, 8px for larger cards. */
export const radii = {
  sm: 6,
  md: 8,
  lg: 12,
  full: 9999,
} as const;

/**
 * Hairline borders replace shadows across the system. One very subtle
 * shadow is provided for floating layers (modal, dropdown) only.
 */
export const hairline = { borderWidth: 1, borderColor: colors.hairline } as const;

export const shadows = {
  none: {},
  float: {
    shadowColor: '#1C1917',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
} as const;
