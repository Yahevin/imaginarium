const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();

const isDevelopment = process.env.NODE_ENV ==='development';
const plugins =  [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({template: './src/index.html'}),
];


const config = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    app: path.resolve(__dirname, 'src/index.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, './.babelrc')
        },
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png)$/,
        include: path.resolve(__dirname, 'src/img'),
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
      '@my-app': path.resolve(__dirname, 'packages'),
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
    contentBase: path.resolve(__dirname, 'dist'),
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
