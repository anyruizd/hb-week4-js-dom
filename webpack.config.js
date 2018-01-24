const path = require('path')
module.exports = {
  entry: {
    landing: './src/main.js',
    gallery: './src/gallery/main.js',
    movies: './src/movies/movies.js'
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: './public/[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  }
}
