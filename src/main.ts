#!/usr/bin/env node

import { display } from './utils/display';

function add(a: number, b: number) {
  return a + b;
}
display.log(add(1, 6));