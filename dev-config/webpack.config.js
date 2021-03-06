/**
 * webpack配置入口文件
 */
const configs = require('require-dir')('./configs')
const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = configs.constants

//设置开发时源代码映射工具
const devTool = __DEV__ ? 'cheap-module-eval-source-map' : 'source-map'
const jsPrefixPath = 'js'
module.exports = {
  devtool: devTool,
  devServer: configs.devServer,
  entry: configs.entry.apps,
  output: { // 输出的目录和文件名
    path: BUILD_PATH,
    filename: !__DEV__ ? `${jsPrefixPath}/[name].js` : `${jsPrefixPath}/[name].js`,
    chunkFilename: `${jsPrefixPath}/[name].chunk.js`,
    sourceMapFilename: 'maps/[file].map'
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    enforceExtension: false,
    extensions: ['.js', '.jsx', '.less', '.styl', '.json'], // require的时候可以直接使用require('file')，不用require('file.js')
    alias: configs.alias
  },
  module: {
    rules: configs.rules
  },
  plugins: configs.plugins
}
