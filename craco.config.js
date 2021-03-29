const path = require('path');
const CracoLessPlugin = require('craco-less');
const WebpackBar = require('webpackbar');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');      // 优化代码打包速度

const resolve = dir => path.resolve(__dirname, dir);
// const globalLess = require('./src/assets/css/global.js')

module.exports = {
    webpack: {
        alias: {
            '@': resolve('src')
        },
        modules:{
            rules:[
                {
                    test:/\.jsx?$/,
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new WebpackBar(),
            // new HardSourceWebpackPlugin({
            //     cachePrune: {
            //         // Caches younger than `maxAge` are not considered for deletion. They must
            //         // be at least this (default: 2 days) old in milliseconds.
            //         maxAge: 1000,
            //         maxAge: 2 * 24 * 60 * 60 * 1000,
            //         // All caches together must be larger than `sizeThreshold` before any
            //         // caches will be deleted. Together they must be at least this
            //         // (default: 50 MB) big in bytes.
            //         sizeThreshold: 50 * 1024 * 1024
            //     },
            // }),
            // new BundleAnalyzerPlugin({ analyzerPort: 8889 })
        ]
    },
    plugins: [{
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    // 修改主题色 
                    // modifyVars: globalLess,
                    javascriptEnabled: true,
                },
            },
        },
    },],
    babel: {
        plugins: [
            // ["@babel/plugin-proposal-decorators", { legacy: true }]
        ]
    }
}