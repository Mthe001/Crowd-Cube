// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/daisyui/dist/**/*.js',
  ],
  darkMode: 'class',  // Enable class-based dark mode
  plugins: [require('daisyui')],
};
