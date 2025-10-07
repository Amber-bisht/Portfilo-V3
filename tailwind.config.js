/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'minecraft-green': '#4CAF50',
        'minecraft-emerald': '#00E676',
        'minecraft-wood': '#8D6E63',
        'minecraft-dirt': '#795548',
        'minecraft-water': '#2196F3',
        'minecraft-redstone': '#F44336',
      },
    },
  },
  plugins: [],
}
