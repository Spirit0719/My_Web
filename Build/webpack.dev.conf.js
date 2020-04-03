'use strict';
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./config');
const merge = require('webpack-merge');
const portfinder = require('portfinder');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');


const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    entry: {
        NuclearFusionExample: './Source/Main.js',
    },
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name][id].[chunkhash].js',
        globalObject: 'this',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename:  path.resolve(__dirname, '../dist/index.html'),
            template: 'Source/Index.html',
            // 解决循环依赖问题: Cyclic dependency
            chunksSortMode: 'none',
            chunks: ['NuclearFusionExample']
        }),
    ],
    //devtool: "cheap-module-eval-source-map",
    devServer: {
        hot: true,
        host: process.env.HOST || config.webpackserver.host,
        port: (process.env.PORT && Number(process.env.PORT)) || config.webpackserver.port,
        open: config.webpackserver.autoOpenBrowser,
        //overlay: { warnings: false, errors: true },
        contentBase: [
            path.join(__dirname, '../Source/NuclearFusionEx'),
            path.join(__dirname, '../'),
        ]
    },
});

module.exports = (env, argv) => {
    //https://github.com/wayou/wayou.github.io/issues/14
    // console.log(env, argv)
    const definePlugin  = utils.getDefinePlugin(env,argv);
    const tempWebpackConfig = merge(devWebpackConfig, {
        plugins:[
            new webpack.DefinePlugin(definePlugin)
        ]
    });
    return new Promise((resolve, reject) => {
        portfinder.basePort = process.env.PORT || config.webpackserver.port;
        portfinder.getPort((err, port) => {
            if (err) {
                reject(err)
            } else {
                // publish the new Port, necessary for e2e tests
                process.env.PORT = port;
                // add port to devServer config
                tempWebpackConfig.devServer.port = port;
                resolve(tempWebpackConfig)
            }
        })
    });
};


// console.log(baseWebpackConfig);
// console.log(JSON.stringify(process.env),config);