/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '390px',
      },
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
          100: '#1D1D1F',
        },
        success: {
          10: '#ECF8F5',
          20: '#B4E9DC',
          30: '#87E3CD',
          40: '#5ED9BC',
          50: '#25D4AA',
          60: '#16B18C',
        },
        warning: {
          10: '#FEFDF6',
          20: '#FAF2C6',
          30: '#F7E797',
          40: '#F3DC68',
          50: '#EFD139',
          60: '#E3C112',
        },
        danger: {
          10: '#FBE9EF',
          20: '#F4BECE',
          30: '#EC93AD',
          40: '#E4678D',
          50: '#DD3C6C',
          60: '#C52353',
        },
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.title-lg-300': {
          fontSize: '1.5rem',
          fontWeight: 600,
          lineHeight: '150%',
        },
        '.title-lg-200': {
          fontSize: '1.5rem',
          fontWeight: 500,
          lineHeight: '150%',
        },
        '.title-lg-100': {
          fontSize: '1.5rem',
          fontWeight: 400,
          lineHeight: '150%',
        },
        '.title-md-300': {
          fontSize: '1.375rem',
          fontWeight: 600,
          lineHeight: '150%',
        },
        '.title-md-200': {
          fontSize: '1.375rem',
          fontWeight: 500,
          lineHeight: '150%',
        },
        '.title-md-100': {
          fontSize: '1.375rem',
          fontWeight: 400,
          lineHeight: '150%',
        },
        '.title-sm-300': {
          fontSize: '1.25rem',
          fontWeight: 600,
          lineHeight: '150%',
        },
        '.title-sm-200': {
          fontSize: '1.25rem',
          fontWeight: 500,
          lineHeight: '150%',
        },
        '.title-sm-100': {
          fontSize: '1.25rem',
          fontWeight: 400,
          lineHeight: '150%',
        },
        '.text-lg-300': {
          fontSize: '1.125rem',
          fontWeight: 600,
          lineHeight: '150%',
        },
        '.text-lg-200': {
          fontSize: '1.125rem',
          fontWeight: 500,
          lineHeight: '150%',
        },
        '.text-lg-100': {
          fontSize: '1.125rem',
          fontWeight: 400,
          lineHeight: '150%',
        },
        '.text-md-300': {
          fontSize: '1rem',
          fontWeight: 600,
          lineHeight: '150%',
        },
        '.text-md-200': {
          fontSize: '1rem',
          fontWeight: 500,
          lineHeight: '150%',
        },
        '.text-md-100': {
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: '150%',
        },
        '.text-sm-300': {
          fontSize: '0.875rem',
          fontWeight: 600,
          lineHeight: 'normal',
        },
        '.text-sm-200': {
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 'normal',
        },
        '.text-sm-100': {
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: 'normal',
        },
      });
    },
  ],
};
