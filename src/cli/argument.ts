// To take arguments

import { display, close, template } from '../utils';
import manifest from '../../package.json';
import { args, console, getHelpText, script } from './cli';

export const argChecker = () => {
  if (args[0] === '--help') {
    display.log(getHelpText());
    close(0);
  } else if (args[0] === '--version') {
    display.log(manifest.version);
    close(0);
  } else if (args[0] === '--tailwind') {
    script('t');
    close(0);
  } else if (args[0] === '--nextjs') {
    script('n');
    close(0);
  } else if (args[0] === '--git') {
    script('g');
    close(0);
  } else if (args.length > 1) {
    if (typeof args[0] === 'string') {
      display.log(args);
      close(0);
    }
    close(0);
  } else if (args.length === 0) {
    // function to print welcome message
    console(template.message);
    display.log('No arguments passed');
  }

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
};
