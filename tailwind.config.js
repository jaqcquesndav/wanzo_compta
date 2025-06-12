/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)', // Fixed: Added closing parenthesis
          dark: 'var(--color-primary-dark)',
        },
        interactive: 'var(--color-interactive)',
        success: {
          DEFAULT: 'var(--color-success)',
          hover: 'var(--color-success-hover)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          hover: 'var(--color-warning-hover)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          hover: 'var(--color-destructive-hover)',
        },
        "text-primary": 'var(--text-primary)',
        "text-secondary": 'var(--text-secondary)',
        "text-tertiary": 'var(--text-tertiary)',
        "text-interactive": 'var(--text-interactive)',
        "text-on-primary": 'var(--text-on-primary)',
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--bg-tertiary)',
        hover: 'var(--bg-hover)',
        'sidebar-light': 'var(--bg-sidebar-light)', // Added for light mode sidebar
      },
      borderColor: {
        primary: 'var(--border-primary)',
        secondary: 'var(--border-secondary)',
      },
      ringColor: {
        primary: 'var(--color-primary)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        destructive: 'var(--color-destructive)',
      },
      ringOffsetColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
      },
      placeholderColor: {
        primary: 'var(--text-tertiary)',
      }
    },
  },
  plugins: [],
};