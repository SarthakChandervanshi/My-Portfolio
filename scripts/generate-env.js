#!/usr/bin/env node
// Reads .env, obfuscates secrets, and writes env.js for the static site.
const fs = require('fs');
const path = require('path');

const SALT = 'portfolio-web3forms-v1';
const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env');
const outPath = path.join(root, 'env.js');

function encodeKey(key) {
  const salt = Buffer.from(SALT, 'utf8');
  const bytes = Buffer.from(key, 'utf8');
  const out = Buffer.alloc(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    out[i] = bytes[i] ^ salt[i % salt.length];
  }
  return out.toString('base64');
}

if (!fs.existsSync(envPath)) {
  console.error('Missing .env — copy .env.example to .env and set WEB3FORMS_ACCESS_KEY.');
  process.exit(1);
}

let key = '';
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eq = trimmed.indexOf('=');
  if (eq === -1) continue;
  const name = trimmed.slice(0, eq).trim();
  let val = trimmed.slice(eq + 1).trim();
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1);
  }
  if (name === 'WEB3FORMS_ACCESS_KEY') key = val;
}

if (!key) {
  console.error('WEB3FORMS_ACCESS_KEY not set in .env');
  process.exit(1);
}

const encoded = encodeKey(key);
fs.writeFileSync(
  outPath,
  'window.ENV = { WEB3FORMS_ACCESS_KEY: ' + JSON.stringify(encoded) + ' };\n'
);
console.log('Generated env.js (obfuscated key)');
