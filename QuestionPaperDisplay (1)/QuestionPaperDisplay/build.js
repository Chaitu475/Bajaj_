#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building frontend and backend...');

// Build frontend and backend
execSync('vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });

// Copy frontend build to server directory for local development
const sourceDir = path.resolve('dist/public');
const targetDir = path.resolve('server/public');

if (fs.existsSync(sourceDir)) {
  // Remove existing public directory
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  
  // Copy files
  fs.cpSync(sourceDir, targetDir, { recursive: true });
  console.log('Frontend build copied to server/public');
} else {
  console.error('Frontend build not found at dist/public');
  process.exit(1);
}

// Create a production start script
const startScript = `#!/usr/bin/env node
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Change to the correct directory
process.chdir(require('path').resolve(require('path').dirname(require('url').fileURLToPath(import.meta.url))));

// Import and start the server
import('./index.js');
`;

fs.writeFileSync('dist/start.js', startScript);
console.log('Production start script created');

console.log('Build completed successfully!');