/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sans: ['var(--font-primary)'], // just put this here
      },
      colors: {
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          600: '#16a34a',
          700: '#15803d',
          800: '#052e16',
        }
      },
      animation: {
        'leaf-float': 'leaf-float 3s ease-in-out infinite',
      },
      keyframes: {
        'leaf-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' }
        }
      }
    }
  },
  plugins: [],
};
