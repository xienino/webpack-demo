const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    polyfills:'./src/polyfills.js',
    index:'./src/index.js'
  },
  output: {
    filename: [name].bundle.js,
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[
      {
        test:require.resolve('index.js'),
        use:'imports-loader?this=>window'
      },  //通过imports-loader覆写环境指针this
      {
        test:require.resolve('globals.js'),
        use:'export-loader?file,parse=helpers.parse'
      }   // 在不改动globals.js的基础上
          // 为了将globals.js中的helpers对象的parse属性作为一个普通模块导出
    ]
  },
  plugins:[
    new webpack.ProvidePlugin({
      // _:'lodash'    
      join:['lodash','join']
    })
  ]
};

// 如果你遇到了至少一处用到 lodash 变量的模块实例，
// 那请你将 lodash package 包引入进来，
// 并将其提供给需要用到它的模块。