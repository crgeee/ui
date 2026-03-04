export const colors = {
  background: '#09090b',
  surface: {
    DEFAULT: 'rgba(24, 24, 27, 0.6)',
    hover: 'rgba(39, 39, 42, 0.4)',
  },
  border: {
    DEFAULT: '#27272a',
    subtle: 'rgba(39, 39, 42, 0.6)',
  },
  text: {
    primary: '#f4f4f5',
    secondary: '#a1a1aa',
    muted: '#71717a',
    faint: '#52525b',
  },
  accent: {
    amber: '#f59e0b',
    amberLight: '#fbbf24',
    amberFaint: 'rgba(245, 158, 11, 0.15)',
  },
  status: {
    success: '#4ade80',
    warning: '#f59e0b',
    error: '#f87171',
    info: '#60a5fa',
  },
} as const;
