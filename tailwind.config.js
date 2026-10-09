/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pulse: {
          50: '#F0F7F6',
          100: '#D9ECE9',
          200: '#B5DDD7',
          300: '#8AC7BF',
          400: '#5AAEA4',
          500: '#2A9D8F',
          600: '#1F8276',
          700: '#14675D',
          800: '#0D5C58',
          900: '#083B38',
          950: '#042220',
        },
        coral: {
          50: '#FEF5F2',
          100: '#FDE8E2',
          200: '#FBD2C6',
          300: '#F7AFA0',
          400: '#EF8973',
          500: '#E07A5F',
          600: '#CA5A3D',
          700: '#A9432A',
          800: '#8C3824',
          900: '#723223',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          700: '#B45309',
        },
        warm: {
          50: '#FBFBFA',
          100: '#F7F7F4',
          200: '#ECECE7',
          300: '#DEDED6',
          400: '#BDBDB2',
          500: '#949488',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 16px rgba(13, 92, 88, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 30px rgba(13, 92, 88, 0.10), 0 2px 6px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
