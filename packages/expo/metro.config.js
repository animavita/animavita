const {createMetroConfiguration} = require('expo-yarn-workspaces');

const config = createMetroConfiguration(__dirname);

config.server = {
  enhanceMiddleware: middleware => {
    return (req, res, next) => {
      const assets = '/ui/assets/';
      if (req.url.startsWith(assets)) {
        // At the beginning of the path to your assets should always be "/assets/"
        // Next exit from the current directory
        req.url = req.url.replace(assets, '/assets/../ui/assets/');
      }

      // Fix showing back icon on android
      // This is necessary if you are working with react-navigation and
      // it is installed globally for monorepo.
      const otherAssets = '/node_modules/';
      if (req.url.startsWith(otherAssets)) {
        req.url = req.url.replace(otherAssets, '/assets/../../node_modules/');
      }

      return middleware(req, res, next);
    };
  },
};

module.exports = config;
