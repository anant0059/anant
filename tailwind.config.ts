import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
        'grid-pattern-dense': `linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
      },
    },
  },
  plugins: [],
} satisfies Config;
