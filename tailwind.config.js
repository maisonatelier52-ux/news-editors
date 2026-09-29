/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
      brand: {
        DEFAULT: '#0F3D91',
        dark: '#082A66',
        light: '#2A5DB0',
      },
        ink: {
          DEFAULT: '#1a1a1a',
          light: '#4a4a4a',
          muted: '#767676',
        },
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'Times', 'serif'],
        display: ['Georgia', 'Times New Roman', 'Times', 'serif'],
      },
      maxWidth: {
        'container': '1320px',
      },
    },
  },
  plugins: [],
};
