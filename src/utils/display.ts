// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import chalk from 'chalk';

const info = (...message: string[]) => {
  console.info(chalk.cyanBright.bold(' INFO '), ...message);
};

const warn = (...message: string[]) => {
  console.warn(chalk.bgYellowBright.bold(' WARN '), ...message);
};

const error = (...message: string[]) => {
  console.error(chalk.bgRedBright.bold(' ERROR '), ...message);
};

const log = console.log;

export const display = { info, warn, error, log };
