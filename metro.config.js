/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
<<<<<<< HEAD
        inlineRequires: true
=======
        inlineRequires: false
>>>>>>> 000880b (fix(app): fixed app)
      },
      resolver: {
        /* resolver options */
        sourceExts: ['jsx', 'js', 'ts', 'tsx'] // add tsx if its not yet defined
      }
    })
  }
}
