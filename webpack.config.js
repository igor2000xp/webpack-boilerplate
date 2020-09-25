import { path } from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { MiniCssExtractPlugin } from 'mini-css-extract-plugin';

import { HtmlWebpackPlugin } from 'html-webpack-plugin';

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: ['./src/index.js', './src/sass/style.scss'],
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, '/build'),
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
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
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

    plugins: [
      isProduction ? new CleanWebpackPlugin() : () => {},
      new HtmlWebpackPlugin({
        favicon: './src/img/favicon.ico',
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ],
  };

  return config;
};
