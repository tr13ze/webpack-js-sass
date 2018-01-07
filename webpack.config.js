const webpack = require("webpack");
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const dev = process.env.NODE_ENV === "dev"

let config = {
  entry: './src/js/app.js',
  watch: dev,
  output: {
    path: path.resolve('./dist/js'),
    filename: 'bundle.js',
    publicPath: "/js/"
  },
  devtool: dev
    ? "cheap-module-eval-source-map"
    : "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",

          use: [
            {
              loader: 'css-loader'
            }, {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: 'postcss.config.js'
                }
              }
            }, {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin({filename: '[name].css', disable: dev})],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    overlay: true,
    compress: true,
    port: 9000
  }
}

if (!dev) {
  config
    .plugins
    .push(new UglifyJsPlugin({sourceMap: true}))

}

module.exports = config