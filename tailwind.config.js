module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./ui/**/*.{js,ts,jsx,tsx}"],
  //content: [],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
