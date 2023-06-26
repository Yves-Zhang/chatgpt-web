const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'false',
  content: [
    './index.html',
    './**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'custom-background': `url(${path.resolve(__dirname, 'images/bg.png')})`,
      },
      colors: {
        boderColor: '#e5e7eb', // 自定义颜色代码
        blue: '#32bead',
        ['blue-500']: 'rgba(50,190,173,.8)'
      },
      animation: {
        blink: 'blink 1.2s infinite steps(1, start)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { 'background-color': 'currentColor' },
          '50%': { 'background-color': 'transparent' },
        },
      },
    },
  },
  plugins: [],
}
