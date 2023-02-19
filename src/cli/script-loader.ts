import * as readline from 'readline';
import * as path from 'path';
import { execSync } from 'child_process';
import fs, { writeFileSync } from 'fs';
import { close, display, exitScript } from '../utils';

export const git = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // TODO: add speacial help section for git
  display.log('Git automation\nsee --help for more info');

  rl.question('Do you have repo initiatlised? [y/n]: ', (input: string) => {
    if (input === 'y') {
      display.log('Proceeding with the current repository...📖');
      execSync('git add .');
      rl.question('Please enter your commit: ', (commit: string) => {
        execSync(`git commit -m "${commit}"`);
        rl.close();
      });
      execSync(`git push`);
      exitScript(0);
    } else if (input === 'n') {
      display.log('Initializing repository...📚');
      execSync('git init');
      rl.question(
        'Please enter your repository address: ',
        (remote: string) => {
          execSync(`git remote add origin ${remote}`);
          execSync('git add .');
          rl.question('Please enter your commit: ', (commit: string) => {
            execSync(`git commit -m "${commit}"`);
            rl.close();
          });
          rl.question('On which branch to commit: ', (branch: string) => {
            display.info('default branch is master or main');
            if (branch === '') {
              // eslint-disable-next-line no-param-reassign
              branch = 'master';
              execSync(`git push --set-upstream origin ${branch}`);
            } else {
              execSync(`git push --set-upstream origin ${branch}`);
            }
            rl.close();
          });
          exitScript(0);
        },
      );
    } else {
      exitScript(1);
    }
  });
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
    exitScript(0);
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
    exitScript(0);
    rl.close();
  });
};

export const gitDefaultPush = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  display.info('Give branch if new branch or For first push to default branch');
  rl.question('On which branch to commit: ', (branch: string) => {
    if (branch === '') {
      display.log('commiting to default branch');
      execSync(`git push`);
    } else if (branch === 'new' || branch === 'master' || branch === 'main') {
      display.log(`creating or pushing to ${branch} branch`);
      execSync(`git push --set-upstream origin ${branch}`);
    }
    exitScript(0);
    rl.close();
  });
};

export const gitBranch = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  display.info('Give branch name to switch or Create new one');
  rl.question(
    'Create new branch or switch to another one: ',
    (branch: string) => {
      if (branch === 'switch' || branch === 'n' || branch === 's') {
        display.log('Switching to another branch');
        rl.question('Enter branch name: ', (anotherBranch: string) => {
          execSync(`git checkout ${anotherBranch}`);
          rl.close();
          exitScript(0);
        });
      } else if (branch === 'new' || branch === 'y') {
        rl.question('Enter branch name: ', (newBranch: string) => {
          display.log(`creating new branch  to ${newBranch} branch`);
          execSync(`git checkout -b ${newBranch}`);
          execSync('git branch');
          exitScript(0);
          rl.close();
        });
      }
      rl.close();
    },
  );
};

export const tailwind = () => {
  display.log('Adding tailwindcss to your project...📦');
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

  display.info('Add following to your css file');
  display.log('@tailwind base;');
  display.log('@tailwind components;');
  display.log('@tailwind utilities;');
  exitScript(0);
};

export const next = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  display.log('Creating nextjs project...📦');
  rl.question(
    'Do you want to proceed with auto-generated project or setIt up manually? [y/n]: ',
    (input) => {
      if (input === 'y') {
        display.log('Proceeding with the automatic-setup...⚙️');
        rl.question('enter project name:', (projectName: string) => {
          execSync(
            `npx create-next-app --example with-tailwindcss ${projectName}`,
          );
          exitScript(0);
        });
      } else {
        display.log('Manual setup for nextjs will begin...⚒️');
        rl.question('Enter project name:', (project: string) => {
          const projectDirectory = `${project}`;
          const projectName = path.join(process.cwd(), projectDirectory);
          if (!fs.existsSync(projectDirectory)) {
            fs.mkdirSync(projectDirectory);
          }
          execSync(`cd ${projectName} && npm init -y`);
          if (!fs.existsSync(`${projectName}/app`)) {
            fs.mkdirSync(`${projectName}/app`);
          }
          execSync(
            `cd ${projectName} && npm install next@latest react@latest react-dom@latest eslint-config-next@latest`,
          );
          const packageJson = {
            name: projectName,
            version: '1.0.0',
            description: '',
            main: 'index.js',
            scripts: {
              dev: 'next dev',
              build: 'next build',
              start: 'next start',
              lint: 'next lint',
            },
            keywords: [],
            author: 'mstomar698',
            license: 'ISC',
            dependencies: {
              'eslint-config-next': '^13.1.6',
              next: '^13.1.6',
              react: '^18.2.0',
              'react-dom': '^18.2.0',
            },
          };
          fs.writeFileSync(
            path.join(projectName, 'package.json'),
            JSON.stringify(packageJson, null, 2),
          );
          const nextconfigJson = `
            /** @type {import('next').NextConfig} */
      const nextConfig = {
        experimental: {
          appDir: true,
        },
      };
      
      module.exports = nextConfig;`;
          fs.writeFileSync(
            path.join(projectName, 'next.config.json'),
            nextconfigJson,
          );
          const pageTsx = `
          export default function Page() {
            return <h1>Hello, Next.js!</h1>;
          }
      `;
          fs.writeFileSync(path.join(projectName, 'app', 'page.tsx'), pageTsx);
          const layoutTsx = `
          export default function RootLayout({ children }) {
            return (
              <html lang="en">
                <body>{children}</body>
              </html>
            );
          }
      `;
          fs.writeFileSync(
            path.join(projectName, 'app', 'layout.tsx'),
            layoutTsx,
          );
        });
        exitScript(0);
      }
    },
  );
};

