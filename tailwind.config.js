/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16243a',
        midnight: '#0b1220',
        canvas: '#f4f7fb',
        brand: {
          50: '#ecfdf8',
          100: '#d1faed',
          200: '#a7f3db',
          300: '#6ee7c3',
          400: '#36d4aa',
          500: '#13b98f',
          600: '#089474',
          700: '#08765f',
          800: '#0b5e4e',
          900: '#0a4e42',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Avenir Next', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -18px rgba(15, 23, 42, 0.22)',
        card: '0 1px 2px rgba(15, 23, 42, 0.03), 0 8px 24px -16px rgba(15, 23, 42, 0.2)',
      },
    },
  },
  plugins: [],
}
