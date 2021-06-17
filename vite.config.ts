import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import sass from 'sass';
// eslint-disable-next-line import/no-extraneous-dependencies
import sassPlugin from 'rollup-plugin-sass';
// eslint-disable-next-line import/no-extraneous-dependencies
import copy from 'rollup-plugin-copy';
// eslint-disable-next-line import/no-extraneous-dependencies
import vue from '@vitejs/plugin-vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import dts from 'rollup-plugin-dts';

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
      name: 'qui-max'
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
        dts(),
        sassPlugin({
          runtime: sass,
          output(_: string, styleNodes: [{ id: string; content: string }]) {
            styleNodes.forEach(styleNode => {
              const splittedPath = styleNode.id.split('/');
              const fileName = splittedPath[splittedPath.length - 1].replace(
                '.scss',
                '.css'
              );

              if (!existsSync('dist/css')) mkdirSync('dist/css');
              if (!existsSync('dist/icons')) mkdirSync('dist/icons');
              if (!existsSync('dist/fonts')) mkdirSync('dist/fonts');

              let fileDir = 'css';
              if ('icons.css'.includes(fileName)) {
                fileDir = 'icons';
              } else if ('fonts.css'.includes(fileName)) {
                fileDir = 'fonts';
              }

              writeFileSync(`dist/${fileDir}/${fileName}`, styleNode.content);
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
            },
            {
              src: 'src/assets',
              dest: 'dist/assets'
            }
          ],
          verbose: true,
          hook: 'closeBundle'
        })
      ]
    }
  }
});
