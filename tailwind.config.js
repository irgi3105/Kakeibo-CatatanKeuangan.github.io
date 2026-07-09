/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        washi: '#EFE8DA',
        'washi-dark': '#E4DBC8',
        sumi: '#2B2622',
        hanko: '#B23A2E',
        ai: '#3C5A73',
        moss: '#6B7A5E',
        kraft: '#C9BFA8',
      },
      fontFamily: {
        display: ['"Shippori Mincho"', 'serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
