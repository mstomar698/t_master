import * as readline from 'readline';
import { execSync } from 'child_process';
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

  rl.question('Do you want to install nextjs? [y/n]: ', (input: string) => {
    if (input === 'y') {
      display.log('Installing nextjs');
      execSync('npm install next react react-dom');
      display.log('Creating nextjs project');
      execSync('npx create-next-app');
      rl.close();
    } else {
      display.log('Please install nextjs manually');
      rl.close();
    }
  });
};

export const tailwind = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    'Do you want to install tailwindcss? [y/n]: ',
    (input: string) => {
      if (input === 'y') {
        display.log('Installing tailwindcss');
        execSync('npm install tailwindcss');
        display.log('Creating tailwindcss project');
        execSync('npx tailwindcss init');
        rl.close();
      } else {
        display.log('Please install tailwindcss manually');
        rl.close();
      }
    },
  );
};
