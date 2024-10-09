/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'opacity-20': 'rgba(var(--tw-bg-opacity), 0.2)',
        'opacity-40': 'rgba(var(--tw-bg-opacity), 0.4)',
        'opacity-60': 'rgba(var(--tw-bg-opacity), 0.6)',
        'opacity-80': 'rgba(var(--tw-bg-opacity), 0.8)',
      }
    },
  },
  plugins: [],
}