/**
 * 插件配置
 */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// webpack-md5-hash不需要再使用了
// https://sebastianblade.com/using-webpack-to-achieve-long-term-cache/ const
// WebpackMd5Hash = require('webpack-md5-hash')
const utils = require('./utils')
const globalConfig = require('./globalConfig')
const {
  pathTool,
  TEMPLATE_PATH,
  TEMPLATE_PATH_PUG,
  PUBLIC_PATH,
  ROOT_PATH,
  APP_PATH,
  BUILD_PATH,
  NODE_ENV,
  __DEV__
} = require('./constants')
const devServer = require('./devServer')
let chunks = ['vendor', 'webview-common']
// const CompressionPlugin = require('compression-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// 在 vscode 上显示webpack进度 需要在vscode上安装插件webpack-progress
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin')
const ProgressPlugin = require('progress-webpack-plugin')

const {getHtmlPlugins} = require('./plugins.html')

let plugins = [
  new BitBarWebpackProgressPlugin(), new ProgressPlugin(true), new FriendlyErrorsWebpackPlugin(), new webpack.BannerPlugin('This file is created by hbq'), // 生成文件时加上注释
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    '__DEV__': JSON.stringify(__DEV__)
  }),
  // split vendor js into its own file
  new webpack
    .optimize
    .CommonsChunkPlugin({
      name: 'webview-common',
      filename: `js/[name].js`,
      minChunks (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
        module.resource && /\.js$/.test(module.resource) &&
        /node_modules/.test(module.resource) && !/qrcode/i.test(module.resource))
      }
    }),
  new CopyWebpackPlugin([
    {
      from: 'src/assets',
      to: 'assets'
    }
  ]),
  // new ExtractTextPlugin('style/[name].[contenthash:8].css'),
  new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true
  })
]

if (__DEV__) {
  plugins = plugins.concat([
    ...getHtmlPlugins(__DEV__),
    new webpack.HashedModuleIdsPlugin(),
    // Use NoErrorsPlugin for webpack 1.x 这个插件1.x版本以上不需要 new
    // webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/'
      }
    })
    // new webpack.SourceMapDevToolPlugin(     {} ), 现在使用rules做sourcemap 此插件会导致变卡
    // new webpack.optimize.UglifyJsPlugin({     sourceMap: true })
  ])
} else {
  plugins = plugins.concat([
    ...getHtmlPlugins(__DEV__),
    // new CompressionPlugin({   asset: "[path].gz[query]",   algorithm: "gzip",
    // test: /\.js$|\.css$|\.html$/,   threshold: 10240,   minRatio: 0, }),
    new webpack
      .optimize
      .UglifyJsPlugin({
        sourceMap: true,
        // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,
        ie8: true,
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句 还可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true
        }
      }),
    // 提取Loader定义到同一地方
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: '/'
      }
    }),
    new webpack
      .optimize
      .AggressiveMergingPlugin() // Merge chunks
  ])
}
module.exports = plugins
