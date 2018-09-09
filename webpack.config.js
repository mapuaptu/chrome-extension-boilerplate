const path = require('path');
const { imageminLoader } = require('imagemin-webpack');
const imageminOptipng = require('imagemin-optipng');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/background.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'background.js',
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
          {
            loader: imageminLoader,
            options: {
              cache: true,
              bail: false,
              imageminOptions: {
                plugins: [
                  imageminOptipng({
                    optimizationLevel: 7,
                  }),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src',
        to: './[name].[ext]',
        test: /\.(html|json)$/,
        ignore: ['*.js', '*.png'],
      },
    ]),
  ],
};
