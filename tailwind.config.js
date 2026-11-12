/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        // Semantic Theme Tokens (Dynamic CSS variables)
        theme: {
          bg: 'var(--bg-page)',
          surface: 'var(--surface-primary)',
          'surface-subtle': 'var(--surface-secondary)',
          hover: 'var(--surface-hover)',
          text: 'var(--text-primary)',
          muted: 'var(--text-secondary)',
          accent: 'var(--accent-primary)',
          'accent-warm': 'var(--accent-secondary)',
          border: 'var(--border-color)',
          'btn-bg': 'var(--btn-bg)',
          'btn-text': 'var(--btn-text)',
        },
        // Exact Light Theme Tokens
        ivory: {
          DEFAULT: '#F5F2EB',
          page: '#F5F2EB',
          surface: '#FFFDF9',
          subtle: '#E7E1D6',
          hover: '#EEE9DF',
          border: '#D8D1C5',
          text: '#252722',
          muted: '#68675F',
        },
        // Exact Dark Theme Tokens
        charcoal: {
          DEFAULT: '#252722',
          page: '#1C1D19',
          surface: '#252620',
          subtle: '#303129',
          hover: '#36372E',
          border: '#414239',
          text: '#F5F2EB',
          muted: '#C0BFB3',
        },
        // Exact Accent Tokens
        olive: {
          DEFAULT: '#777C62',
          light: '#ADB293',
          dark: '#5C604B',
          subtle: 'rgba(119, 124, 98, 0.12)',
          subtleDark: 'rgba(173, 178, 147, 0.15)',
        },
        bronze: {
          DEFAULT: '#8C7258',
          light: '#C1A17F',
          subtle: 'rgba(140, 114, 88, 0.12)',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      }
    },
  },
  plugins: [],
}
