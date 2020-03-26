'use strict';
const merge = require('webpack-merge');
const buildWebpackConfig  = require('./webpack.build.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackConfig = merge(buildWebpackConfig, {
    entry: {
        NuclearFusionExample: './Source/Main.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: 'Source/Index.html',
            // 解决循环依赖问题: Cyclic dependency
            chunksSortMode: 'none',
            chunks: ['NuclearFusionExample']
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: path.resolve(__dirname, '../dist/static'),
                ignore: ['.*']
            },
            {
                from: path.resolve(__dirname, '../Source/NuclearFusionEx/NuclearFusion'),
                to: path.resolve(__dirname, '../dist/NuclearFusion'),
                ignore: ['.*']
            }

        ]),
    ],
});

module.exports = (env, argv) => {
    //https://github.com/wayou/wayou.github.io/issues/14
    //console.log(env,argv)
    const definePlugin  = utils.getDefinePlugin(env,argv);
    const tempWebpackConfig = merge(webpackConfig, {
        plugins:[
            new webpack.DefinePlugin(definePlugin)
        ]
    });
    return tempWebpackConfig;
};
