export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'trend-black': '#0D0D0D',
        'trend-yellow': '#F5C518',
        'trend-orange': '#E8500A',
        'trend-white': '#FFFFFF',
        'trend-purple': '#5B4BEB',
        'trend-light-gray': '#F5F5F5',
      },
      fontFamily: {
        display: ['Barlow Condensed', 'Bebas Neue', 'sans-serif'],
        body: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
        '10xl': '8rem',
      },
    },
  },
  plugins: [],
};
