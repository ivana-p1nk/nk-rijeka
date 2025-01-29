
module.exports = {
  content: [
    './app.vue',
  ],
  theme: {
    extend: {
        fontFamily:   {
            saira: ['"Saira Condensed"', 'sans-serif'],
            roboto: ['"Roboto Condensed"', 'sans-serif'],
          },
          fontSize: {
            'h1-display': ['clamp(48px, 10vw, 96px)', { lineHeight: 'clamp(48px, 10vw, 96px)' }],  // font size, line height
            'h2-display': ['clamp(40px, 10vw, 74px)', { lineHeight: 'clamp(40px, 10vw, 74px)' }],
            'h1-normal': ['clamp(36px, 10vw, 52px)', { lineHeight: 'clamp(43px, 10vw, 62.4px)' }],
            'h2-normal': ['clamp(32px, 10vw, 44px)', { lineHeight: 'clamp(38px, 10vw, 52.8px)' }],
            'h3-normal': ['clamp(28px, 10vw, 38px)', { lineHeight: 'clamp(33px, 10vw, 45.6px)' }],
            'h4-normal': ['clamp(24px, 10vw, 30px)', { lineHeight: 'clamp(29px, 10vw, 36px)' }],
            'h5-normal': ['clamp(20px, 10vw, 24px)', { lineHeight: 'clamp(24px, 10vw, 28.8px)' }],
            'h6-normal': ['clamp(18px, 10vw, 20px)', { lineHeight: 'clamp(22px, 10vw, 24px)' }],
            'body1': ['18px', '25.2px'], // 18px font size, 25.2px line height
            'body2': ['16px', '22.4px'],
            'body3': ['14px', '19.6px'],
            'body4': ['12px', '16.8px'],
            'label1': ['14px', '14px'],
            'label2': ['14px', '14px'],
            'label2': ['12px', '14px'], 
            'button1': ['15px', '1.2'], //120% = 1.2
            'button2': ['14px', '1.2'],
            'button3': ['13px', '1.2'],
            'link1': ['14px', '1.2'],
            'link2': ['12px', '1.2'],
          },
    },
  },
  plugins: [],
};
