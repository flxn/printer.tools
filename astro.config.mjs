// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://printer.tools',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [react(), sitemap({
    customPages: [
      'https://printer.tools/qrcode2stl',
    ]
  }), icon()],

  redirects: {
    '/posts/privacy': '/privacy',
    '/qrcode2stl': {
      status: 301,
      destination: 'https://qrcode2stl.printer.tools'
    }
  },

  vite: {
    plugins: [tailwindcss()]
  }
});