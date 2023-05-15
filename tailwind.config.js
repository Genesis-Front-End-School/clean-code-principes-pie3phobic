module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./ui/**/*.{js,ts,jsx,tsx}"],
  //content: [],
  theme: {
    extend: {
      colors: {
        "blue-950": "#0F172A",
        midnight: "#121063",
        "gray-950": "#414B5C",
        "purple-accent": "#6366F1",
      },
    },
  },
  // theme: {
  //   extend: {},
  // },
  plugins: [require("tailwind-scrollbar-hide")],
};
