'use strict';

module.exports = {
    webpackserver: {
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
    },
    dev: {
        BUILD_FLAG__ApiHostUrl: 'http://123.56.11.94:60430/mock/5e7864dcbdc67d002098676e/',
    },
    qa: {
        BUILD_FLAG__ApiHostUrl: 'http://192.168.11.7:7018/',
    },
    rc: {
        BUILD_FLAG__ApiHostUrl: 'http://192.168.11.7:7018/',
    },
};





