import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          100: '#50B2C0',
          200: '#255D6A',
          300: '#0A313C',
        },

        purple: {
          100: '#8381D9',
          200: '#2A2879',
        },

        gray: {
          100: '#F8F9FC',
          200: '#E6E8F2',
          300: '#D1D6E4',
          400: '#8D95AF',
          500: '#303F73',
          600: '#252D4A',
          700: '#181C2A',
          800: '#0E1116',
        },
      },
      lineHeight: {
        short: '140%',
        base: '160%',
      },
      fontFamily: {
        nunito: 'var(--font-nunito)',
      },
      backgroundImage: {
        'image-login': 'url("./assets/image-login.png")',
        sidebar: 'url("./assets/bg-sidebar.png")',
      },
      height: {
        'height-sidebar': 'calc(100%-40px)',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
}
export default config
