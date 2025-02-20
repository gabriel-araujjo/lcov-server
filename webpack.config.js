const webpack = require('webpack');
const path = require('path');

const MinifyPlugin = require('babel-minify-webpack-plugin');

var config = {
    mode: 'development',
    entry: {
      app: ['./src/app.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    devtool: 'cheap-source-map',
    devServer: {
        proxy: {
            "/api/**": "http://localhost:8080",
            // "/*.svg": "http://localhost:8080",
            "/badge/**": "http://localhost:8080"
        },
        contentBase: 'dist',
        inline: true,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [{
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /.jsx?$/,
              use: ['babel-loader'],
              exclude: /node_modules/
            }
        ]
    },
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }
      }),
      new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/), // eslint-disable-line
      new webpack.optimize.AggressiveMergingPlugin()
    ]
};

if(process.env.NODE_ENV === 'production') {
  config.plugins.push(new MinifyPlugin());
}

module.exports = config;
