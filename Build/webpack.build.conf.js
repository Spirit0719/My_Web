'use strict';
const baseWebpackConfig = require('./webpack.base.conf');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    // devtool: 'nosources-source-map',
    devtool: 'none',
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name][id].[chunkhash].js',
        publicPath: './',
        library: 'NuclearFusionExample',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
            // include all types of chunks
            chunks: 'all',
            maxInitialRequests:1
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        new CompressionPlugin({
            //test: new RegExp('\\.(js|css)$'),
            test: /\.js(\?.*)?$/i
        })
    ],
});
