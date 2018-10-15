const webpack = require('webpack');
const argv = require('yargs').argv;
let envToBeInjected = {
  API_HOST: argv.port,
  API_PORT: argv.host
};

module.exports = function(webpackConfig, env) {
  envToBeInjected = Object.assign(envToBeInjected, {NODE_ENV: env});
// 对roadhog默认配置进行操作，比如：
  webpackConfig.plugins[0] = new webpack.DefinePlugin({
    'process.env': JSON.stringify(envToBeInjected)
  });

  return webpackConfig;
};
