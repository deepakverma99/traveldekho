/**
 * Design Tokens - Luminous Explorer System
 * Extracted directly from DESIGN.md
 *
 * Provides typed color tokens with both camelCase and kebab-case access,
 * along with structured semantic groupings.
 */

// Flat design color definitions as defined in DESIGN.md
export const colorTokens = {
  // Surfaces & Backgrounds
  surface: '#f9f9fc',
  surfaceDim: '#d9dadc',
  surfaceBright: '#f9f9fc',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f3f6',
  surfaceContainer: '#eeeef0',
  surfaceContainerHigh: '#e8e8ea',
  surfaceContainerHighest: '#e2e2e5',
  surfaceVariant: '#e2e2e5',
  surfacePure: '#FFFFFF',
  surfaceSubtle: '#F8F9FA',
  surfaceMuted: '#F1F3F5',
  surfaceBorder: '#E5E7EB',
  surfaceTint: '#b02f00',
  background: '#f9f9fc',
  onBackground: '#1a1c1e',
  onSurface: '#1a1c1e',
  onSurfaceVariant: '#5b4039',
  inverseSurface: '#2f3133',
  inverseOnSurface: '#f0f0f3',

  // Outlines & Borders
  outline: '#907067',
  outlineVariant: '#e4beb4',
  borderHover: '#D1D5DB',

  // Primary System (Solar / Terracotta)
  primary: '#b02f00',
  onPrimary: '#ffffff',
  primaryContainer: '#ff5722',
  onPrimaryContainer: '#541200',
  inversePrimary: '#ffb5a0',
  primaryFixed: '#ffdbd1',
  primaryFixedDim: '#ffb5a0',
  onPrimaryFixed: '#3b0900',
  onPrimaryFixedVariant: '#862200',

  // Secondary System (Warm Amber / Ochre)
  secondary: '#9d4300',
  onSecondary: '#ffffff',
  secondaryContainer: '#fd761a',
  onSecondaryContainer: '#5c2400',
  secondaryFixed: '#ffdbca',
  secondaryFixedDim: '#ffb690',
  onSecondaryFixed: '#341100',
  onSecondaryFixedVariant: '#783200',

  // Tertiary System (Ocean Deep Blue)
  tertiary: '#006398',
  onTertiary: '#ffffff',
  tertiaryContainer: '#3298dc',
  onTertiaryContainer: '#002d47',
  tertiaryFixed: '#cce5ff',
  tertiaryFixedDim: '#93ccff',
  onTertiaryFixed: '#001d31',
  onTertiaryFixedVariant: '#004b73',

  // Error & Feedback System
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  // Editorial Slate Text Hierarchy
  textPrimary: '#1E2022',
  textSecondary: '#4B5563',
  textTertiary: '#9CA3AF',
  textContrastAlt: '#2D3134',

  // Energy Accents & Badges
  accentWarmTint: '#FFF1EE',
  accentHover: '#E64A19',
  badgeMatch: '#059669',
  solarOrange: '#F97316',

  // Kebab-case aliases for 1:1 parity with DESIGN.md YAML keys
  'surface-dim': '#d9dadc',
  'surface-bright': '#f9f9fc',
  'surface-container-lowest': '#ffffff',
  'surface-container-low': '#f3f3f6',
  'surface-container': '#eeeef0',
  'surface-container-high': '#e8e8ea',
  'surface-container-highest': '#e2e2e5',
  'on-surface': '#1a1c1e',
  'on-surface-variant': '#5b4039',
  'inverse-surface': '#2f3133',
  'inverse-on-surface': '#f0f0f3',
  'outline-variant': '#e4beb4',
  'surface-tint': '#b02f00',
  'on-primary': '#ffffff',
  'primary-container': '#ff5722',
  'on-primary-container': '#541200',
  'inverse-primary': '#ffb5a0',
  'on-secondary': '#ffffff',
  'secondary-container': '#fd761a',
  'on-secondary-container': '#5c2400',
  'on-tertiary': '#ffffff',
  'tertiary-container': '#3298dc',
  'on-tertiary-container': '#002d47',
  'on-error': '#ffffff',
  'error-container': '#ffdad6',
  'on-error-container': '#93000a',
  'primary-fixed': '#ffdbd1',
  'primary-fixed-dim': '#ffb5a0',
  'on-primary-fixed': '#3b0900',
  'on-primary-fixed-variant': '#862200',
  'secondary-fixed': '#ffdbca',
  'secondary-fixed-dim': '#ffb690',
  'on-secondary-fixed': '#341100',
  'on-secondary-fixed-variant': '#783200',
  'tertiary-fixed': '#cce5ff',
  'tertiary-fixed-dim': '#93ccff',
  'on-tertiary-fixed': '#001d31',
  'on-tertiary-fixed-variant': '#004b73',
  'on-background': '#1a1c1e',
  'surface-variant': '#e2e2e5',
  'surface-pure': '#FFFFFF',
  'surface-subtle': '#F8F9FA',
  'surface-muted': '#F1F3F5',
  'surface-border': '#E5E7EB',
  'text-primary': '#1E2022',
  'text-secondary': '#4B5563',
  'text-tertiary': '#9CA3AF',
  'accent-warm-tint': '#FFF1EE',
  'accent-hover': '#E64A19',
  'badge-match': '#059669',
} as const;

