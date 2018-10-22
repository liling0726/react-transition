/**
 * 全局配置
 */
const { entryObject } = require('./entry')

const { APPS_PATH, __DEV__, NODE_ENV, pathTool, isWebpackDevServer } = require('./constants')
const srcRelative = pathTool.relative.bind(pathTool, APPS_PATH)
const htmlPaths = Object.keys(entryObject).map(n => srcRelative(entryObject[n]) + '.html')

module.exports = {
  htmlPaths: htmlPaths,
  title: 'babel-react-boilerplate',
  apiUrl: `http://localhost:3604`, //如果配了这个  就会走后端的反向代理
  favicon: '/assets/img/favicon.ico',
  isWebpackDevServer,
  __DEV__,
  NODE_ENV
}
