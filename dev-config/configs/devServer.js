const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = require('./constants')
/**
 * 开发服务配置
 */
module.exports = {
  openPage: 'index.html',
  useLocalIp: true,
  host: '0.0.0.0',
  overlay: true,
  hot: true,
  open: true,
  port: 7000,
  contentBase: BUILD_PATH,
  publicPath: PUBLIC_PATH,
  inline: true,
  disableHostCheck: true,
  // clientLogLevel: 'warning', // none, error, warning or info (default).
  // HTML5 History API
  historyApiFallback: true,
  // watchOptions: {
  //     aggregateTimeout: 300, // rebuild 延时, wait so long for more changes
  //     ignored: /node_modules/,
  //     poll: 1000, // Check for changes every second
  // },
  quiet: true, // 让dev server处于静默的状态启动(控制台中不输出打包的信息)
  noInfo: false, // set to false to see a list of every file being bundled.
  headers: { 'X-Custom-Header': 'yes' },
  proxy: require('./proxy'),
  //https: true
}
