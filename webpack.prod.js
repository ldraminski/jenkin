const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const os = require("os");
const hostname = os.hostname();
let portalPath = '';

if(hostname.split('-')[0] === 'AGST') {
    portalPath = 'C:/Projekty Agora Code/portal';
} else if (hostname.includes('MacBook')) {
    portalPath = '/Users/kitsunemacdesktop/Work/isr/portal';
}

const servicePath = '/static/content/front/content-special/ren-test/master/dist/production';
const version = '1.0.11';

module.exports = {
    entry: {
        'main-dev': './src/index.js',
        'main-min': './src/index.js'
    },
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, "dist")
    },
    output: {
        path: path.resolve(__dirname, './dist/production/' + version),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            "portal": portalPath
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
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

        new ExtractTextPlugin({
            filename: 'main-min.css'
        }),

        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\min.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),

        new CompressionPlugin({
            test: /\.js$/,
            filename: 'main-min.jsgz'
        }),

        new CompressionPlugin({
            test: /\min.css$/,
            filename: 'style-min.cssgz'
        }),

        new UglifyJsPlugin({
            test: /\min.js$/,
        }),

        new HtmlWebpackPlugin({  
            filename: path.resolve(__dirname, 'dist/version/version-css.htm'),
            template: path.resolve(__dirname, 'src/version-css-template.htm'),
            servicePath,
            version: version,
            inject: false
        }),

        new HtmlWebpackPlugin({  
          filename: path.resolve(__dirname, 'dist/version/version-js.htm'),
          template: path.resolve(__dirname, 'src/version-js-template.htm'),
          servicePath,
          version: version,
          inject: false
        })
    ]
};