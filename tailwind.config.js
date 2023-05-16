/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'DSxl': '1930px'
    },
    extend: {
      fontSize: {
        sm12: "12px",
      },
      colors: {
        primary: "#02967D",
        secondary: "#0E7563",
        backgroundPrimary: "#D8F4F2",
        backgroundSecondary: "#0E7563",
        backgroundGray: "#e4e6eb",
        backgroundHeart: "#fd213b",
        colorIcon: "#8c939d",
        colorIconMenu: "#2c2d32",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: [
      {
        dark: {
          "base-100": "#242526",
          "base-200": "#18191a",
          "base-300": "#f9fafb",
          info: "#E4E6EB",
          hoverColor: "#3a3b3c",
        },
      },
      {
        light: {
          "base-100": "#FFFFFF",
          "base-200": "#f1f5f9",
          "base-300": "#27272a",
          info: "#333333",
          hoverColor: "#f2f2f2",
        },
      },
    ],
  },
}
