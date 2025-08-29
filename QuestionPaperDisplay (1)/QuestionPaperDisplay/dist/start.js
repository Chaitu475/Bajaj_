#!/usr/bin/env node
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Change to the correct directory
process.chdir(require('path').resolve(require('path').dirname(require('url').fileURLToPath(import.meta.url))));

// Import and start the server
import('./index.js');
