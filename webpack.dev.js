const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const os = require("os");
const hostname = os.hostname();
let portalPath = '';

if(hostname.split('-')[0] === 'AGST') {
    portalPath = 'C:/Projekty Agora Code/portal';
} else if (hostname.includes('MacBook')) {
    portalPath = '/Users/kitsunemacdesktop/Work/isr/portal';
}

console.log('HOSTANEM: ', hostname);
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
console.log('process.argv: ', process.argv);

module.exports = {
    devtool: 'source-map',
    entry: {
        'main-dev': './src/index.js',
    },
    devServer: {
        compress: true,
        port: 9000
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            "portal": portalPath
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                },
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'main-dev.css'
        }),

        new WebpackNotifierPlugin({
            alwaysNotify: true,
            skipFirstNotification: true
        }),
    ]
};