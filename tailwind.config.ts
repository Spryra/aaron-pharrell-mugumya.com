import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': '#FFFFFF',
        'light-surface': '#F8FAFC',
        'light-text': '#0F172A',
        'light-text-secondary': '#475569',
        'light-accent': '#2563EB',
        'light-accent-secondary': '#D97706',
        'light-border': '#E2E8F0',
        
        'dark-bg': '#0A0F1E',
        'dark-surface': '#111827',
        'dark-text': '#F1F5F9',
        'dark-text-secondary': '#94A3B8',
        'dark-accent': '#3B82F6',
        'dark-accent-secondary': '#F59E0B',
        'dark-border': '#1F2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      fontSize: {
        xs: 'clamp(0.75rem, 2vw, 0.875rem)',
        sm: 'clamp(0.875rem, 2.5vw, 1rem)',
        base: 'clamp(1rem, 2.5vw, 1.125rem)',
        lg: 'clamp(1.125rem, 3vw, 1.25rem)',
        xl: 'clamp(1.25rem, 3.5vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 4vw, 2rem)',
        '3xl': 'clamp(1.875rem, 5vw, 2.25rem)',
        '4xl': 'clamp(2.25rem, 6vw, 3rem)',
        '5xl': 'clamp(3rem, 8vw, 3.75rem)',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/container-queries')],
}

export default config
