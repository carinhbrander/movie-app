module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        'blue': 'rgb(6, 104, 251)',
        'dark': 'rgb(52, 52, 52)',
        'light': 'rgb(247, 247, 247)'
      },
    }
  },
  plugins: [],
}
