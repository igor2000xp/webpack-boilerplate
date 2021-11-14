const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

const nothing = () => {};

const isProduction = process.options.mode === 'production';
const isAnalyze = process.env.analyze;

const config = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'none' : 'source-map',
  watch: !isProduction,
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  resolve: {
    extensions: ['.js', '.json', '.mjs'],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      }, {
        test: /\.(png|svg|jpe?g|gif|ttf)$/,
        use: {
          loader: 'file-loader',
        },
      }, {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: './src/static/',
  },
  plugins: [
    isProduction ? new CleanWebpackPlugin({}) : nothing,
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './src/style.scss',
    }),
    isAnalyze ? new BundleAnalyzerPlugin() : nothing,
    isProduction
      ? new CopyWebpackPlugin({ patterns: [{ from: './src/static', to: '.' }] })
      : nothing,
  ],
};

export default config;
