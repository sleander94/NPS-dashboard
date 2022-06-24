module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'smoky-mountains': "url('/src/images/smoky-mountains.jpg')",
      },
    },
    screens: {
      xs: '405px',
      sm: '640px',
      lg: '1080px',
      xl: '1205px',
      xxl: '1700px',
    },
  },
  plugins: [],
};
