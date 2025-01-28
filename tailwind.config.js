
module.exports = {
  content: [
    './app.vue',
  ],
  theme: {
    extend: {
        fontFamily:   {
            saira: ['"Saira Condensed"', 'sans-serif'],
          },
          fontSize: {
            'h1-display': ['clamp(48px, 10vw, 96px)'], 
            'h1-normal': ['clamp(36px, 10vw, 52px)'], 
          },
          lineHeight: {
            'h1-display': ['clamp(48px, 10vw, 96px)'],  
            'h1-normal': ['clamp(43px, 10vw, 62.4px)'],  
          },


    },
  },
  plugins: [],
};
