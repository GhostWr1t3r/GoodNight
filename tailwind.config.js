/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Changed this line
  ],
  theme: {
    extend: {
      colors: {
        'zinc-750': '#2C2C30',
        background: 'rgb(12, 12, 13)',
        'background-light': '#f6f8fd',
      },
      scale: {
        '98': '0.98',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '0.5rem',
        lg: '1rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
