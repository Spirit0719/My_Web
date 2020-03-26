'use strict';
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./config');
const utils = require('./utils');

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        //MainWorker: './Source/fine/Source/file-loaders/workers/MainWorker-web.js',
    },
    resolve: {
        extensions: ['.js','.ts','.tsx', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            // '@': path.resolve(__dirname, '../Source/'),
            // 'three$': path.resolve(__dirname, '../Source/fine/thirdparty/three.js/three.js'),
        },
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.tsx?$/,
                use: [
                    // {
                    //     loader: 'babel-loader',
                    //     options: {
                    //         cacheDirectory: true,
                    //         presets: [
                    //             "@babel/preset-env"
                    //         ]
                    //     }
                    // },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile:path.resolve(__dirname, '../tsconfig.json')
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                exclude: file => (
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                ),
                enforce: "pre"
            },
            {
                test: /\.js不使用$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                ),
                //如果有这个设置则不用在添加.babelrc
                options: {
                    cacheDirectory: true,
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                //解决Cannot assign to read only property 'exports' of object
                                //https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
                                //但是会有新的问题出现,暂时发现无法使用  import worker = require(''workerize-loader?inline!./jsSha.worker.js'
                                //modules:'commonjs'
                            }
                        ]
                    ],
                    plugins: [
                        //动态导入
                        '@babel/plugin-syntax-dynamic-import',
                        //合并重复代码
                        "@babel/plugin-transform-runtime"
                    ],
                    //除掉脚本中的注释
                    comments: false,

                    //解决Cannot assign to read only property 'exports' of object
                    //https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
                    //会导致新的问题出现  https://babeljs.io/docs/en/options#sourcetype
                    //扩展阅读 https://babeljs.io/docs/en/babel-parser#options   插件
                    sourceType: 'unambiguous',
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: {
                        //是否将 worker 内联为一个 BLOB
                        inline: true,
                        publicPath: './'
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            },
            {
                test: /\.glsl$/,
                loader: 'webpack-glsl-loader'
            },
            ...utils.styleLoaders()
        ]
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
    ],
    node: {
        fs: "empty"
    },
};
