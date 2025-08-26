/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "gradient-x": "gradient-x 15s ease-in-out infinite",
        fadeIn: "fadeIn 1.2s ease-out forwards",  // 🌟 new fade in
        slowZoom: "slowZoom 8s ease-in-out forwards",
        fadeSlideUp: "fadeSlideUp 1.2s ease-out forwards",
        fadeSlideOut: "fadeSlideOut 1.2s ease-in forwards", 
        waveFloat: "waveFloat 6s ease-in-out infinite",     
      },
      keyframes: {
        "gradient-x": {
          "0%": { "background-position": "0% 0%" },
          "100%": { "background-position": "100% 0%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        fadeSlideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeSlideOut: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-20px)" },
        },
        waveFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      colors: {
        primary: "#d9e45a",   // yellow-green
        darkGreen: "#19522f",
        greenDeep: "#306344",
        greenMuted: "#759782",
        greenLight: "#d1dcd5",
        cream: "#fef8e0",
        whiteCream: "#fffdf3",
        whitePure: "#ffffff",
      },
    },
  },
  plugins: [],
};
