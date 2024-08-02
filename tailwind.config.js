/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      colors: {
        primary: {
          '00': '#E8EBFC',
          10: '#C8D0F9',
          20: '#A8B4F5',
          30: '#8898F2',
          40: '#677CEE',
          50: '#4C65E5',
          60: '#334EDB',
          70: '#2941C2',
        },
        gray: {
          '00': '#FFFFFF',
          '05': '#F6F7F8',
          10: '#E8E9ED',
          15: '#DADBE2',
          20: '#CBCDD7',
          30: '#AEB1C1',
          40: '#9296AB',
          50: '#757A95',
          60: '#5D6279',
          70: '#474A5C',
          80: '#31333F',
          90: '#1B1C23',
        },
      },
    },
  },
  plugins: [],
};