export const nextTaiwind = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  display.log('Manual setup for nextjs with tailwind will begin...⚒️');
  rl.question('enter project name:', (project: string) => {
    const projectDirectory = `${project}`;
    const projectName = path.join(process.cwd(), projectDirectory);
    if (!fs.existsSync(projectDirectory)) {
      fs.mkdirSync(projectDirectory);
    }
    execSync(`cd ${projectName} && npm init -y`);
    if (!fs.existsSync(`${projectName}/app`)) {
      fs.mkdirSync(`${projectName}/app`);
    }
    execSync(
      `cd ${projectName} && npm install next@latest react@latest react-dom@latest eslint-config-next@latest`,
    );
    const packageJson = {
      name: 'new-folder',
      version: '1.0.0',
      description: '',
      main: 'index.js',
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
      },
      keywords: [],
      author: 'mstomar698',
      license: 'ISC',
      dependencies: {
        'eslint-config-next': '^13.1.6',
        next: '^13.1.6',
        react: '^18.2.0',
        'react-dom': '^18.2.0',
      },
    };
    fs.writeFileSync(
      path.join(projectName, 'package.json'),
      JSON.stringify(packageJson, null, 2),
    );
    const nextconfigJson = `
      /** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;`;
    fs.writeFileSync(
      path.join(projectName, 'next.config.json'),
      nextconfigJson,
    );
    const pageTsx = `
    export default function Page() {
      return <h1>Hello, Next.js!</h1>;
    }
`;
    fs.writeFileSync(path.join(projectName, 'app', 'page.tsx'), pageTsx);
    const layoutTsx = `
    export default function RootLayout({ children }) {
      return (
        <html lang="en">
          <body>{children}</body>
        </html>
      );
    }
`;
    fs.writeFileSync(path.join(projectName, 'app', 'layout.tsx'), layoutTsx);

    display.log('Adding Tailwind to created next app');
    execSync(
      `cd ${projectName} && npm install -D tailwindcss postcss autoprefixer`,
    );
    execSync(`cd ${projectName} && npx tailwindcss init -p`);
    const configFile = `module.exports = {
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

    writeFileSync('tailwind.config.js', configFile, 'utf8');
    display.log('Add the following to your CSS file:');
    display.log('@tailwind base;');
    display.log('@tailwind components;');
    display.log('@tailwind utilities;');
  });
  exitScript(0);
};

export const react = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  display.log('Creating react project...🚀');

  rl.question(
    'Do you want to proceed with react-automated-setup or setup react with tailwind manually? [y/n]: ',
    (input) => {
      if (input === 'y') {
        display.log('Proceeding with the automatic setup...⚙️');
        rl.question('Enter project name:', (projectName: string) => {
          execSync(
            `npx create-react-app ${projectName} --template cra-template-tailwindcss`,
          );
        });
        exitScript(0);
      } else {
        display.log('Manual setup for react will begin...⚒️');
        rl.question('Enter project name:', (projectName: string) => {
          execSync(`npx create-react-app ${projectName}`);
          process.chdir(`${projectName}`);

          display.log('Adding Tailwind to created creat app...🚀');
          execSync('npm install -D tailwindcss postcss autoprefixer');
          execSync('npx tailwindcss init -p');
          const configFile = `module.exports = {
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
          writeFileSync('tailwind.config.js', configFile, 'utf8');

          display.log('Add the following to your CSS file:');
          display.log('@tailwind base;');
          display.log('@tailwind components;');
          display.log('@tailwind utilities;');
        });
        exitScript(0);
      }
    },
  );
};

