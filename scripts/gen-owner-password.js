#!/usr/bin/env node
/**
 * Simple helper to generate a bcrypt hash for the demo OWNER password.
 * Usage:
 *   node scripts/gen-owner-password.js "YourPassword!"
 * Or interactively (it will prompt for a password):
 *   node scripts/gen-owner-password.js
 *
 * If run with --write it will update .env.local (creates file if missing)
 * and set OWNER_PASSWORD_HASH to the generated value.
 */

const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

function prompt(question) {
  return new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', (data) => resolve(data.toString().trim()));
  });
}

async function main() {
  const args = process.argv.slice(2).filter(Boolean);
  const writeFlag = args.includes('--write');
  const candidates = args.filter((a) => a !== '--write');
  let password = candidates[0];

  if (!password) {
    password = await prompt('Password to hash: ');
  }

  if (!password) {
    console.error('No password provided');
    process.exit(1);
  }

  const hash = bcrypt.hashSync(password, 10);
  console.log('Bcrypt hash: ' + hash);

  if (writeFlag) {
    const envPath = path.resolve(process.cwd(), '.env.local');
    let content = '';
    if (fs.existsSync(envPath)) content = fs.readFileSync(envPath, 'utf8');

    const lines = content.split(/\r?\n/).filter(Boolean).filter((l) => !l.startsWith('OWNER_PASSWORD_HASH='));
    lines.push(`OWNER_PASSWORD_HASH=${hash}`);
    fs.writeFileSync(envPath, lines.join('\n') + '\n', { encoding: 'utf8' });
    console.log('Updated .env.local with OWNER_PASSWORD_HASH');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
