const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true
      },
      resolver: {
        /* resolver options */
        sourceExts: ['jsx', 'js', 'ts', 'tsx'] // add tsx if its not yet defined
      }
    })
  }
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
