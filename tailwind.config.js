/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Define your custom screen sizes here
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      // Extend your theme as needed
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      'light',
      'black',
      {
        dark: {
          "primary": "#ad00ff",
          "secondary": "#00ee00",
          "accent": "#008800",
          "neutral": "#222",
          "base-100": "#181818",
          "info": "#0096d1",
          "success": "#008710",
          "warning": "#f16e00",
          "error": "#ff1f4a",
        },
        light: {
          "primary": "#ad00ff",
          "secondary": "#00ee00",
          "accent": "#008800",
          "neutral": "#f4f5f7",
          "base-100": "#ffffff",
          "info": "#0096d1",
          "success": "#008710",
          "warning": "#f16e00",
          "error": "#ff1f4a",
        },
      },
    ],
    darkTheme: "dark",
  }
};
