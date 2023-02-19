import * as readline from 'readline';
import { execSync } from 'child_process';
import fs, { writeFileSync } from 'fs';
import { close, display } from '../utils';

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

export const gitDefaultBranchCommit = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  display.log('commiting to current branch');
  execSync('git add .');
  rl.question('Please enter your commit: ', (commit: string) => {
    execSync(`git commit -m "${commit}"`);
    execSync('git push');
    rl.close();
  });
};

export const gitDefaultCommit = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  display.log('commiting to current branch');
  execSync('git add .');
  rl.question('Please enter your commit: ', (commit: string) => {
    execSync(`git commit -m "${commit}"`);
    rl.close();
  });
};

export const gitDefaultPush = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  display.log('give branch if new branch or for first push to default branch');
  rl.question('on which to commit: ', (branch: string) => {
    if (branch === '') {
      display.log('commiting to default branch');
      execSync(`git push`);
    } else if (branch === 'new' || branch === 'master' || branch === 'main') {
      display.log(`creating or pushing to ${branch} branch`);
      execSync(`git push --set-upstream origin ${branch}`);
    }
    rl.close();
  });
};

export const gitBranch = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  display.log('give branch name to switch or create new one');
  rl.question(
    'Create new branch or switch to another one: ',
    (branch: string) => {
      if (branch === 'switch' || branch === 'n' || branch === 's') {
        display.log('Switching to another branch');
        rl.question('Enter branch name: ', (anotherBranch: string) => {
          execSync(`git checkout ${anotherBranch}`);
          rl.close();
        });
      } else if (branch === 'new' || branch === 'y') {
        rl.question('Enter branch name: ', (newBranch: string) => {
          display.log(`creating new branch  to ${newBranch} branch`);
          execSync(`git checkout -b ${newBranch}`);
          execSync('git branch');
          rl.close();
        });
      }
      rl.close();
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
        rl.question('enter project name:', (projectName: string) => {
          execSync(
            `npx create-next-app --example with-tailwindcss ${projectName}`,
          );
        });
      } else {
        display.log('Manual setup for nextjs will begin.');
        rl.question('enter project name:', (projectName: string) => {
          execSync(`npx create-next-app ${projectName}`);
          process.chdir(`${projectName}`);

          display.log('Adding tailwindcss to the next app');
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
        });
      }
    },
  );
};

export const nextTaiwind = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  display.log('Manual setup for next will begin...');
  rl.question('enter project name:', (projectName: string) => {
    execSync(`npx create-next-app ${projectName}`);
    process.chdir(`${projectName}`);

    display.log('Adding Tailwind to created next app');
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
    const fileDescriptor: unknown = require('fs').openSync(configFileName, 'w');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
    require('fs').writeSync(fileDescriptor, config);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
    require('fs').closeSync(fileDescriptor);
    display.log('Add the following to your CSS file:');
    display.log('@tailwind base;');
    display.log('@tailwind components;');
    display.log('@tailwind utilities;');
  });
};

export const react = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  display.log('create-react-app template');

  rl.question(
    'Do you want to proceed with react-automated-setup or setup react with tailwind manually? [y/n]: ',
    (input) => {
      if (input === 'y') {
        display.log('Proceeding with the automate-setup.');
        rl.question('enter project name:', (projectName: string) => {
          execSync(
            `npx create-react-app ${projectName} --template cra-template-tailwindcss`,
          );
        });
      } else {
        display.log('Manual setup for react will begin...');
        rl.question('enter project name:', (projectName: string) => {
          execSync(`npx create-react-app ${projectName}`);
          process.chdir(`${projectName}`);

          display.log('Adding Tailwind to created creat app');
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
        });
      }
    },
  );
};

export const reactTailwind = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  display.log('Manual setup for react will begin...');
  rl.question('enter project name:', (projectName: string) => {
    execSync(`npx create-react-app ${projectName}`);
    process.chdir(`${projectName}`);

    display.log('Adding Tailwind to created react app');
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
    const fileDescriptor: unknown = require('fs').openSync(configFileName, 'w');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
    require('fs').writeSync(fileDescriptor, config);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
    require('fs').closeSync(fileDescriptor);
    display.log('Add the following to your CSS file:');
    display.log('@tailwind base;');
    display.log('@tailwind components;');
    display.log('@tailwind utilities;');
  });
};

