echo "tailwindcss template"

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

cat << EOF > tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // can add jit if you want customization
  // mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
EOF

echo "add following to your css file"
echo "@tailwind base;"
echo "@tailwind components;"
echo "@tailwind utilities;"
