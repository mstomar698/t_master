// To take arguments

import { display, close, template, exitScript } from '../utils';
import manifest from '../../package.json';
import {
  args,
  console,
  getHelpText,
  getStringHelpText,
  printArgs,
  script,
  wordChecker,
} from './cli';

export const argChecker = () => {
  if (args.length === 0) {
    console(template.message);
    display.info('To see passable arguments use --help or -h');
  } else if (args.length === 1) {
    if (args[0] === '--help' || args[0] === '-h') {
      display.log(getHelpText());
      close(0);
    } else if (args[0] === '--version' || args[0] === '-v') {
      display.log(manifest.version);
      close(0);
    } else if (args[0] === '--git' || args[0] === '-g') {
      script('g');
    } else if (args[0] === '--reactjs' || args[0] === '-r') {
      script('r');
    } else if (args[0] === '--nextjs' || args[0] === '-n') {
      script('n');
    } else if (args[0] === '--mern' || args[0] === '-m') {
      script('m');
    } else if (args[0] === '--webpack' || args[0] === '-w') {
      script('w');
    } else if (args[0] === '--tailwind' || args[0] === '-t') {
      script('t');
    } else if (args[0] === '-sh') {
      display.log(getStringHelpText());
      close(0);
    } else {
      const parsedStringArray: string[] = args[0]?.split(' ') as string[];
      wordChecker(parsedStringArray);
    }
  } else if (args.length < 3) {
    if (args[0] === '--string' && args[1] === '--help') {
      display.log(getStringHelpText());
      close(0);
    }
    display.error(
      'The aruments passed are not valid or too many aruments passed to see passable arguments use --help or -h',
    );
    exitScript(1);
  } else if (args.length >= 3) {
    display.info('The arumenst passed are:\n');
    printArgs(...args);
    display.error(
      'The aruments passed are not valid or too many aruments passed to see passable arguments use --help or -h',
    );
    exitScript(1);
  } else {
    display.error('Something went wrong');
    close(1);
  }
};