export const mern = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  display.log('mern project structure template');
  rl.question(
    'The default file structure will be \n1: client \n2: server\n Do you want to continue? [y/n]: ',
    (input) => {
      if (input === 'y') {
        display.log('Proceeding with the default file structure and setup.');
        rl.question(
          'The Project will created in current pwd. Do you still want to continue [y/n]: ',
          (binary: string) => {
            if (binary === 'y') {
              // root folder for the MERN application
              const ROOT_FOLDER = process.cwd();
              // folder structure for the MERN application
              const FOLDER_STRUCTURE = {
                client: {
                  public: {},
                  src: {
                    components: {},
                    pages: {},
                    'App.tsx': '',
                    'index.tsx': '',
                    'react-app-env.d.ts': '',
                  },
                  'package.json': '',
                  'package-lock.json': '',
                  'tsconfig.json': '',
                },
                server: {
                  src: {
                    config: {},
                    controllers: {},
                    middlewares: {},
                    models: {},
                    routes: {},
                    'index.ts': '',
                  },
                  'package.json': '',
                  'package-lock.json': '',
                  'tsconfig.json': '',
                },
                '.env': '',
                '.gitignore': '',
                'README.md': '',
                'package.json': '',
                'tsconfig.json': '',
              };
              // function to create the folder structure
              const createFolderStructure = (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                structure: any,
                parentPath: string,
              ) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                Object.entries(structure).forEach(([name, content]) => {
                  const path = `${parentPath}/${name}`;
                  if (typeof content === 'string') {
                    fs.writeFileSync(path, content);
                  } else {
                    fs.mkdirSync(path);
                    createFolderStructure(content, path);
                  }
                });
              };
              // Create the folder structure for the MERN application
              createFolderStructure(FOLDER_STRUCTURE, ROOT_FOLDER);
              // Install the dependencies for the MERN application
              display.log(
                'All file structure has been setUp you can now set up libraries as per preference',
              );
              close(0);
            } else {
              display.log(
                'Please switch to directory where u want to initiate the project',
              );
            }
          },
        );
      } else {
        display.log('Manual setup for MERN app will begin...');
        rl.question(
          'The Project will created in current pwd. Do you still want to continue [y/n]: ',
          (binary: string) => {
            if (binary === 'y') {
              const ROOT_FOLDER = process.cwd();
              const FOLDER_STRUCTURE = {
                client: {
                  public: {},
                  src: {
                    components: {},
                    pages: {},
                    'App.tsx': '',
                    'index.tsx': '',
                    'react-app-env.d.ts': '',
                  },
                  'package.json': '',
                  'package-lock.json': '',
                  'tsconfig.json': '',
                },
                server: {
                  src: {
                    config: {},
                    controllers: {},
                    middlewares: {},
                    models: {},
                    routes: {},
                    'index.ts': '',
                  },
                  'package.json': '',
                  'package-lock.json': '',
                  'tsconfig.json': '',
                },
                '.env': '',
                '.gitignore': '',
                'README.md': '',
                'package.json': '',
                'tsconfig.json': '',
              };
              const createFolderStructure = (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                structure: any,
                parentPath: string,
              ) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                Object.entries(structure).forEach(([name, content]) => {
                  const path = `${parentPath}/${name}`;
                  if (typeof content === 'string') {
                    fs.writeFileSync(path, content);
                  } else {
                    fs.mkdirSync(path);
                    createFolderStructure(content, path);
                  }
                });
              };
              createFolderStructure(FOLDER_STRUCTURE, ROOT_FOLDER);
              const packageConfig = `hello mern template`;
              writeFileSync('package.json', packageConfig, 'utf8');
              display.log('Structure with code has been setUp');
              close(0);
            } else {
              display.log(
                'Please switch to directory where u want to initiate the project',
              );
            }
          },
        );
      }
    },
  );
};

export const mernTailwind = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(
    'The Project will created in current pwd. Do you still want to continue [y/n]: ',
    (binary: string) => {
      if (binary === 'y') {
        const ROOT_FOLDER = process.cwd();
        const FOLDER_STRUCTURE = {
          client: {},
          server: {},
        };
        const createFolderStructure = (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          structure: any,
          parentPath: string,
        ) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          Object.entries(structure).forEach(([name, content]) => {
            const pathFolder = `${parentPath}/${name}`;
            if (typeof content === 'string') {
              fs.writeFileSync(pathFolder, content);
            } else {
              fs.mkdirSync(pathFolder);
              createFolderStructure(content, pathFolder);
            }
          });
        };
        createFolderStructure(FOLDER_STRUCTURE, ROOT_FOLDER);
        const frontendPath = 'client';
        const fronetndLibName =
          'npx create-react-app . --template cra-template-tailwindcss';
        const backendPath = 'server';
        const backendLibName = 'express';
        try {
          execSync(`cd ${frontendPath} && ${fronetndLibName}`);
          display.log(`${frontendPath} is ready to be served`);
        } catch (error) {
          display.error('Something wen wrong ');
        }
        try {
          execSync(
            `cd ${backendPath} && npm init -y && npm install ${backendLibName}`,
          );
          display.log(`${backendLibName} is ready to be served`);
        } catch {
          display.error('Something wen wrong ');
        }
        close(0);
      } else {
        display.log(
          'Please switch to directory where u want to initiate the project',
        );
      }
    },
  );
};

export const webpack = () => {
  display.log('webpack template');
};

export const webpackTailwind = () => {
  display.log('webpack Tailwind template');
};
