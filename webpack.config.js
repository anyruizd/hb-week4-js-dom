const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSASS = new ExtractTextPlugin('public/[name].css')

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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader?sourceMap']
        })
      }
    ]
  },
  plugins: [
    extractSASS,
    new UglifyJsPlugin({
      uglifyOptions: {
        beautify: false,
        ecma: 6,
        compress: true,
        comments: false
      }
    })
  ]
}
