/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        width: "width",
      },
      colors: {
        primary: "rgba(var(--dark-primary))",
        secondary: "rgba(var(--dark-secondary))",
        tertiary: "rgba(var(--dark-tertiary))",
      },
      backgroundColor: {
        primary: "rgba(var(--dark-primary))",
        secondary: "rgba(var(--dark-secondary))",
        tertiary: "rgba(var(--dark-tertiary))",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },

    keyframes: {
      leftRotate: {
        "0%": {
          transform: "rotate(180deg)",
        },
        "100%": {
          transform: "rotate(0deg)",
        },
      },
      rightRotate: {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(180deg)",
        },
      },
      popp: {
        from: {
          opacity: 0,
          transform: "translateY(3rem)",
        },
        to: {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
      spin: {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
      ripple: {
        from: {
          transform: "scale(0)",
          opacity: 0.3,
        },
        to: {
          transform: "scale(4)",
          opacity: 0,
        },
      },
    },
    animation: {
      "left-rotate": "leftRotate 300ms linear forwards",
      "right-rotate": "rightRotate 300ms linear forwards",
      "popping-up": "popp 1s ease-out forwards",
      "popping-down": "popp 1s ease-out reverse forwards",
      spin: "spin 1s linear infinite",
      ripple: "ripple 2000ms linear",
      "ripple-500": "ripple 500ms linear",
      "ripple-1000": "ripple 1000ms linear",
      "ripple-1500": "ripple 1500ms linear",
      "ripple-3000": "ripple 3000ms linear",
      "text-appear": "0s linear 2.3s forwards delayedShow ",
    },
  },
  plugins: [],
};
