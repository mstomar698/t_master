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
  next,
  react,
  tailwind,
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
    hasRust: boolean,
    hasNext: boolean,
    hasCreate: boolean,
    hasMern: boolean,
    hasTailwind: boolean,
    hasExpress: boolean,
    hasPip: boolean,
    hasDjango: boolean,
    hasFlask: boolean,
    hasNpm: boolean,
    hasJavascript: boolean,
    hasTypescript: boolean,
    hasPython: boolean,
    hasWebpack: boolean,
    hasWebAssembly: boolean,
    hasGit: boolean,
    hasCommit: boolean,
    hasPush: boolean,
    hasMongo: boolean,
    hasBranch: boolean,
    hasNode = false;

  for (let i = 0; i < argString.length; i++) {
    if (argString[i]?.toLowerCase() === 'create') {
      hasCreate = true;
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

  if (hasCreate) {
    runCreateModule();
  }

  const Git = hasGit || hasCommit || hasPush || hasBranch;
  if (Git) {
    runGitCommands();
  }

  function runCreateModule() {
    display.log('For creating full apps');
    for (let i = 0; i < argString.length; i++) {
      if (argString[i]?.toLowerCase() === 'express') {
        hasExpress = true;
      } else if (argString[i]?.toLowerCase() === 'npm') {
        hasNpm = true;
      } else if (argString[i]?.toLowerCase() === 'node') {
        hasNode = true;
      } else if (argString[i]?.toLowerCase() === 'react') {
        hasReact = true;
      } else if (argString[i]?.toLowerCase() === 'next') {
        hasNext = true;
      } else if (argString[i]?.toLowerCase() === 'typescript') {
        hasTypescript = true;
      } else if (argString[i]?.toLowerCase() === 'javascript') {
        hasJavascript = true;
      } else if (argString[i]?.toLowerCase() === 'rust') {
        hasRust = true;
      } else if (argString[i]?.toLowerCase() === 'python') {
        hasPython = true;
      } else if (argString[i]?.toLowerCase() === 'pip') {
        hasPip = true;
      } else if (argString[i]?.toLowerCase() === 'webpack') {
        hasWebpack = true;
      } else if (argString[i]?.toLowerCase() === 'mern') {
        hasMern = true;
      } else if (argString[i]?.toLowerCase() === 'mongo') {
        hasMongo = true;
      } else if (argString[i]?.toLowerCase() === 'webassembly') {
        hasWebAssembly = true;
      } else if (argString[i]?.toLowerCase() === 'django') {
        hasDjango = true;
      } else if (argString[i]?.toLowerCase() === 'flask') {
        hasFlask = true;
      }
    }
    if (hasReact) {
      display.log('react');
      if (hasTailwind) {
        display.log('tailwind');
      }
    }
    if (hasNext) {
      display.log('next');
      if (hasTailwind) {
        display.log('tailwind');
      }
    }
    if (hasMern) {
      display.log('mern');
      if (hasTailwind) {
        display.log('tailwind');
      }
      if (hasMongo) {
        display.log('mongo');
      }
      if (hasNext) {
        display.log('next');
      }
    }
    if (hasWebAssembly) {
      display.log('webassembly');
      if (hasRust) {
        display.log('rust');
      }
    }
    if (hasWebpack) {
      display.log('webpack');
      if (hasJavascript) {
        display.log('javascript');
      }
      if (hasTypescript) {
        display.log('typescript');
      }
    }
    if (hasDjango) {
      display.log('django');
      if (hasPython) {
        display.log('python');
      }
      if (hasPip) {
        display.log('pip');
      }
      if (hasFlask) {
        display.log('flask');
      }
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

  // check cases
  // if (hasReact && hasTailwind && hasCreate) {
  //   display.log('react, tailwind and create');
  // } else if (hasReact && hasTailwind) {
  //   display.log('react and tailwind');
  // } else if (hasReact && hasCreate) {
  //   display.log('react and create');
  // } else if (hasTailwind && hasCreate) {
  //   display.log('tailwind and create');
  // } else if (hasReact) {
  //   display.log('react');
  // } else if (hasTailwind) {
  //   display.log('tailwind');
  // } else if (hasCreate) {
  //   display.log('create');
  // } else if (hasRust && hasNext && hasMern) {
  //   display.log('rust, next and mern');
  // } else if (hasExpress && hasNode) {
  //   display.log('express and node');
  // } else if (hasPip && hasDjango) {
  //   display.log('pip and django');
  // } else if (hasFlask && hasPython) {
  //   display.log('flask and python');
  // } else if (hasNpm && hasJavascript) {
  //   display.log('npm and javascript');
  // } else if (hasTypescript && hasJavascript) {
  //   display.log('typescript and javascript');
  // } else {
  //   display.log('No match');
  // }
}
