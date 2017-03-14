var webpack = require('webpack');
var path = require('path');
var PROD = process.env.NODE_ENV === 'production';

var plugins = [];
if (PROD) {
    plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'react']
            }
        }]
    },
    devtool: !PROD ? 'cheap-eval-source-map' : '',
    plugins: plugins,
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    }
};
