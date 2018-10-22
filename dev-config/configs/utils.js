/**
 * 其他配置或工具
 */
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-px2rem')

//使用postcss作为默认的CSS编译器
exports.postCSSConfig = [
  // px2rem({ remUnit: 75 }),
  autoprefixer({
    browsers: [
      'last 3 versions',
      'ie >= 9',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 6',
      'opera >= 12.1'
    ]
  })
]
