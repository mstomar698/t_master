// engine

// import { env } from 'node:process';
// import chalk from 'chalk';
import shell from 'shelljs';
import parseArgv from 'arg';
import boxen from 'boxen';
import { commands, template, display, close } from '../utils';
import {
  git,
  gitDefaultBranchCommit,
  gitDefaultCommit,
  gitDefaultPush,
  mern,
  mernTailwind,
  next,
  nextTaiwind,
  react,
  reactTailwind,
  tailwind,
  webpack,
  webpackTailwind,
} from './script-loader';
import type { Args, DisplayValue, Path } from '../types/static-types';
import type { Arguments } from '../types/engine-types';

// For arg library
/**
 * Parses the program's `process.argv` and returns the options and arguments.
 *
 * @returns The parsed options and arguments.
 */
export const parseArguments = (): Arguments => parseArgv(commands);

// For ibuilt argument parser
export const args: string[] = process.argv.slice(2);

export const getHelpText = (): string => template.helpText;

export const script = (arg: string) => {
  switch (arg) {
    case 't':
      tailwind();
      break;
    case 'n':
      next();
      break;
    case 'r':
      react();
      break;
    case 'g':
      git();
      break;
    default:
      close(0);
  }
};

export function printArgs(...arg: string[]): void {
  if (arg.length > 0) {
    display.log(...arg);
  }
}

export const copyFile = (arg1: Path, arg2: Args, arg3: Args, arg4: Args) => {
  shell
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    .cat(`${arg1}/npm/node_modules/t_master/build/accessories/${arg2}`)
    .to(`${arg3}`);
  display.log(`${arg4} has been created successfully,👍`);
};

export const npmInstaller = (arg1: Args, arg2: Args) => {
  shell.exec(`npm install ${arg1} ${arg2}`);
  display.log(`${arg1 + arg2} has been installed successfully,👍`);
};

export const cliCommand = (
  argument1: Args,
  argument2: Args,
  argument3: Args,
) => {
  shell.exec(`${argument1} ${argument2} ${argument3}`);
  display.log(
    `${argument1 + argument2 + argument3} has been installed successfully,👍`,
  );
};

export function console(Value: DisplayValue) {
  const consoleDisplay = display.log(
    boxen(Value, {
      padding: 1,
      borderColor: 'green',
      margin: 1,
    }),
  );
  return consoleDisplay;
}

export function wordChecker(argString: string[]) {
  let hasReact: boolean,
    hasTailwind: boolean,
    hasNext: boolean,
    hasCreate: boolean,
    hasMern: boolean,
    hasWebpack: boolean,
    hasGit: boolean,
    hasCommit: boolean,
    hasPush: boolean,
    hasBranch: boolean,
    hasNpm: boolean,
    // hasJavascript: boolean,
    // hasTypescript: boolean,
    hasNode = false;

  for (let i = 0; i < argString.length; i++) {
    if (argString[i]?.toLowerCase() === 'create') {
      hasCreate = true;
    } else if (argString[i]?.toLowerCase() === 'node') {
      hasNode = true;
    } else if (argString[i]?.toLowerCase() === 'npm') {
      hasNpm = true;
    } else if (argString[i]?.toLowerCase() === 'tailwind') {
      hasTailwind = true;
    } else if (argString[i]?.toLowerCase() === 'git') {
      hasGit = true;
    } else if (argString[i]?.toLowerCase() === 'commit') {
      hasCommit = true;
    } else if (argString[i]?.toLowerCase() === 'push') {
      hasPush = true;
    } else if (argString[i]?.toLowerCase() === 'branch') {
      hasBranch = true;
    }
  }
  const Git = hasGit || hasCommit || hasPush || hasBranch;
  const Create = hasCreate || hasNode || hasNpm;
  if (Create) {
    runCreateModule();
  }

  if (Git) {
    runGitCommands();
  }

  function runCreateModule() {
    display.log('For creating full-stack applications');
    for (let i = 0; i < argString.length; i++) {
      if (argString[i]?.toLowerCase() === 'react') {
        hasReact = true;
      } else if (argString[i]?.toLowerCase() === 'next') {
        hasNext = true;
      } else if (argString[i]?.toLowerCase() === 'webpack') {
        hasWebpack = true;
      } else if (argString[i]?.toLowerCase() === 'mern') {
        hasMern = true;
      } else if (argString[i]?.toLowerCase() === 'django') {
        hasDjango = true;
      }
    }
    if (hasReact) {
      if (hasTailwind) {
        display.log('creating tailwind inbuilt react app');
        reactTailwind();
      } else {
        display.log('This will automate create react app procedure');
        react();
      }
    } else if (hasNext) {
      if (hasTailwind) {
        display.log('creating tailwind inbuilt next app');
        nextTaiwind();
      } else {
        display.log('This will automate create next app procedure');
        next();
      }
    } else if (hasMern) {
      if (hasTailwind) {
        display.log('creating mern template with tailwind inuilt in it');
        mernTailwind();
      } else {
        display.log(
          'This will automate MERN setup with follwing accessories:\n',
        );
        display.log('MongoDb\nExpress\nReact\nNode\n');
        mern();
      }
    } else if (hasWebpack) {
      display.log('Creating a webpack project');
      webpack();
    }
  }

  function runGitCommands() {
    display.log('For committing data over git');
    for (let i = 0; i < argString.length; i++) {
      if (argString[i]?.toLowerCase() === 'git') {
        hasGit = true;
      } else if (argString[i]?.toLowerCase() === 'commit') {
        hasCommit = true;
      } else if (argString[i]?.toLowerCase() === 'push') {
        hasPush = true;
      } else if (argString[i]?.toLowerCase() === 'branch') {
        hasBranch = true;
      }
    }
    // switches for various keywords
    if (hasCommit && hasPush && hasBranch) {
      display.log('Running git manual script..');
      git();
    } else if (hasCommit && hasPush) {
      display.log('Adding, commiting and pushing to default branch');
      gitDefaultBranchCommit();
    } else if (hasCommit) {
      display.log('Adding and commiting default branch');
      gitDefaultCommit();
    } else if (hasPush) {
      display.log('Pushing to default branch');
      gitDefaultPush();
    } else if (hasBranch) {
      display.log('switching branch');
      gitDefaultPush();
    } else {
      display.log('showing status');
      shell.exec('git status');
    }
  }
}
