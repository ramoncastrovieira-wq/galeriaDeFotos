const modoDev = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: modoDev ? 'development' : 'production',
  entry: './src/index.js',
  devServer: {
    static: './build',
    port: 9000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  output: {
    filename: 'app.js',
    path: __dirname + '/build',
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'estilo.css' }),
    new CopyWebpackPlugin({
      patterns: [
        { context: 'src/', from: '**/*.html' },
        { context: 'src/', from: 'imgs/**/*' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,

          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              api: 'legacy',
              sassOptions: {
                silenceDeprecations: [
                  'legacy-js-api',
                  'import',
                  'slash-div',
                  'color-functions',
                  'global-builtin',
                ],
                quietDeps: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
