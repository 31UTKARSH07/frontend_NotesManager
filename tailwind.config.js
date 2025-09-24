// tailwind.config.js

// 1. Import your plugins at the top using the 'import' syntax
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default { // 2. Use 'export default' instead of 'module.exports'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Make sure these paths are correct for your project!
  ],
  theme: {
    extend: {
        // Your theme extensions go here
    },
  },

  // 3. Use the imported variables in the plugins array
  plugins: [
    typography,
    daisyui, 
  ],

  // Your daisyUI config (if you have one)
  daisyui: {
    themes: ["light"], // or your preferred themes
  },
};