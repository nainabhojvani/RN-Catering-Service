/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out both',
        'gradient-x': 'gradient-x 3s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'gradient-x': {  // ✅ add this
          '0%': { 'background-position': '0% 0%' },
          '100%': { 'background-position': '100% 0%' },
        },
      },
    },
  },
  plugins: [],
};
