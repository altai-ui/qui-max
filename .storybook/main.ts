const path = require('path');

module.exports = {
  stories: ['../stories/**/**/*.stories.@(ts|js|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/preset-scss'
  ],
  core: {
    builder: 'webpack5'
  },
  webpackFinal: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');

    return config;
  }
};
