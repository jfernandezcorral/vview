const path = require('path');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})
module.exports = env => {
  let config = {
    devtool: 'source-map',
    entry: ['./src/index.js'],
    output: {
      path: path.resolve(__dirname,'./dist'),
      filename: 'index_bundle.js'
    },
    devServer: {
      host: "0.0.0.0",
    },
    module: {
      rules: [
        {test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ["@babel/preset-env", "@babel/preset-react"]
            }
        },
        { test: /\.scss$/, 
            use: [
                'style-loader',
                {loader: 'css-loader', options: {modules: true}},
                {loader: 'sass-loader', options: {sourceMap: true}}
              ]
          },
          { test: /\.css$/, 
            use: [
                {loader:'style-loader'},
                {loader: 'css-loader', options: {modules: true}}
              ]
        },  
        {test: /\.js$/, use: ['source-map-loader'], enforce: "pre", include:[path.resolve(__dirname, "../lib/index.js")]},
        {
          test: /\.(eot|woff|woff2|ttf|svg)(\?[\s\S]+)?$/,
          use: [{
            loader: 'file-loader',
            options: { name: '[path][name].[ext]'}
          }]
        }
      ]
    },
    plugins: [
      new DuplicatePackageCheckerPlugin({ emitError: true }),
      HtmlWebpackPluginConfig
    ]
  };
  return config;
};