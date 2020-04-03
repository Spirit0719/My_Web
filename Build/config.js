'use strict';

module.exports = {
    webpackserver: {
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
    },
    dev: {
        BUILD_FLAG__ApiHostUrl: JSON.stringify('http://123.56.11.94:60430/mock/5e7864dcbdc67d002098676e/'),
        BUILD_FLAG__NODE_ENV:JSON.stringify('dev')
    },
    devApp:{
        BUILD_FLAG__ApiHostUrl: JSON.stringify('http://123.56.11.94:60430/mock/5e7864dcbdc67d002098676e/'),
        BUILD_FLAG__NODE_ENV:JSON.stringify('appDev')
    },
    // PC build
    pc: {
        BUILD_FLAG__ApiHostUrl: JSON.stringify('http://123.56.11.94:60430/mock/5e7864dcbdc67d002098676e/'),
        BUILD_FLAG__NODE_ENV:JSON.stringify('pc')
    },
    // app/Android/Ios build
    app: {
        BUILD_FLAG__ApiHostUrl: JSON.stringify('http://123.56.11.94:60430/mock/5e7864dcbdc67d002098676e/'),
        BUILD_FLAG__NODE_ENV:JSON.stringify('app')
    },
};





