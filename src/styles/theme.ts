export const theme = {
  colors: {
    primary: '#197ca8',    // Main blue for primary actions
    primaryHover: '#1e90c3', // Bright blue for hover states
    success: '#015730',    // Dark green for confirmations
    warning: '#ee872b',    // Vibrant orange for alerts
    // Additional semantic colors
    background: '#f8fafc',
    surface: '#ffffff',
    text: {
      primary: '#1a2b3c',
      secondary: '#64748b',
      inverse: '#ffffff'
    },
    border: '#e2e8f0'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }
} as const;

export type Theme = typeof theme;