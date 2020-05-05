module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: [
    'detox',
    'jest',
  ],
  env: {
    'react-native/react-native': true,
    'detox/detox': true,
    'es6': true,
    'jest/globals': true,
    'node': true,
  },
};
