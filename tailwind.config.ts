// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    // ✨ GANTI SEMUA BARIS CONTENT DENGAN SATU BARIS INI
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // ... sisa tema Anda ...
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;