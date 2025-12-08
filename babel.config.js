// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   plugins: [
//     'react-native-reanimated/plugin', // <-- required for Reanimated 2+
//   ],
//    plugins: [
//     ['@babel/plugin-transform-runtime', { regenerator: true }]
//   ],
//   plugins: [
//     ["react-native-worklets-core/plugin"],
//     // other plugins like 'react-native-reanimated/plugin' if used
//   ],
// };
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // required for Reanimated 2+
    ['@babel/plugin-transform-runtime', { regenerator: true }],
    'react-native-worklets-core/plugin', // if you use worklets
  ],
};
