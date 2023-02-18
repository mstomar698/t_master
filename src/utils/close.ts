// code exiting the cli

import { exit } from "shelljs";
import { display } from "./display";

export function close(x: number) {
    if (x === 0) {
      display.info('Gracefully shutting down. Please wait...');
      exit(1);
    } else {
      display.warn('Force-closing...');
      exit(0);
    }
  }