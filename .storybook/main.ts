const path = require('path');

module.exports = {
  stories: ['../stories/**/**/*.stories.@(ts|js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { actions: false }
    },
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/preset-scss'
  ],
  core: {
    builder: 'webpack5'
  },
  // @ts-ignore
  webpackFinal: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');

    return config;
  }
};
