const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

const nothing = () => {};

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const isAnalyze = env.analyze;

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval',
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
            'style-loader',
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
      static: './src/',
      port: 9000,
    },
    plugins: [
      isProduction ? new CleanWebpackPlugin({}) : nothing,
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      isAnalyze ? new BundleAnalyzerPlugin() : nothing,
      isProduction
        ? new CopyWebpackPlugin({ patterns: [{ from: './src/static', to: '.' }] })
        : nothing,
    ],
  };
};
