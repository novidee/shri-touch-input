const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SOURCE_FOLDER = 'src';
const BUILD_FOLDER = 'docs';

module.exports = {
  entry: `./${SOURCE_FOLDER}/scripts/index.ts`,
  output: {
    path: path.resolve(__dirname, BUILD_FOLDER),
    filename: 'script.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: `${SOURCE_FOLDER}/index.html`
      },
      {
        from: `${SOURCE_FOLDER}/style.css`
      },
      {
        from: `${SOURCE_FOLDER}/images`,
        to: 'images'
      }
    ])
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
};
