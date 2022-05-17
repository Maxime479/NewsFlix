// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

// module.exports = getDefaultConfig(__dirname);
module.exports = (async () => {
    const {
        resolver: { sourceExts },
    } = await getDefaultConfig(__dirname);
    return {
        transformer: {
            babelTransformerPath: require.resolve("react-native-css-transformer"),
        },
        resolver: {
            sourceExts: [...sourceExts, "css"],
        },
    };
})();
