const path = require('path');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = {
  stories: ['../stories/**/**/*.stories.@(ts|js|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
    '@storybook/addon-storysource'
  ],
  core: {
    builder: 'webpack5'
  },
  webpackFinal: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');

    return config;
  }
};
