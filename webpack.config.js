var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["@babel/polyfill", './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: "./docs"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};