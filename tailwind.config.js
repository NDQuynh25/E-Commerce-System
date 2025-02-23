/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        myBlue: "#1E40AF", // Thêm màu xanh mới
      },
    },
  },
  
  plugins: [],
}

