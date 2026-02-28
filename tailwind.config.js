/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx","./app/_layout.jsx","./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // This makes 'font-sans' the default for your app
        sans: ["Inter-Regular", "sans-serif"],
        semibold: ["Inter-SemiBold", "sans-serif"],
        bold: ["Inter-Bold", "sans-serif"],
        heading: ["Barlow-Condensed"],
        body: ["Poppins"],
      },
      colors:{
        primary: "with-opacity(--color-primary)",
        secondary: "with-opacity(--color-secondary)",
        surface: "with-opacity(--color-surface)",
        background: "with-opacity(--color-background)",
        accent: "with-opacity(--color-accent)",
      }
    },
  },
  plugins: [],
}