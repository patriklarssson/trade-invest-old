const path = require('path');
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  addons: ['@storybook/addon-interactions', '@storybook/addon-a11y'],
  features: {
    interactionsDebugger: true,
  },
  webpackFinal: async (config, { configType }) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          '@emotion/styled': toPath('node_modules/@emotion/styled'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    };
  },
};
