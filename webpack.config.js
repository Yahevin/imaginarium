const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackProvideGlobalPlugin = require("webpack-provide-global-plugin");
const dotenv = require('dotenv');
dotenv.config();

const isDevelopment = process.env.NODE_ENV ==='development';

console.log(process.env.NODE_ENV);

const plugins =  [
  new CleanWebpackPlugin(),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({template: './src/assets/index.html'}),
  new ExtractTextPlugin('style.css'),
  new WebpackProvideGlobalPlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
];

if(isDevelopment) {
  plugins.push(new BrowserSyncPlugin({
    host: '127.0.0.1',
    port: process.env.PORT,
  },),)
}

let config = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
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
        options: {
          scss: ['vue-style-loader','css-loader','sass-loader'],
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src/assets'),
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/assets'),
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            {loader: 'css-loader', options: {  importLoaders: 1 }},
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts'
          },
        }],
      },
      {
        test: /\.(jpg|png)$/,
        include: path.resolve(__dirname, 'src/assets/img'),
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img'
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: [ '.js', '.vue','.scss','.png','jpg' ],
    alias: {
      'vue$': 'vue/dist/vue.runtime.js',
      '@': path.resolve(__dirname, 'src'),
      jquery: "jquery/src/jquery",
    }
  },
  
  plugins: plugins,
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js'
  },
};

if(isDevelopment) {
  config.devServer = {
    contentBase: './dist',
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
    port: process.env.PORT,
    stats: {
      normal: true
    },
  }
}

module.exports = config;
