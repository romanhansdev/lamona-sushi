import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        lamona: {
          black: '#050505',
          ink: '#101014',
          card: '#1C1C1F',
          slate: '#2A2D36',
          orange: '#D75126',
          orangeDark: '#A83F1E',
          bone: '#F1ECE7',
          muted: '#AFA8A1',
          salmon: '#D4A992'
        }
      },
      boxShadow: {
        glow: '0 18px 60px rgba(215, 81, 38, 0.24)'
      }
    }
  },
  plugins: []
};

export default config;
