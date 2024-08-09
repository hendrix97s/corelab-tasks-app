import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        shark: {
          "50": "#f4f6f7",
          "100": "#e2e7eb",
          "200": "#c9d2d8",
          "300": "#a3b2bd",
          "400": "#768a9a",
          "500": "#5b6f7f",
          "600": "#4e5d6c",
          "700": "#444e5a",
          "800": "#3d444d",
          "900": "#30353c",
          "950": "#21252b",
        },
        "electric-violet": {
          "50": "#f9f4ff",
          "100": "#f1e6ff",
          "200": "#e5d2ff",
          "300": "#d2afff",
          "400": "#b67cff",
          "500": "#9a4aff",
          "600": "#903df7",
          "700": "#7017d9",
          "800": "#6018b1",
          "900": "#50158e",
          "950": "#34016a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
