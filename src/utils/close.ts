// code exiting the cli

import { exit } from 'shelljs';
// eslint-disable-next-line import/no-cycle
import { console } from '../cli/cli';
import { display } from './display';

export function close(x: number) {
  if (x === 0) {
    display.info('Gracefully shutting down. Please wait...');
    exit(1);
  } else {
    display.warn('Force-closing...');
    exit(0);
  }
}

export function exitScript(x: number) {
  if (x === 0) {
    console('Script executed successfully! 🎉');
    exit(1);
  } else {
    console('Script ran in some issue 😥');
    exit(0);
  }
}
