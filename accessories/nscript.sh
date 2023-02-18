echo "create-next-app with tailwind template"
read -p "Do you want to proceed with auto genrated or setup manually? [y/n]: " input
if [ "$input" == "y" ]; then
  echo "Proceeding with the automate-setup."
  npx create-next-app --example with-tailwindcss my-app
else
  echo "manual set up will begin"
  npx create-next-app my-app
  cd my-app
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
fi