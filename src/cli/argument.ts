// To take arguments

import { display } from '../utils/display';
import { close } from '../utils/exit';
import { promise } from '../utils/promise';
import manifest from '../../package.json';
import { getHelpText, parseArguments } from './cli';

export const argument = async () => {
  const [parseError, args] = await promise(parseArguments());
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (parseError || !args) {
    display.error(parseError.message);
    close(0);
  }

  // args
  if (args['--help']) {
    display.log(getHelpText());
    close(0);
  }

  if (args['--version']) {
    display.log(manifest.version);
    close(0);
  }
};
