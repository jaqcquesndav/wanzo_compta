/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#197ca8',
          hover: '#1e90c3',
          dark: '#146690',
        },
        success: {
          DEFAULT: '#015730',
          hover: '#014526',
        },
        warning: {
          DEFAULT: '#ee872b',
          hover: '#e67816',
        },
      },
      backgroundColor: {
        dark: {
          primary: '#1a1a1a',
          secondary: '#2d2d2d',
          hover: '#3d3d3d'
        }
      },
      textColor: {
        dark: {
          primary: '#ffffff',
          secondary: '#a3a3a3'
        }
      },
      borderColor: {
        dark: {
          DEFAULT: '#404040',
          hover: '#525252'
        }
      }
    },
  },
  plugins: [],
};