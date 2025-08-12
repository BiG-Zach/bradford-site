import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const domain = env.NGROK_DOMAIN;        // set only in `npm run live`
  const useNgrok = !!domain;

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      ...(useNgrok
        ? {
            origin: `https://${domain}`,
            allowedHosts: [domain],
            hmr: {
              protocol: 'wss',
              host: domain,
              clientPort: 443
            }
          }
        : {})
    }
  };
});



