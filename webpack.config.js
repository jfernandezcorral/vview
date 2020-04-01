const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
module.exports = (env, argv) => {
  let config = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'index.min.js',
      libraryTarget: "umd",
      library: 'vview',
      umdNamedDefine: true,
    },
    module:{
        rules:[
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
                    {loader: 'css-loader', options: {camelCase: true, minimize: true, modules: true/*, localIdentName: '[name]__[local]___[hash:base64:5]'*/, sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}}
                  ]
              },
              { test: /\.css$/, 
                use: [
                    {loader:'style-loader'},
                    {loader: 'css-loader', options: {camelCase: true, minimize: true, modules: true/*, localIdentName: '[name]__[local]___[hash:base64:5]'*/, sourceMap: true}}
                  ]
              },
              {
                test: /\.(woff|png|gif|svg)$/,
                loader: 'url-loader',
              }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js','.css', '.scss'],
    },
    externals : {
        react : {
            commonjs2: "react",
            commonjs: "react",
            amd: "react",
            root: "React"
          },
          'react-dom' : {
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom",
            root: "ReactDOM"
          },
    },
    plugins: [
      new DuplicatePackageCheckerPlugin({ emitError: true })
    ]
  };
  if (argv.mode === 'development') {
    config.output.filename = 'index.js';
  }
  else{
    //config.plugins.push(new CleanWebpackPlugin(['lib']))
  }
  return config;
};
