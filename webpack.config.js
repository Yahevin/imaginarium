const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    polyfill: '@babel/polyfill',
    app: './src/main.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: path.resolve(__dirname, 'src/assets'),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src/assets'),
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/assets/styles'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader'],
        }),
      },
    ],
  },
  resolve: {
    extensions: [ '.js', '.vue','.scss' ],
    alias: {
      'vue$': 'vue/dist/vue.runtime.js',
      '@': path.resolve(__dirname, 'src'),
    }
  },

  devServer: {
    contentBase: './dist',
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
    port: 8000,
    stats: {
      normal: true
    }
  },

  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({template: './src/assets/index.html'}),
    new ExtractTextPlugin('style.css'),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8000,
    })
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js'
  },
};