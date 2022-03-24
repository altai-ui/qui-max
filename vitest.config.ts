import { resolve } from 'path';
/* eslint-disable import/no-extraneous-dependencies */
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
/* eslint-disable import/no-extraneous-dependencies */

export default defineConfig(() => ({
  plugins: [vue()],
  resolve: {
    alias: [
      // @/xxxx => src/xxxx
      {
        find: /^@\/(.+)/,
        replacement: `${resolve(__dirname, 'src')}/$1`
      },
      // #/xxxx => types/xxxx
      {
        find: /^#\/(.+)/,
        replacement: `${resolve(__dirname, 'types')}/$1`
      }
    ]
  },
  test: {
    environment: 'happy-dom',
    coverage: {
      reportsDirectory: `${resolve(__dirname, 'tests/unit/coverage')}`
    }
  }
}));
