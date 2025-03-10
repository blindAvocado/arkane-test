/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.vue'
  ],
  theme: {
    fontFamily: {
      sans: [
        'Roboto',
        'Base Font',
        'system-ui'
      ]
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      custom: {
        gray: {
          400: '#F8F8F8',
          500: '#DFDFDF',
          700: '#989898',
          800: '#9E9E9E',
          900: '#666666'
        },
        red: '#EB4036',
        blue: '#007AFF'
      }
    },
    extend: {
      fontSize: {
        xs: ['12px', '24px']
      },
      boxShadow: {
        dropdown: `0px 3px 14px 2px rgba(0, 0, 0, 0.12),
        0px 8px 10px 1px rgba(0, 0, 0, 0.14),
        0px 5px 5px -3px rgba(0, 0, 0, 0.2)`
      }
    }
  },
  plugins: []
}
