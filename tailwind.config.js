// const plugin = require('tailwindcss/plugin')
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        main: "var(--main)",
        background: "var(--background)",
        header: "var(--header)",
        accent: "var(--accent)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "fade-out": {
          "0%, 100%": { transform: "opacity 0" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "fade-out": "fade 1s ease-out",
      },
      transitionDuration: {
        0: "0ms",
        1000: "1000ms",
        2000: "2000ms",
        3000: "3000ms",
      },
    },

    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontSize: {
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    fontWeight: {
      "extra-light": 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      "extra-bold": 800,
      black: 900,
    },
    padding: {
      tiny: ".25rem",
      base: ".5rem",
      md: ".75rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    // https://www.tailwindshades.com/#color=42B983&step-up=10&step-down=10&name=ocean&overrides=e30%3D
    colors: {
      ...colors,
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: {
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
      },
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      purple: {
        100: "#faf5ff",
        200: "#e9d8fd",
        300: "#d6bcfa",
        400: "#b794f4",
        500: "#9f7aea",
        600: "#805ad5",
        700: "#6b46c1",
        800: "#553c9a",
        900: "#44337a",
      },
      eunry: {
        DEFAULT: "#CBA3A3",
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FFFFFF",
        300: "#F0E4E4",
        400: "#DDC4C4",
        500: "#CBA3A3",
        600: "#B98282",
        700: "#A66262",
        800: "#884D4D",
        900: "#673A3A",
      },
      "medium-purple": {
        DEFAULT: "#9F7AEA",
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FEFEFF",
        300: "#DFD2F8",
        400: "#BFA6F1",
        500: "#9F7AEA",
        600: "#7F4EE3",
        700: "#6023DB",
        800: "#4C1CAF",
        900: "#391583",
      },
      pink: {
        100: "#fff5f7",
        200: "#fed7e2",
        300: "#fbb6ce",
        400: "#f687b3",
        500: "#ed64a6",
        600: "#d53f8c",
        700: "#b83280",
        800: "#97266d",
        900: "#702459",
      },
      ocean: {
        DEFAULT: "#42B983",
        50: "#E9F7F1",
        100: "#D6F1E5",
        200: "#B1E3CC",
        300: "#8BD6B4",
        400: "#66C89C",
        500: "#42B983",
        600: "#359368",
        700: "#276E4E",
        800: "#1A4833",
        900: "#0C2319",
      },
      orange: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
      },
      brown: {
        50: "#fdf8f6",
        100: "#f2e8e5",
        200: "#eaddd7",
        300: "#e0cec7",
        400: "#d2bab0",
        500: "#bfa094",
        600: "#a18072",
        700: "#977669",
        800: "#846358",
        900: "#43302b",
      },
      gray: {
        300: "#455",
        500: "#333",
        900: "#1d1f20",
      },
      slate: {
        50: "#F8FAFC",
        100: "#F1F5F9",
        200: "#E2E8F0",
        300: "#CBD5E1",
        400: "#94A3B8",
        500: "#64748B",
        600: "#475569",
        700: "#334155",
        800: "#1E293B",
        900: "#0F172A",
      },

      arctic: {
        100: "#eef5fc",
        200: "#ddebf8",
        300: "#cce0f5",
        400: "#bbd6f1",
        500: "#aaccee",
        600: "#88a3be",
        700: "#667a8f",
        800: "#44525f",
        900: "#222930",
      },
      regal: {
        100: "#d3d8de",
        200: "#a7b1bd",
        300: "#7c8a9c",
        400: "#50637b",
        500: "#243c5a",
        600: "#1d3048",
        700: "#162436",
        800: "#0e1824",
        900: "#070c12",
      },
      // SUSHI
      "chestnut-rose": {
        50: "#fcf7f7",
        100: "#faefef",
        200: "#f2d7d7",
        300: "#ebbebe",
        400: "#db8e8e",
        500: "#cc5d5d",
        600: "#b85454",
        700: "#994646",
        800: "#7a3838",
        900: "#642e2e",
      },

      geraldine: {
        50: "#fff9f9",
        100: "#fef3f2",
        200: "#fde1e0",
        300: "#fbcfcd",
        400: "#f9aba7",
        500: "#f68781",
        600: "#dd7a74",
        700: "#b96561",
        800: "#94514d",
        900: "#79423f",
      },

      pippin: {
        50: "#fffefe",
        100: "#fffcfc",
        200: "#fff8f8",
        300: "#fff3f3",
        400: "#ffeaea",
        500: "#ffe1e1",
        600: "#e6cbcb",
        700: "#bfa9a9",
        800: "#998787",
        900: "#7d6e6e",
      },

      gossip: {
        50: "#fcfefa",
        100: "#f9fcf5",
        200: "#f0f8e6",
        300: "#e7f4d7",
        400: "#d4ebba",
        500: "#c2e39c",
        600: "#afcc8c",
        700: "#92aa75",
        800: "#74885e",
        900: "#5f6f4c",
      },

      avocado: {
        50: "#fafaf7",
        100: "#f5f4ef",
        200: "#e6e5d8",
        300: "#d7d5c0",
        400: "#b8b590",
        500: "#9a9561",
        600: "#8b8657",
        700: "#747049",
        800: "#5c593a",
        900: "#4b4930",
      },

      /*Hydra Theme*/
      "cocoa-bean": {
        50: "#f6f4f4",
        100: "#ece8e9",
        200: "#d0c6c8",
        300: "#b4a4a6",
        400: "#7c5f64",
        500: "#441B21",
        600: "#3d181e",
        700: "#331419",
        800: "#291014",
        900: "#210d10",
      },
      sunglo: {
        50: "#fff8f8",
        100: "#fef1f1",
        200: "#fddbdc",
        300: "#fcc5c7",
        400: "#f99a9d",
        500: "#F76F73",
        600: "#de6468",
        700: "#b95356",
        800: "#944345",
        900: "#793638",
      },
      crimson: {
        50: "#fdf4f5",
        100: "#fbe9eb",
        200: "#f5c8cd",
        300: "#efa7af",
        400: "#e26574",
        500: "#D62338",
        600: "#c12032",
        700: "#a11a2a",
        800: "#801522",
        900: "#69111b",
      },
      "mexican-red": {
        50: "#fbf4f4",
        100: "#f6e8e9",
        200: "#e9c6c8",
        300: "#dca3a7",
        400: "#c15f65",
        500: "#A71A23",
        600: "#961720",
        700: "#7d141a",
        800: "#641015",
        900: "#520d11",
      },
      "fuzzy-wuzzy-brown": {
        50: "#fbf6f7",
        100: "#f8eeef",
        200: "#edd4d7",
        300: "#e1bbbe",
        400: "#cb878e",
        500: "#B5545D",
        600: "#a34c54",
        700: "#883f46",
        800: "#6d3238",
        900: "#59292e",
      },
      "turkish-rose": {
        50: "#fcf8f9",
        100: "#f9f1f2",
        200: "#f0dbe0",
        300: "#e7c5cd",
        400: "#d49aa7",
        500: "#C26F81",
        600: "#af6474",
        700: "#925361",
        800: "#74434d",
        900: "#5f363f",
      },
      prim: {
        50: "#fffefe",
        100: "#fefcfd",
        200: "#fdf9fb",
        300: "#fbf5f9",
        400: "#f9edf4",
        500: "#F6E5EF",
        600: "#ddced7",
        700: "#b9acb3",
        800: "#94898f",
        900: "#797075",
      },
      "wild-blue-yonder": {
        50: "#f9f9fc",
        100: "#f3f3f9",
        200: "#e0e2f0",
        300: "#cdd1e7",
        400: "#a8aed4",
        500: "#828BC2",
        600: "#757daf",
        700: "#626892",
        800: "#4e5374",
        900: "#40445f",
      },
      scampi: {
        50: "#f6f7fb",
        100: "#eef0f7",
        200: "#d4d8ec",
        300: "#bbc1e0",
        400: "#8793c8",
        500: "#5464B1",
        600: "#4c5a9f",
        700: "#3f4b85",
        800: "#323c6a",
        900: "#293157",
      },
      astronaut: {
        50: "#f4f5f8",
        100: "#eaebf1",
        200: "#c9cddd",
        300: "#a9afc9",
        400: "#6972a0",
        500: "#283677",
        600: "#24316b",
        700: "#1e2959",
        800: "#182047",
        900: "#141a3a",
      },
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    spacing: {
      px: "1px",
      0: "0",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem",
      128: "32rem",
      144: "36rem",
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none",
    },
  },
  variants: {
    extend: {
      rotate: ["active", "group-hover"],
      borderColor: ["focus-visible"],
      opacity: ["disabled"],
    },
  },
  plugins: [
    // https://github.com/vueform/slider
    // require("@vueform/slider/tailwind"), // not needed for tpot at the time of this writing
    // plugin(function ({ addBase, theme }) {
    //   addBase({
    //     h1: { fontSize: theme('fontSize.2xl') },
    //     h2: { fontSize: theme('fontSize.xl') },
    //     h3: { fontSize: theme('fontSize.lg') },
    //     h4: { fontSize: theme('fontSize.md') },
    //     h5: { fontSize: theme('fontSize.sm') },
    //     h6: { fontSize: theme('fontSize.xs') }
    //   })
    // })
  ],
};