#!/usr/bin/env node

import boxen from 'boxen';
import chalk from 'chalk';
import { display } from './utils/display';
import { argument } from './cli/argument';
import type { DisplayValue } from './types/static-types';

await argument();

const message = chalk.green('Welcome 🙌 to "Template Master"');
// function to print welcome message
function console(Value: DisplayValue) {
  const consoleDisplay = display.log(
    boxen(Value, {
      padding: 1,
      borderColor: 'green',
      margin: 1,
    }),
  );
  return consoleDisplay;
}
console(message);
