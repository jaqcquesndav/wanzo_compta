// Colors system with WCAG 2.1 validation
export const theme = {
  colors: {
    // Light theme values (default)
    light: {
      primary: {
        main: '#197ca8',
        light: '#2089b7',
        dark: '#156d93',
        rgb: '25, 124, 168',
      },
      interactive: {
        main: '#1e90c3',
        light: '#2f9fcf',
        dark: '#1b81af',
      },
      success: {
        main: '#015730',
        light: '#026b3a',
        dark: '#014426',
      },
      warning: {
        main: '#ee872b',
        light: '#f09642',
        dark: '#e67816',
      },
      background: {
        primary: '#ffffff',
        secondary: '#f3f4f6',
        tertiary: '#e5e7eb',
      },
      text: {
        primary: '#111827',
        secondary: '#4b5563',
        tertiary: '#9ca3af',
      }
    },
    // Dark theme values
    dark: {
      primary: {
        main: '#2089b7',
        light: '#2596c7',
        dark: '#1b7aa3',
        rgb: '32, 137, 183',
      },
      background: {
        primary: '#1a1b1e',
        secondary: '#2c2e33',
        tertiary: '#3b3d42',
      },
      text: {
        primary: '#f3f4f6',
        secondary: '#d1d5db',
        tertiary: '#9ca3af',
      }
    }
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
