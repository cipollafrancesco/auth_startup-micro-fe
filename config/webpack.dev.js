const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

// Automatic Dependencies Sharing Management
const packageJson = require('../package.json')

// Merge consete di mergiare due configs di webpack
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')

const SERVER_PORT = 8082

const devConfig = {
    mode: 'development',
    output: {
        publicPath: `http://localhost:${SERVER_PORT}/`
    },
    devServer: {
        port: SERVER_PORT,
        historyApiFallback: true // with object doesn't work
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './AuthApp': './src/bootstrap'
            },
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies,
        })
    ]
}

module.exports = merge(commonConfig, devConfig)
