/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

// Custom color with css variable color in __theme_color.scss
function customColors(cssVar) {
  return `var(${cssVar})`;
}

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    container: {
      // center: true,
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        Pretendard: ["var(--font-Pretendard)", ...defaultTheme.fontFamily.sans],
        OptimaLTStd: ["var(--font-OptimaLTStd)", ...defaultTheme.fontFamily.sans],
        Raleway: ["var(--font-Raleway)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          100: customColors("--c-primary-100"),
          200: customColors("--c-primary-200"),
          300: customColors("--c-primary-300"),
          400: customColors("--c-primary-400"),
          500: customColors("--c-primary-500"),
          600: customColors("--c-primary-600"),
          700: customColors("--c-primary-700"),
          800: customColors("--c-primary-800"),
          900: customColors("--c-primary-900"),
        },
        secondaryNavy: {
          100: customColors("--c-secondary-navy-100"),
          200: customColors("--c-secondary-navy-200"),
          300: customColors("--c-secondary-navy-300"),
          400: customColors("--c-secondary-navy-400"),
          500: customColors("--c-secondary-navy-500"),
          600: customColors("--c-secondary-navy-600"),
          700: customColors("--c-secondary-navy-700"),
          800: customColors("--c-secondary-navy-800"),
          900: customColors("--c-secondary-navy-900"),
        },
        secondaryBlue: {
          100: customColors("--c-secondary-blue-100"),
          200: customColors("--c-secondary-blue-200"),
          300: customColors("--c-secondary-blue-300"),
          400: customColors("--c-secondary-blue-400"),
          500: customColors("--c-secondary-blue-500"),
          600: customColors("--c-secondary-blue-600"),
          700: customColors("--c-secondary-blue-700"),
          800: customColors("--c-secondary-blue-800"),
          900: customColors("--c-secondary-blue-900"),
        },
        warmGray: {
          100: customColors("--c-warm-gray-100"),
          200: customColors("--c-warm-gray-200"),
          300: customColors("--c-warm-gray-300"),
          400: customColors("--c-warm-gray-400"),
          500: customColors("--c-warm-gray-500"),
          600: customColors("--c-warm-gray-600"),
          700: customColors("--c-warm-gray-700"),
          800: customColors("--c-warm-gray-800"),
          900: customColors("--c-warm-gray-900"),
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
