/** @type {import('tailwindcss').Config} */
module.exports = {
  // 修正点：在路径中添加了 "src/"
  // 这会告诉 Tailwind 去扫描 src/app 和 src/components 文件夹里的所有文件。
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 保持您的黑金主题配置
      colors: {
        gold: '#b8860b',
      },
      // 保持您的字体配置
      fontFamily: {
        serif: ["Cinzel", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
