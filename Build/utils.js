'use strict';
const path = require('path');
const config = require('./config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



const sourceMapOption = process.env.NODE_ENV !== 'production';

const cssLoaders = function (options) {
    options = options || {};

    const cssModuleOptions = {
        //：String 默认：local  设置mode选项。您可以在需要local模式时省略该值
        //使用`local`值与使用`modules：true`具有相同的效果
        mode: 'local',
        //localIdentName: '[path][name]__[local]--[hash:base64:5]',
        localIdentName: '[name]-[local]-[hash:base64:5]'
        //允许重新定义本地标识名称的基本加载程序上下文。默认情况下我们使用rootContextloader  类型：String 默认：undefined
        //context: path.resolve(__dirname, 'Source'),
        //允许添加自定义哈希以生成更多唯一类。  类型：String 默认：undefined
        //hashPrefix: 'my-custom-hash',
    };
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: sourceMapOption,
            modules: options.modules ? cssModuleOptions : false,
            importLoaders: options.test == 'css' ? 1 : 2
        }
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            sourceMap: sourceMapOption,
            plugins: [
                require('autoprefixer')()
                // require('postcss-adaptive')({
                //     baseDpr: 2, // base device pixel ratio (default: 2)
                //     remUnit: 108, // rem unit value (default: 75)
                //     remPrecision: 6, // rem value precision (default: 6)
                //     hairlineClass: 'hairlines', // class name of 1px border (default: 'hairlines')
                //     autoRem: true // whether to transform to rem unit (default: false)
                // }),
            ]
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = [];
        if (process.env.NODE_ENV === 'production') {
            loaders.push(MiniCssExtractPlugin.loader);
        } else {
            loaders.push('vue-style-loader');
        }
        loaders.push(cssLoader);
        loaders.push(postcssLoader);

        if (loader && loader !== 'css') {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: sourceMapOption
                })
            });
        }

        return loaders;
    }

    return generateLoaders(options.test);
};

exports.styleLoaders = function () {
    const output = [
        {
            //test: new RegExp('\\.' + item + '$'),
            test: /\.css$/,
            oneOf: [
                // 这里匹配 `<style module>`
                {
                    resourceQuery: /module/,
                    use: cssLoaders({test: 'css', modules: true})
                },
                // 这里匹配普通的 `<style>` 或 `<style scoped>`
                {
                    use: cssLoaders({test: 'css', modules: false})
                }
            ]
        },
        {
            //test: new RegExp('\\.' + item + '$'),
            test: /\.(styl?us)(\?.*)?$/,
            oneOf: [
                // 这里匹配 `<style module>`
                {
                    resourceQuery: /module/,
                    use: cssLoaders({test: 'stylus', modules: true})
                },
                // 这里匹配普通的 `<style>` 或 `<style scoped>`
                {
                    use: cssLoaders({test: 'stylus', modules: false})
                }
            ]
        },
        {
            //test: new RegExp('\\.' + item + '$'),
            test: /\.sass$/,
            oneOf: [
                // 这里匹配 `<style module>`
                {
                    resourceQuery: /module/,
                    use: cssLoaders({test: 'sass', modules: true})
                },
                // 这里匹配普通的 `<style>` 或 `<style scoped>`
                {
                    use: cssLoaders({test: 'sass', modules: false})
                }
            ]
        },
        {
            //test: new RegExp('\\.' + item + '$'),
            test: /\.less$/,
            oneOf: [
                // 这里匹配 `<style module>`
                {
                    resourceQuery: /module/,
                    use: cssLoaders({test: 'less', modules: true})
                },
                // 这里匹配普通的 `<style>` 或 `<style scoped>`
                {
                    use: cssLoaders({test: 'less', modules: false})
                }
            ]
        }
    ];

    //console.log(JSON.stringify(output))
    return output;
};

exports.getDefinePlugin = function (env, argv) {

    return {
        // BUILD_FLAG__LMV_WORKER_FILE: JSON.stringify('MainWorker.js'),
        // BUILD_FLAG__INLINE_WORKER: false,
        // BUILD_FLAG__BUILD_TYPE: JSON.stringify('web'),
        // BUILD_FLAG__BUILD_VERSION: JSON.stringify('v7.6.1'),
        // BUILD_FLAG__WANT_HFDM: false,
        // BUILD_FLAG__WANT_SVF: true,
        // BUILD_FLAG__WASM_SUPPORT: false,
        // BUILD_FLAG__WANT_GUI: true,
        // BUILD_FLAG__IS_WORKER: false,
        // BUILD_FLAG__USE_IDBUFFER_SELECTION: false,
        // BUILD_FLAG__MINIFIED_BUILD: false,
        // BUILD_FLAG__DIFF_TOOL: false,
        // BUILD_FLAG__FLUENT_PROFILE: false,
        // BUILD_FLAG__WANT_FUSION_WORKER: false,
        ...config[env.NODE_ENV]
    }
}