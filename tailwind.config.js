/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'threat-red': '#dc2626',
        'warning-yellow': '#eab308',
        'safe-green': '#16a34a',
        'military-blue': '#1e40af',
        'dark-panel': '#1a1a1a',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
