// engine

// import { env } from 'node:process';
// import chalk from 'chalk';
import shell from 'shelljs';
import parseArgv from 'arg';
import boxen from 'boxen';
import { commands, template, display, close } from '../utils';
import { git, next, tailwind } from './script-loader';
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
export const args = process.argv.slice(2);

export const getHelpText = (): string => template.helpText;

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

export const script = (arg: string) => {
  switch (arg) {
    case 't':
      tailwind();
      close(0);
      break;
    case 'n':
      next();
      close(0);
      break;
    case 'g':
      git();
      close(0);
      break;
    default:
      close(0);
  }
  // const MainPath: Path = process.env.APPDATA;
  // display.log(await script(arg1));
  // const scripString = (await script(arg1)) as string;
  // shell.exec(scripString);
  // shell.exec(`bash ./script.sh`)
  // shell
  //   .cat(`${MainPath}/npm/node_modules/t_master/build/accessories/gscript.sh`)
  //   .to('script.sh');
  // shell.exec('bash https://t-master-mstomar698.vercel.app/tscript.sh');
};

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
