import type { Config } from "tailwindcss";

export default {
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "xs" : '420px'
      },
      aspectRatio: {
        'portada' : '1/1.6'
      },
      colors: {
        primary: "var(--primary)",
        primaryContainer: "var(--primary-container)",
        onPrimary: "var(--on-primary)",
        onPrimaryContainer: "var(--on-primary-container)",

        secondary: "var(--secondary)",
        onSecondary : "var(--on-secondary)",
        secondaryContainer: "var(--secondary-container)",
        onSecondaryContainer: "var(--on-secondary-container)",

        surface : "var(--surface)",
        surfaceVariant : "var(--surface-variant)",
        background: "var(--background)",
      },
    },
  },
  plugins: [],
} satisfies Config;
