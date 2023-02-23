// engine

import shell from 'shelljs';
import boxen from 'boxen';
import { template, display, exitScript } from '../utils';
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
} from './script-loader';
import type { DisplayValue } from '../types/static-types';

// For ibuilt argument parser
export const args: string[] = process.argv.slice(2);

export const getHelpText = (): string => template.helpText;

export const getStringHelpText = (): string => template.stringHelpText;

export const script = (arg: string) => {
  switch (arg) {
    case 'g':
      git();
      break;
    case 'r':
      react();
      break;
    case 'n':
      next();
      break;
    case 'm':
      mern();
      break;
    case 'w':
      webpack();
      break;
    case 't':
      tailwind();
      break;
    default:
      exitScript(1);
  }
};

export function printArgs(...arg: string[]): void {
  if (arg.length > 0) {
    display.log(...arg);
  }
}

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
    hasString: boolean,
    hasHelp: boolean,
    hasNode = false;

  for (let i = 0; i < argString.length; i++) {
    if (argString[i]?.toLowerCase() === 'create') {
      hasCreate = true;
    } else if (argString[i]?.toLowerCase() === 'help') {
      hasHelp = true;
    } else if (argString[i]?.toLowerCase() === 'string') {
      hasString = true;
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
  if (hasHelp) {
    if (hasString) {
      display.log(getStringHelpText());
    } else {
      display.log(getHelpText());
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
    for (let i = 0; i < argString.length; i++) {
      if (argString[i]?.toLowerCase() === 'react') {
        hasReact = true;
      } else if (argString[i]?.toLowerCase() === 'next') {
        hasNext = true;
      } else if (argString[i]?.toLowerCase() === 'webpack') {
        hasWebpack = true;
      } else if (argString[i]?.toLowerCase() === 'mern') {
        hasMern = true;
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
