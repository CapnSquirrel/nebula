const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    library: 'nebula',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ohm$/,
        use: 'raw-loader',
      },
    ],
  },
};