// Structured semantic groups for architectural clarity and SOLID design
export const semanticColors = {
  surface: {
    base: colorTokens.surface,
    dim: colorTokens.surfaceDim,
    bright: colorTokens.surfaceBright,
    pure: colorTokens.surfacePure,
    subtle: colorTokens.surfaceSubtle,
    muted: colorTokens.surfaceMuted,
    border: colorTokens.surfaceBorder,
    tint: colorTokens.surfaceTint,
    variant: colorTokens.surfaceVariant,
    containers: {
      lowest: colorTokens.surfaceContainerLowest,
      low: colorTokens.surfaceContainerLow,
      default: colorTokens.surfaceContainer,
      high: colorTokens.surfaceContainerHigh,
      highest: colorTokens.surfaceContainerHighest,
    },
    on: {
      default: colorTokens.onSurface,
      variant: colorTokens.onSurfaceVariant,
    },
    inverse: {
      surface: colorTokens.inverseSurface,
      onSurface: colorTokens.inverseOnSurface,
    },
  },
  primary: {
    main: colorTokens.primary,
    on: colorTokens.onPrimary,
    container: colorTokens.primaryContainer,
    onContainer: colorTokens.onPrimaryContainer,
    inverse: colorTokens.inversePrimary,
    fixed: {
      default: colorTokens.primaryFixed,
      dim: colorTokens.primaryFixedDim,
      on: colorTokens.onPrimaryFixed,
      onVariant: colorTokens.onPrimaryFixedVariant,
    },
  },
  secondary: {
    main: colorTokens.secondary,
    on: colorTokens.onSecondary,
    container: colorTokens.secondaryContainer,
    onContainer: colorTokens.onSecondaryContainer,
    fixed: {
      default: colorTokens.secondaryFixed,
      dim: colorTokens.secondaryFixedDim,
      on: colorTokens.onSecondaryFixed,
      onVariant: colorTokens.onSecondaryFixedVariant,
    },
  },
  tertiary: {
    main: colorTokens.tertiary,
    on: colorTokens.onTertiary,
    container: colorTokens.tertiaryContainer,
    onContainer: colorTokens.onTertiaryContainer,
    fixed: {
      default: colorTokens.tertiaryFixed,
      dim: colorTokens.tertiaryFixedDim,
      on: colorTokens.onTertiaryFixed,
      onVariant: colorTokens.onTertiaryFixedVariant,
    },
  },
  text: {
    primary: colorTokens.textPrimary,
    secondary: colorTokens.textSecondary,
    tertiary: colorTokens.textTertiary,
    contrastAlt: colorTokens.textContrastAlt,
  },
  border: {
    default: colorTokens.surfaceBorder,
    outline: colorTokens.outline,
    outlineVariant: colorTokens.outlineVariant,
    hover: colorTokens.borderHover,
  },
  feedback: {
    error: colorTokens.error,
    onError: colorTokens.onError,
    errorContainer: colorTokens.errorContainer,
    onErrorContainer: colorTokens.onErrorContainer,
    badgeMatch: colorTokens.badgeMatch,
  },
  accent: {
    warmTint: colorTokens.accentWarmTint,
    hover: colorTokens.accentHover,
    solarOrange: colorTokens.solarOrange,
    badgeMatch: colorTokens.badgeMatch,
  },
} as const;

// Main theme tokens bundle
export const tokens = {
  colors: colorTokens,
  semantic: semanticColors,
} as const;

export type ColorTokenKey = keyof typeof colorTokens;
export type ColorTokenValue = (typeof colorTokens)[ColorTokenKey];
export type ColorTokens = typeof colorTokens;
export type SemanticColors = typeof semanticColors;
export type ThemeTokens = typeof tokens;

export default tokens;