export const reactTailwind = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  display.log('Manual setup for react with tailwind will begin...⚒️');
  rl.question('Enter project name:', (projectName: string) => {
    execSync(`npx create-react-app ${projectName}`);
    process.chdir(`${projectName}`);

    display.log('Adding Tailwind to created react app...🚀');
    execSync('npm install -D tailwindcss postcss autoprefixer');
    execSync('npx tailwindcss init -p');
    const configFile = `module.exports = {
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
    writeFileSync('tailwind.config.js', configFile, 'utf8');

    display.log('Add the following to your CSS file:');
    display.log('@tailwind base;');
    display.log('@tailwind components;');
    display.log('@tailwind utilities;');
    exitScript(0);
  });
};

export const mern = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  display.log('Creating MERN project structure...🚀');
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
                  const pathFile = `${parentPath}/${name}`;
                  if (typeof content === 'string') {
                    fs.writeFileSync(pathFile, content);
                  } else {
                    fs.mkdirSync(pathFile);
                    createFolderStructure(content, pathFile);
                  }
                });
              };
              // Create the folder structure for the MERN application
              createFolderStructure(FOLDER_STRUCTURE, ROOT_FOLDER);
              // Install the dependencies for the MERN application
              display.info(
                'All file structure has been setUp you can now set up libraries as per preference',
              );
              close(0);
            } else {
              display.warn(
                'Please switch to directory where u want to initiate the project',
              );
            }
          },
        );
        exitScript(0);
      } else {
        display.log('Manual setup for MERN project structure will begin...⚒️');
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
                  const pathFile = `${parentPath}/${name}`;
                  if (typeof content === 'string') {
                    fs.writeFileSync(pathFile, content);
                  } else {
                    fs.mkdirSync(pathFile);
                    createFolderStructure(content, pathFile);
                  }
                });
              };
              createFolderStructure(FOLDER_STRUCTURE, ROOT_FOLDER);
              const packageConfig = `hello mern template`;
              writeFileSync('package.json', packageConfig, 'utf8');
              display.log('Structure with code has been setUp');
              exitScript(0);
            } else {
              display.warn(
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
          display.error('Something went wrong ');
        }
        exitScript(0);
      } else {
        display.warn(
          'Please switch to directory where u want to initiate the project',
        );
      }
    },
  );
};

export const webpack = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  display.log('Creating a webpack project...🚀');
  rl.question(
    'The Directory where project shall be initialized:',
    (directory: string) => {
      const projectName = `${directory}`;
      const projectDirectory = path.join(process.cwd(), projectName);
      if (!fs.existsSync(projectDirectory)) {
        fs.mkdirSync(projectDirectory);
      }
      const webPackInstallation =
        'npm install webpack webpack-cli typescript ts-loader --save-dev';
      const reactInstallation =
        'npm install react react-dom @types/react @types/react-dom --save';
      execSync(`cd ${projectDirectory} && npm init -y`);
      if (!fs.existsSync(`${projectDirectory}/src`)) {
        fs.mkdirSync(`${projectDirectory}/src`);
      }
      execSync(`cd ${projectDirectory} && npm install ${webPackInstallation}}`);
      execSync(`cd ${projectDirectory} && npm install ${reactInstallation}}`);
      // Create tsconfig.json file
      const tsconfigJson = {
        compilerOptions: {
          outDir: './dist/',
          sourceMap: true,
          strict: true,
          module: 'es6',
          target: 'es5',
          jsx: 'react',
        },
      };
      fs.writeFileSync(
        path.join(projectDirectory, 'tsconfig.json'),
        JSON.stringify(tsconfigJson, null, 2),
      );
      // Create index.html file
      const indexHtml = `
      <!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./dist/bundle.js"></script>
  </body>
</html>
      `;
      fs.writeFileSync(
        path.join(projectDirectory, 'src', 'index.html'),
        indexHtml,
      );
      // Create index.ts file
      const indexTs = `
          import React from 'react';
          import ReactDOM from 'react-dom';
          
          ReactDOM.render(
            <h1>Hello, World!</h1>,
            document.getElementById('root')
          );
      `;
      fs.writeFileSync(path.join(projectDirectory, 'src', 'index.ts'), indexTs);
      // Create webpack.config.js file
      const webpackConfig = `
        const path = require('path');
module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
  },
};
      };`;
      fs.writeFileSync(
        path.join(projectDirectory, 'webpack.config.js'),
        webpackConfig,
      );
      // Create package.json file
      const packageJson = {
        name: projectName,
        version: '1.0.0',
        description: '',
        main: 'index.tsx',
        scripts: {
          start: 'webpack serve --mode development',
          build: 'webpack --mode production',
        },
        keywords: [],
        author: 'mstomar698',
        license: 'ISC',
        dependencies: {
          '@types/react': '^18.0.28',
          '@types/react-dom': '^18.0.11',
          install: '^0.13.0',
          npm: '^9.5.0',
          react: '^18.2.0',
          'react-dom': '^18.2.0',
          'ts-loader': '^9.4.2',
          typescript: '^4.9.5',
          webpack: '^5.75.0',
          'webpack-cli': '^5.0.1',
        },
      };
      fs.writeFileSync(
        path.join(projectDirectory, 'package.json'),
        JSON.stringify(packageJson, null, 2),
      );

      display.log(
        'Webpack template created successfully! \n  and can be run on http://localhost:9000 \nby running npm run build and npm run start',
      );
      exitScript(0);
    },
  );
};
