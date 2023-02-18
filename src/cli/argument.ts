// To take arguments

import { display, close, template } from '../utils';
import manifest from '../../package.json';
import { args, console, getHelpText, printArgs, script } from './cli';

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
    } else if (args[0] === '--tailwind' || args[0] === '-t') {
      script('t');
    } else if (args[0] === '--nextjs' || args[0] === '-n') {
      script('n');
    } else if (args[0] === '--reactjs' || args[0] === '-r') {
      script('r');
    } else if (args[0] === '--git' || args[0] === '-g') {
      script('g');
    }
  } else if (args.length >= 2) {
    display.info('The arumenst passed are:');
    printArgs(...args);
    display.error(
      'The aruments passed are not valid or too many aruments passed to see passable arguments use --help or -h',
    );
    close(1);
  } else {
    display.error('Something went wrong');
    close(1);
  }
};

// await promise(parseArguments());
// const outPutString = inputString[0];
// const outPutParam = inputString[0];
// const outPutParam2 = inputString[2];

// const [parseError, args] = await promise(parseArguments());
// // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
// if (parseError || !args) {
//   display.error(parseError.message);
//   close(0);
// }
// args
// if (args['--help']) {
//   display.log(getHelpText());
//   close(0);
// }

// if (args['--version']) {
//   display.log(manifest.version);
//   close(0);
// }
