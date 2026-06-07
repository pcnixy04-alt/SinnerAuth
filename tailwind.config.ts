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
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        background: "#050505",
        surface: "#0A0A0A",
        card: "#101010",
        border: "#1A1A1A",
        primary: "#00E5FF",
        cyan: "#00FFFF",
        secondary: "#6E56CF",
        accent: "#FF2D55",
        success: "#00FF88",
        warning: "#F59E0B",
        danger: "#EF4444",
        white: "#FFFFFF",
        muted: "#A1A1AA",
        gray: "#71717A",
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
        heading: ["Inter Tight", "system-ui", "sans-serif"],
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
        glow: "0 0 10px rgba(0,229,255,.2), 0 0 30px rgba(0,229,255,.15), 0 0 60px rgba(0,229,255,.1)",
        "glow-strong": "0 0 20px rgba(0,229,255,.3), 0 0 40px rgba(0,229,255,.2), 0 0 80px rgba(0,229,255,.1)",
        "glow-secondary": "0 0 10px rgba(110,86,207,.2), 0 0 30px rgba(110,86,207,.15), 0 0 60px rgba(110,86,207,.1)",
        "glow-accent": "0 0 10px rgba(255,45,85,.2), 0 0 30px rgba(255,45,85,.15), 0 0 60px rgba(255,45,85,.1)",
        card: "0 0 0 1px rgba(255,255,255,0.03), 0 2px 4px rgba(0,0,0,0.2)",
        "card-hover": "0 0 0 1px rgba(0,229,255,0.15), 0 8px 32px rgba(0,0,0,0.4)",
        premium: "0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #00E5FF 0%, #6E56CF 50%, #FF2D55 100%)",
        "gradient-card": "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        "gradient-cyber": "linear-gradient(135deg, #00E5FF 0%, #6E56CF 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        gradient: "gradient 3s ease infinite",
        shimmer: "shimmer 2s linear infinite",
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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
