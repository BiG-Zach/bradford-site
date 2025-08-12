// scripts/tunnel.js
/* eslint-disable no-console */
import waitOn from 'wait-on';
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

const PORT = process.env.PORT ?? 5173;
const DOMAIN = process.env.NGROK_DOMAIN ?? 'bradfordinformedguidance.ngrok-free.app';
const isWin = process.platform === 'win32';

async function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function waitForVite() {
  const resources = [`tcp:${PORT}`, `http://127.0.0.1:${PORT}`, `http://localhost:${PORT}`];
  console.log(`[TUNNEL] Waiting for Vite on: ${resources.join(' | ')}`);
  await waitOn({
    resources,
    validateStatus: s => s >= 200 && s < 500,
    timeout: 120000,
    interval: 250
  });
  console.log('[TUNNEL] Vite is responding — starting ngrok…');
}

function candidateNgrokBins() {
  const bins = [];
  if (process.env.NGROK_PATH) bins.push(process.env.NGROK_PATH);     // explicit override
  bins.push('ngrok');                                                 // PATH / winget alias
  if (isWin) bins.push('ngrok.exe');

  // local project fallback (if you `npm i -D ngrok`)
  const localBin = path.join(process.cwd(), 'node_modules', '.bin');
  bins.push(path.join(localBin, isWin ? 'ngrok.cmd' : 'ngrok'));

  // common Windows locations
  if (isWin) {
    bins.push(path.join(os.homedir(), 'AppData', 'Local', 'Programs', 'ngrok', 'ngrok.exe'));
    bins.push('C:\\Program Files\\ngrok\\ngrok.exe');
  }
  return bins;
}

function spawnCmd(bin, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, {
      stdio: 'inherit',
      shell: isWin // lets `.cmd` shims run from Git Bash/PowerShell
    });
    child.once('error', reject);
    child.once('spawn', () => resolve(child));
  });
}

function openInBrowser(url) {
  console.log(`[TUNNEL] Opening: ${url}`);
  try {
    if (isWin) {
      // "start" needs to run via cmd; empty title ("") is required for URLs with &
      spawn('cmd', ['/c', 'start', '', url], { stdio: 'ignore', detached: true });
    } else if (process.platform === 'darwin') {
      spawn('open', [url], { stdio: 'ignore', detached: true });
    } else {
      spawn('xdg-open', [url], { stdio: 'ignore', detached: true });
    }
  } catch (e) {
    console.warn('[TUNNEL] Could not auto-open browser:', e?.message || e);
  }
}

async function waitForNgrokUrl({ domain, timeoutMs = 30000 }) {
  const deadline = Date.now() + timeoutMs;
  const api = 'http://127.0.0.1:4040/api/tunnels';

  while (Date.now() < deadline) {
    try {
      const res = await fetch(api);
      if (res.ok) {
        const data = await res.json();
        let tunnel = null;

        if (domain) {
          tunnel = data.tunnels?.find(t => t.public_url?.includes(domain));
        }
        if (!tunnel) {
          // fallback: first https public tunnel
          tunnel = data.tunnels?.find(t => t.public_url?.startsWith('https://'));
        }

        if (tunnel?.public_url) return tunnel.public_url;
      }
    } catch {
      // ngrok may not have started its API yet; just retry
    }
    await wait(500);
  }
  return null;
}

async function startNgrok() {
  const args = ['http', `--domain=${DOMAIN}`, `http://localhost:${PORT}`];
  const bins = candidateNgrokBins();

  let child = null;
  for (const bin of bins) {
    try {
      console.log(`[TUNNEL] Trying: ${bin} ${args.join(' ')}`);
      child = await spawnCmd(bin, args);
      console.log(`[TUNNEL] Using ngrok binary: ${bin}`);
      break;
    } catch (err) {
      console.warn(`[TUNNEL] Failed to start ${bin}: ${err.code || err.message}`);
    }
  }

  if (!child) {
    console.error('[TUNNEL] Could not find ngrok. Install it, set NGROK_PATH, or `npm i -D ngrok`.');
    process.exit(1);
  }

  // Try to fetch the public URL and open it
  (async () => {
    const url = await waitForNgrokUrl({ domain: DOMAIN, timeoutMs: 30000 });
    if (url) {
      console.log(`[TUNNEL] Public URL: ${url}`);
      openInBrowser(url);
    } else {
      console.warn('[TUNNEL] Could not read public URL from ngrok API (4040). You can open it manually.');
    }
  })();

  const shutdown = () => {
    console.log('\n[TUNNEL] Shutting down ngrok…');
    try { child.kill('SIGINT'); } catch {}
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  child.on('exit', code => {
    console.log(`[TUNNEL] ngrok exited with code ${code ?? 0}`);
    process.exit(code ?? 0);
  });
}

(async () => {
  try {
    console.log(`[TUNNEL] Target domain: ${DOMAIN}`);
    console.log(`[TUNNEL] Local target: http://localhost:${PORT}`);
    await waitForVite();
    await startNgrok();
  } catch (err) {
    console.error('[TUNNEL] Error:', err?.message || err);
    process.exit(1);
  }
})();

