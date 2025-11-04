
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'class'
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        code: ['source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      },
      screens: {
        'xxs': '320px',
        'xs': '475px',
        'sm': '640px',
        'only-sm': { 'raw': '(min-width: 640px) and (max-width: 767px)' },
        'md': '768px',
        'nav-break': '942px', // Custom breakpoint for navigation
        'only-md': { 'raw': '(min-width: 768px) and (max-width: 1023px)' },
        'lg': '1024px',
        'only-lg': { 'raw': '(min-width: 1024px) and (max-width: 1279px)' },
        'xl': '1280px',
        'only-xl': { 'raw': '(min-width: 1280px) and (max-width: 1535px)' },
        '2xl': '1536px',
        'only-2xl': { 'raw': '(min-width: 1536px) and (max-width: 1919px)' },
        '3xl': '1920px',
        'short': { 'raw': '(max-height: 575px)' },
      },
    },
  },
  plugins: [],
};
