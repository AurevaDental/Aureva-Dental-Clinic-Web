// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://aurevadental.com',
  trailingSlash: 'never',
  output: 'server',
  adapter: vercel(),
  redirects: {
    '/treatments/root-canal-treatment': '/root-canal-treatment-hennur',
    '/treatments/dental-crowns': '/dental-crowns-hennur',
    '/treatments/wisdom-tooth-removal': '/wisdom-tooth-removal-hennur',
    '/treatments/teeth-whitening': '/teeth-whitening-hennur'
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});