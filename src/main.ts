#!/usr/bin/env node

import { argChecker } from './cli/argument';
import type { Path } from './types/static-types';

// npm directory file location
const MainPath: Path = process.env.APPDATA;

// function to get argument from cli and print output
argChecker(MainPath);
