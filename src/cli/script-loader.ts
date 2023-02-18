import * as readline from 'readline';
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { display } from '../utils';

export const git = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  display.log('git automation script');
  display.log('OR you can just commit by pressing "c"');

  rl.question(
    'Do you have repo initiatlised? [y/n] || [c]: ',
    (input: string) => {
      if (input === 'y') {
        display.log('Proceeding with the script.');
        execSync('git add .');
        rl.question('Please enter your commit: ', (commit: string) => {
          execSync(`git commit -m "${commit}"`);
          rl.close();
        });
      } else if (input === 'c') {
        display.log('commiting to current branch');
        execSync('git add .');
        rl.question('Please enter your commit: ', (commit: string) => {
          execSync(`git commit -m "${commit}"`);
          rl.close();
        });
      } else {
        display.log('Initializing Repo.');
        execSync('git init');
        rl.question(
          'Please enter your repository address: ',
          (remote: string) => {
            execSync(`git remote add origin ${remote}`);
            execSync('git add .');
            rl.question('Please enter your commit: ', (commit: string) => {
              execSync(`git commit -m "${commit}"`);
              execSync('git push --set-upstream origin master');
              rl.close();
            });
          },
        );
      }
    },
  );
};

export const next = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  display.log('create-next-app with tailwind template');

  rl.question(
    'Do you want to proceed with auto-generated or set up manually? [y/n]: ',
    (input) => {
      if (input === 'y') {
        display.log('Proceeding with the automate-setup.');
        execSync('npx create-next-app --example with-tailwindcss my-app');
      } else {
        display.log('Manual set up will begin.');
        execSync('npx create-next-app my-app');
        process.chdir('my-app');
        display.log('tailwindcss template');
        execSync('npm install -D tailwindcss postcss autoprefixer');
        execSync('npx tailwindcss init -p');
        const config = `module.exports = {
      content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
      ],
      theme: {
        extend: {},
      },
      variants: {},
      plugins: [],
    };`;
        const configFileName = 'tailwind.config.js';
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
        const fileDescriptor: unknown = require('fs').openSync(
          configFileName,
          'w',
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
        require('fs').writeSync(fileDescriptor, config);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
        require('fs').closeSync(fileDescriptor);
        display.log('Add the following to your CSS file:');
        display.log('@tailwind base;');
        display.log('@tailwind components;');
        display.log('@tailwind utilities;');
      }
    },
  );
};

export const react = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  display.log('create-react-app with tailwind template');

  rl.question(
    'Do you want to proceed with react-automated-setup or setup react with tailwind manually? [y/n]: ',
    (input) => {
      if (input === 'y') {
        display.log('Proceeding with the automate-setup.');
        execSync('npx create-react-app');
      } else {
        display.log('Manual set up will begin...');
        execSync('npx create-react-app my-app');
        process.chdir('my-app');
        display.log('tailwindcss template');
        execSync('npm install -D tailwindcss postcss autoprefixer');
        execSync('npx tailwindcss init -p');
        const config = `module.exports = {
      content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
      ],
      theme: {
        extend: {},
      },
      variants: {},
      plugins: [],
    };`;
        const configFileName = 'tailwind.config.js';
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
        const fileDescriptor: unknown = require('fs').openSync(
          configFileName,
          'w',
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
        require('fs').writeSync(fileDescriptor, config);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
        require('fs').closeSync(fileDescriptor);
        display.log('Add the following to your CSS file:');
        display.log('@tailwind base;');
        display.log('@tailwind components;');
        display.log('@tailwind utilities;');
      }
    },
  );
};

export const tailwind = () => {
  display.log('tailwindcss template');

  execSync('npm install -D tailwindcss postcss autoprefixer');
  execSync('npx tailwindcss init -p');

  const configFile = `/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  // can add jit if you want customization
  // mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using \`src\` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};`;

  writeFileSync('tailwind.config.js', configFile, 'utf8');

  display.log('add following to your css file');
  display.log('@tailwind base;');
  display.log('@tailwind components;');
  display.log('@tailwind utilities;');
};
