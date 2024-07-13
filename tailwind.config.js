/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-gradient": "linear-gradient(90deg, #df3238 0%, #FFB200 100%)",
      },
      backgroundColor: {
        app: "#1e1d1b",
        "box-primary": "#232220",
        "box-secondary": "#3a3a39",
        "box-primary-primary": "#FFB200",
      },
      colors: {
        "active-campain": "#3A5542",
        link: "#72EFE8",
        "upcoming-campain": "#275C4C",
        campaign: "#29404B",
        "past-campain": "#3A535E",
        "border-primary": "#ffffff4c",
        "border-secondary": "rgba(255, 255, 255, 0.13)",
        "twitter-gary": "#C8D1D9",
        "twitter-gary-2": "#536471",
        "box-primary": "#362a4b66",
        "box-secondary": "#ffffff33",
        "error-content": "#F73D3D",
        "content-primary": "#fff",
        "content-secondary": "#000",
        "content-tertiary": "#CABBC8",

        "transparent-15": "rgba(255, 255, 255, 0.15)",
        "transparent-16": "rgba(255, 255, 255, 0.16)",
        "transparent-30": "rgba(255, 255, 255, 0.30)",
        "transparent-40": "rgba(255, 255, 255, 0.4)",

        primary: "#FFB200",
        secondary: "#df3238",
        muted: "#8F8F8F",
        success: "#65CC7C",
        // background: 'var(--app-bg)',
        skin: {
          primary: "var(--color-primary)",
          "primary-hover": "var(--color-primary-hover)",
          base: "var(--color-text-base)",
          muted: "var(--color-text-muted)",
          inverted: "var(--color-text-inverted)",
          "border-primary": "var(--border-color)",
          "info-text-color": "var(--info-text)",
          "info-bg-color": "var(--info-bg)",

          "success-text-color": "var(--success-text)",
          "success-bg-color": "var(--success-bg)",

          "warning-text-color": "var(--warning-text)",
          "warning-bg-color": "var(--warning-bg)",

          "error-text-color": "var(--error-text)",
          "error-bg-color": "var(--error-bg)",
        },
      },
      fontFamily: {
        press: ["Press Start 2P", "system-ui"],
        poppins: ["Poppins", "sans-serif"],
        itc: ["ITC", "system-ui"],
        "itc-thin": ["ITC-thin", "system-ui"],
        "itc-mid": ["ITC-mid", "system-ui"],
      },
      // MEDIA QUERIES
      screens: {
        // min-width: 360px
        "2xs": "360px",
        xs: "500px",
        sm: "640px",
        md: "834px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        // max-width: 360px
        "max-2xs": { max: "360px" },
        "max-xs": { max: "575px" },
        "max-sm": { max: "640px" },
        "max-md": { max: "834px" },
        "max-lg": { max: "1024px" },
        "max-xl": { max: "1280px" },
        "max-2xl": { max: "1536px" },
      },
      // KEYFRAMES
      keyframes: {
        fadeInScaleUp: {
          from: { opacity: 0, transform: " scale(0.7)" },
          to: { opacity: 1, transform: " scale(1)" },
        },
        fadeOutScaleDown: {
          from: { opacity: 1, transform: " scale(1)" },
          to: { opacity: 0, transform: " scale(0.7)" },
        },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 0.85 } },
        fadeOut: { from: { opacity: 0.85 }, to: { opacity: 0 } },
        grow: { from: { height: 0 }, to: { height: 350 } },
      },
      // ANIMATIONS
      animation: {
        fadeIn: "fadeIn 170ms ease-in-out",
        fadeOut: "fadeOut 170ms ease-in-out",
        fadeInScaleUp: "fadeInScaleUp 170ms ease-in-out",
        fadeOutScaleDown: "fadeOutScaleDown 170ms ease-in-out",
        grow: "grow 170ms ease-in-out",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["skin"],
      textColor: ["skin"],
    },
  },
  plugins: [],
};
