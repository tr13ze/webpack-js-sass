const webpack = require("webpack");
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPLugin = require('clean-webpack-plugin')
const dev = process.env.NODE_ENV === "dev"

let config = {
  entry: {
    app: ['./src/scss/app.scss', './src/js/app.js']
  },
  watch: dev,
  output: {
    path: path.resolve('./dist/'),
    filename: 'js/[name].js'
  },
  devtool: dev
    ? "cheap-module-eval-source-map"
    : false,
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
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: !dev
              }
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
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: '../'
        }
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: '../'
            }
          }, {
            loader: 'img-loader',
            options: {
              enabled: !dev
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css', disable: dev
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPLugin(['dist'])
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    overlay: true,
    compress: true,
    historyApiFallback: true,
    inline: true,
    port: 9000
  }
}

if (!dev) {
  config
    .plugins
    .push(new UglifyJsPlugin({sourceMap: false}))

}

module.exports = config