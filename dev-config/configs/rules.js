/**
 * 文件处理
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = require('./constants')
const lessLoaderVars = {}
const { getCssRules } = require('./rules.css')

let rules = [ // 定义各种loader
  {
    test: /\.pug$/,
    loader: 'pug-loader',
    options: {
      pretty: true
    }
  },
  {
    test: /\.jsx?$/,
    use: [
      {
        loader: 'eslint-loader'
        // options: {
        //   fix: false
        // }
      }
    ],
    exclude: /(node_modules)/,
    enforce: 'pre'
  },
  ...getCssRules({
    __DEV__,
    cssModules: false,
    extract: !__DEV__
  }),
  //files
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'images/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'media/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]

if (__DEV__) {
  rules.push({
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    use: [
      { loader: 'react-hot-loader' },
      {
        loader: 'babel-loader'
      }
    ]
  })
} else {
  //生产环境
  rules.push({
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    use: [{
      loader: 'babel-loader'
    },
    {
      loader: 'strip-loader',
      options: { strip: ['logger.info', 'logger.debug', 'console.log', 'console.debug'] }
    }
    ]
  })
}
module.exports = rules
