const path = require('path');

module.exports = {
  stories: ['../stories/**/**/*.stories.@(ts|js|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.stories\.ts?$/],
          include: [path.resolve(__dirname, '../src')] // You can specify directories
        },
        loaderOptions: {
          parser: 'typescript'
        }
      }
    }
  ],
  core: {
    builder: 'webpack5'
  },
  webpackFinal: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');

    return config;
  }
};
