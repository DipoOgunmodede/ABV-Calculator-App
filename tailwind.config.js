module.exports = {
  content: [
    "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#292A28",
        secondary: "#06D6A0",
        tertiary: "#DA627D",
        quaternary: "#FDCA40",
        quinary: "#F79824",
        black: "#000000",
        white: "#FFFFFF",
        gray: {
          100: "#F8F9FA",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#ADB5BD",
          600: "#6C757D",
          700: "#495057",
          DEFAULT: '#ADB5BD',
        }
      },

    },
    plugins: [],
  }
}