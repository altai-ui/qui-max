import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import sass from 'sass';
import sassPlugin from 'rollup-plugin-sass';
import copy from 'rollup-plugin-copy';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
/* eslint-enable import/no-extraneous-dependencies */

import type { IdAndContentObject } from 'rollup-plugin-sass/dist/types';

// https://vitejs.dev/config/
export default defineConfig({
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
  plugins: [
    dts({
      staticImport: true,
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/**/*.d.ts', 'types/**/*.ts']
    }),
    vue()
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/qComponents/index.ts'),
      name: 'QuiMax'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      treeshake: true,
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      },
      plugins: [
        sassPlugin({
          runtime: sass,
          output(_: string, styleNodes: IdAndContentObject[]) {
            styleNodes.forEach(styleNode => {
              const splittedPath = styleNode.id?.split('/') ?? [];
              const fileName = splittedPath[splittedPath.length - 1].replace(
                '.scss',
                '.css'
              );

              if (!existsSync('dist')) mkdirSync('dist');
              if (!existsSync('dist/css')) mkdirSync('dist/css');
              if (!existsSync('dist/icons')) mkdirSync('dist/icons');
              if (!existsSync('dist/fonts')) mkdirSync('dist/fonts');

              let fileDir = 'css';
              if ('icons.css'.includes(fileName)) {
                fileDir = 'icons';
              } else if ('fonts.css'.includes(fileName)) {
                fileDir = 'fonts';
              }

              writeFileSync(
                `dist/${fileDir}/${fileName}`,
                styleNode?.content ?? ''
              );
            });
          }
        }),
        copy({
          targets: [
            {
              src: [
                'src/fonts/Urbanist-Bold.woff2',
                'src/fonts/Urbanist-ExtraBold.woff2',
                'src/fonts/Urbanist-Medium.woff2',
                'src/fonts/Urbanist-Regular.woff2'
              ],
              dest: 'dist/fonts'
            },
            {
              src: 'src/icons/qicon.woff',
              dest: 'dist/icons'
            },
            {
              src: 'src/assets',
              dest: 'dist'
            }
          ],
          verbose: true,
          hook: 'closeBundle'
        })
      ]
    }
  }
});
