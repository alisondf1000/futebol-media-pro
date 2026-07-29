/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada no SofaScore: base grafite/azulada muito escura
        // com verde vivo como cor de destaque (ao vivo, positivo, ações primárias).
        background: {
          DEFAULT: "#0F1115", // fundo geral do app
          surface: "#171A21", // cards, sidebar, header
          elevated: "#1F232C", // hover / itens elevados
        },
        border: {
          DEFAULT: "#262B34",
        },
        text: {
          primary: "#F2F4F6",
          secondary: "#9AA1AC",
          muted: "#6B7280",
        },
        primary: {
          DEFAULT: "#22C55E", // verde principal (ações, destaque, "ao vivo")
          hover: "#16A34A",
        },
        accent: {
          DEFAULT: "#FACC15", // amarelo para favoritos/destaques secundários
        },
        danger: {
          DEFAULT: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
      },
    },
  },
  plugins: [],
};
