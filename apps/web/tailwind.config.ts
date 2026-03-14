import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ntina Brand — African-first palette
        terracotta: {
          DEFAULT: '#C4633A',
          light: '#E8885A',
          dark: '#9C4A28',
        },
        forest: {
          DEFAULT: '#2D5A27',
          light: '#4A8A42',
          dark: '#1A3A16',
        },
        gold: {
          DEFAULT: '#D4A017',
          light: '#F0C030',
          dark: '#A07810',
        },
        cream: '#FAF7F2',
      },
      fontFamily: {
        // Large, legible sans-serif — readable on low-quality screens
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Bump base sizes for readability
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
      },
    },
  },
  plugins: [],
}

export default config
