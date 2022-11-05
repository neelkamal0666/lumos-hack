/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
          colors: {
              primary: "#282c34",
              "borderGreen":"#BBFF00",
              "details-heading-bg": "#f3f3f3",
              "darkBakcground":"rgb(55 65 81 / var(--tw-bg-opacity))",
              "lightHoverGrey":"#FCFFF2",
          },
          scale:{
              '200':'2',
              '300':'3'
          },
          "detailsBoxShadow": "0px 15px 40px #0C0C0C0D"
      },
  },
  plugins: [],
};
