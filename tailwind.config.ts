import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#0A0E27",
        surface: "#0D1233",
        border: "#1A2050",
        primary: "#4FACFE",
        secondary: "#6C63FF",
        accent: "#00F2FE",
        text: "#FFFFFF",
        muted: "#8892B0",
        foreground: "#FAFAFA",
        card: "#0F1535",
        "card-hover": "#141B42",
        destructive: "#FF4757",
        success: "#2ED573",
        warning: "#FFA502",
        info: "#4FACFE",
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
        xl: "16px",
        "2xl": "24px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-xl": ["72px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["60px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-sm": ["36px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-xs": ["30px", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        glow: "0 0 40px rgba(79, 172, 254, 0.15)",
        "glow-strong": "0 0 60px rgba(79, 172, 254, 0.25)",
        "glow-secondary": "0 0 40px rgba(108, 99, 255, 0.15)",
        card: "0 0 0 1px rgba(79, 172, 254, 0.03), 0 2px 4px rgba(0,0,0,0.2)",
        "card-hover": "0 0 0 1px rgba(79, 172, 254, 0.15), 0 8px 32px rgba(0,0,0,0.4)",
        premium: "0 0 0 1px rgba(79, 172, 254, 0.08), 0 20px 60px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #4FACFE 0%, #6C63FF 50%, #00F2FE 100%)",
        "gradient-card": "linear-gradient(180deg, rgba(79, 172, 254, 0.03) 0%, rgba(79, 172, 254, 0) 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(79, 172, 254, 0.05) 0%, rgba(108, 99, 255, 0.02) 100%)",
        "gradient-cyber": "linear-gradient(135deg, #4FACFE 0%, #6C63FF 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "spin-slow": "spin 8s linear infinite",
        gradient: "gradient 3s ease infinite",
        shimmer: "shimmer 2s linear infinite",
        "grid-move": "gridMove 20s linear infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        gridMove: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-50px, -50px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
