var path = require('path')

var config = {
  entry: path.resolve('./app/app.tsx'),
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  // resolve: {
  //   extensions: ['' ,'.webpack.js','.web.js','.ts','.tsx','.js']
  // },
  module : {
    loaders : [
      {
        test : /\.tsx?/,
        include : path.resolve('app'),
        loader : 'ts-loader'
      }
    ]
  }
};

module.exports = config;