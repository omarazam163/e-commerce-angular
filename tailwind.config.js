/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        signinimgMobile: "url('/images/shopping-cart-with-bag-mobile.jpg')",
        signinimgDesktop: "url('/images/shopping-bag-cart.jpg')",
      },
      
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};

