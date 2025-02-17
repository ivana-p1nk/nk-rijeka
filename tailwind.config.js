
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './error.vue',
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './components/**/*.vue',
  ],
  theme: {
    extend: {
        fontFamily:   {
            saira: ['"Saira Condensed"', 'sans-serif'],
            roboto: ['Roboto Condensed', 'sans-serif'],
          },
          fontSize: {
            'h1-display': ['clamp(48px, 5vw, 96px)', { lineHeight: 'clamp(48px, 5vw, 96px)' }],  // font size, line height
            'h2-display': ['clamp(40px, 5vw, 74px)', { lineHeight: 'clamp(40px, 5vw, 74px)' }],
            'h1-normal': ['clamp(36px, 5vw, 52px)', { lineHeight: 'clamp(43px, 5vw, 62.4px)' }],
            'h2-normal': ['clamp(32px, 5vw, 44px)', { lineHeight: 'clamp(38px, 5vw, 52.8px)' }],
            'h3-normal': ['clamp(28px, 5vw, 38px)', { lineHeight: 'clamp(33px, 5vw, 45.6px)' }],
            'h4-normal': ['clamp(24px, 5vw, 30px)', { lineHeight: 'clamp(29px, 5vw, 36px)' }],
            'h5-normal': ['clamp(20px, 5vw, 24px)', { lineHeight: 'clamp(24px, 5vw, 28.8px)' }],
            'h6-normal': ['clamp(18px, 5vw, 20px)', { lineHeight: 'clamp(22px, 5vw, 24px)' }],
            'body1': ['18px', '25.2px'], // 18px font size, 25.2px line height
            'body2': ['16px', '22.4px'],
            'body3': ['14px', '19.6px'],
            'body4': ['12px', '16.8px'],
            'label1': ['14px', '14px'],
            'label2': ['12px', '14px'],
            'button1': ['15px', '1.2'], //120% = 1.2
            'button2': ['14px', '1.2'],
            'button3': ['13px', '1.2'],
            'link1': ['14px', '1.2'],
            'link2': ['12px', '1.2'],
          },
          colors: {
            red: {
              '50': '#FCF6F8',
              '100': '#FBDBDE',
              '200': '#FABFC2',
              '300': '#F99C9E',
              '400': '#F86F70',
              '500': '#F73B3B', 
              '600': '#D93434',
              '700': '#BF2E2E',
              '800': '#9F2626',
              '900': '#7C1E1E',
            },
            yellow: {
              '50': '#FDFAF3',
              '100': '#FDF2D7',
              '200': '#FDE9B7',
              '300': '#FDDD8D',
              '400': '#FECF57',
              '500': '#FFBE18', 
              '600': '#E0A715',
              '700': '#C59312',
              '800': '#A47A0F',
              '900': '#805F0C',
            },
            green: {
              '50': '#F1F9F4',
              '100': '#D5F0DC',
              '200': '#B5E6BF',
              '300': '#8BD999',
              '400': '#55C868',
              '500': '#17B530', 
              '600': '#149F2A',
              '700': '#128C25',
              '800': '#0F741F',
              '900': '#0C5B18',
            },
            neutralBlue: {
              '50': '#E7EBEF',
              '100': '#DAE1E7',
              '200': '#CED7DE',
              '300': '#C2CDD6',
              '400': '#AAB9C5',
              '500': '#B6C3CD', 
              '600': '#92A5B5',
              '700': '#7991A4',
              '800': '#637D92',
              '900': '#4A5E6D',
              '950': '#323F49',
            },
            blue: {
              '00': '#F3FBFF',
              '50': '#D9F1FD',
              '100': '#A9DCF7',
              '200': '#7ECEF8',
              '300': '#58B6E7',
              '400': '#1AA6F1',
              '500': '#009FF5', 
              '600': '#0083C9',
              '700': '#006296',
              '800': '#013958',
              '900': '#012436',
            },
            gray: {
              '50': '#F9FAFB',
              '100': '#F3F4F6',
              '200': '#E5E7EB',
              '300': '#D1D5DB',
              '400': '#9CA3AF',
              '500': '#6B7280', 
              '600': '#4B5563',
              '700': '#374151',
              '800': '#1F2937',
              '900': '#111827',
              '950': '#030712',
            },
          },
          backgroundImage: {
            'dark-blue-gradient': 'linear-gradient(to right, #0083C9, #006296, #012436)', 
            'blue-gradient': 'linear-gradient(to right, #58B6E7, #0083C9)',
            'header-gradient': 'linear-gradient(to top, #172A53, #0D1A35)',
          },
          backgroundSize: {
            'size-200': '200% 200%',
          },
          backgroundPosition: {
            'pos-0': '0% 0%',
            'pos-100': '100% 100%',
          },

          
    },
  },
  plugins: [],
};
