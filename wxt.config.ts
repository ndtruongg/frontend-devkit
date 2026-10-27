import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  imports: false,
  vite: () => ({ plugins: [tailwindcss()] }),
  manifest: {
    name: 'Frontend DevKit',
    description: 'Local-first frontend developer utilities. Foundation in progress.',
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'none'; connect-src 'none'",
    },
  },
});
