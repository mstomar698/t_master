// engine

// import { env } from 'node:process';
// import shell from 'shelljs';
// import chalk from 'chalk';
import parseArgv from 'arg';
import { commands } from '../utils/commands';
import { helpText } from '../utils/text-templates';
import type { Arguments } from '../types/engine-types';

/**
 * Parses the program's `process.argv` and returns the options and arguments.
 *
 * @returns The parsed options and arguments.
 */
export const parseArguments = (): Arguments => parseArgv(commands);

export const getHelpText = (): string => helpText;
