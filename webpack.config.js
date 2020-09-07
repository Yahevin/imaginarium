const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();

const isDevelopment = process.env.NODE_ENV ==='development';
console.log(process.env.NODE_ENV);

const plugins =  [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({template: './src/assets/index.html'}),
];


const config = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    polyfill: '@babel/polyfill',
    app: './src/main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src/assets'),
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
    extensions: [ '*', '.tsx', '.ts', '.js', '.jsx', '.png','jpg' ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
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
