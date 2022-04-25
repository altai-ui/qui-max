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
  webpackFinal: (config: any) => {
    if (!config.resolve?.alias) return config;

    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    config.module.rules.push({ test: /\.scss$/, sideEffects: true });

    return config;
  }
};
