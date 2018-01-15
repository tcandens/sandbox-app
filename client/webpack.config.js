const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index.tsx',
    ]
  },
  output: {
    filename: '[hash:8].[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: [
      '.trainer.com',
    ],
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          'ts-loader',
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx', '.ts', '.js', '.jsx',
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
