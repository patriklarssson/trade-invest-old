/* eslint-disable */
export default {
  displayName: 'components-ui',
  preset: '../../jest.preset.js',
  transform: {
    // '^.+\\.[tj]sx?$': 'babel-jest',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/components-ui',
  snapshotSerializers: [
    '@emotion/jest/serializer'
  ],
};


/* eslint-disable */
// export default {
//   displayName: 'theme',
//   preset: '../../jest.preset.js',
//   transform: {
//     '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
//     '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
//   },
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//   coverageDirectory: '../../coverage/libs/theme',
// };
