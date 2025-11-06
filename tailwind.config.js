/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6EC1E4',
        secondary: '#54595F',
        text: '#7A7A7A',
        accent: '#61CE70',
        'finx-blue-1': '#079DDF',
        'finx-blue-2': '#61C1EB',
        'finx-dark': '#1E3247',
        'finx-white': '#FFFFFF',
        'finx-gray-1': '#959FA6',
        'finx-gray-2': '#61646B',
        'finx-gray-light': '#F2F0F0'
      }
    }
  },
  plugins: []
}

