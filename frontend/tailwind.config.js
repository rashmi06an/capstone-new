/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f0ff',
        'silver': '#c0c0c0',
      },
      backgroundImage: {
        'glass': 'rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

