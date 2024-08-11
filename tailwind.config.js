/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height:{
        header:'560px',
        rate:'400px',
      },
      fontSize:{
        h1:'2.6rem',
      },
      screens:{
        xs:'475px',
      },
      colors:{
        main:'#130944',
        subMain:'#a00625',
        dry:'#cbd5e1',
        star:'#edd204',
        menutext:'#374151',
        border:'#ed04ca',

      }
    },
  },
  plugins: [],
}

