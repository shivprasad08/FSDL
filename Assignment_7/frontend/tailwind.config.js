module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        indigo: '#6366F1',
        emerald: '#10B981',
        amber: '#F59E0B',
        rose: '#F43F5E',
        navy: {
          DEFAULT: '#1e293b',
          dark: '#0f172a',
        },
      },
      borderRadius: {
        xl: '12px',
      },
    },
  },
  plugins: [],
};
