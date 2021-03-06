const webpack = require('webpack');
const withSass = require('@zeit/next-sass');

const isProduction = (process.env.NODE_ENV || 'production') === 'production';

module.exports = withSass({
  webpack(config) {
    const newConfig = Object.assign({}, config);
    const envs = [{ name: 'NODE_ENV', default: 'development' }, 'API_URL', 'BASE_PATH'];
    const definePluginOptions = {};

    envs.forEach(e => {
      const envName = typeof e === 'object' ? e.name : e;
      const envValue = process.env[envName] || (typeof e === 'object' ? e.default : undefined);
      definePluginOptions[`process.env.${envName}`] = JSON.stringify(envValue);
    });

    // @ts-ignore
    newConfig.plugins.push(new webpack.DefinePlugin(definePluginOptions));

    return newConfig;
  },
  assetPrefix: isProduction ? process.env.BASE_PATH : '',
});
