/* eslint-disable import/no-extraneous-dependencies */
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import sass from 'sass';
import sassPlugin from 'rollup-plugin-sass';
import copy from 'rollup-plugin-copy';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: `${resolve(__dirname, '/src')}/`
      }
    ]
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/qComponents/index.ts'),
      name: 'qui-max',
      formats: ['es']
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
          output(_, styleNodes: [{ id: string; content: string }]) {
            styleNodes.forEach(styleNode => {
              const splittedPath = styleNode.id.split('/');
              const fileName = splittedPath[splittedPath.length - 1].replace(
                '.scss',
                '.css'
              );
              if (!existsSync('dist/css')) mkdirSync('dist/css');
              if (!existsSync('dist/icons')) mkdirSync('dist/icons');
              if (!existsSync('dist/fonts')) mkdirSync('dist/fonts');
              if ('icons.css'.includes(fileName)) {
                writeFileSync(`dist/icons/${fileName}`, styleNode.content);
              } else if ('fonts.css'.includes(fileName)) {
                writeFileSync(`dist/fonts/${fileName}`, styleNode.content);
              } else {
                writeFileSync(`dist/css/${fileName}`, styleNode.content);
              }
            });
          }
        }),
        copy({
          targets: [
            {
              src: [
                'src/fonts/Gilroy-Bold.woff',
                'src/fonts/Gilroy-ExtraBold.woff',
                'src/fonts/Gilroy-Medium.woff',
                'src/fonts/Gilroy-Regular.woff'
              ],
              dest: 'dist/fonts'
            },
            {
              src: 'src/icons/qicon.woff',
              dest: 'dist/icons'
            }
          ],
          verbose: true,
          hook: 'closeBundle'
        })
      ]
    }
  }
});
