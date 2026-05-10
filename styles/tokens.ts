/**
 * ⚡ Noxfolio Enterprise Design Tokens
 *
 * Centralized source of truth for all design values to ensure
 * 100% visual consistency across the platform.
 */

export const TOKENS = {
  colors: {
    primary: 'hsl(var(--primary))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    card: 'hsl(var(--card))',
    accent: 'hsl(var(--accent))',
    destructive: 'hsl(var(--destructive))',
    success: '#10b981', // Emerald-500
    warning: '#f59e0b', // Amber-500
  },
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  shadows: {
    soft: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    premium:
      '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glow: '0 0 20px 0px hsla(var(--primary), 0.1)',
  },
  animation: {
    durations: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easings: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
  typography: {
    fonts: {
      sans: 'Inter, sans-serif',
      heading: 'Outfit, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    weights: {
      normal: '400',
      medium: '500',
      bold: '700',
      black: '900',
    },
  },
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    popover: 50,
    toast: 60,
  },
};
