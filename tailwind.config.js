/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        health: '#ef4444',
        having: '#fbbf24',
        loving: '#22c55e',
        being: '#3b82f6',
      }
    },
  },
  plugins: [],
}
