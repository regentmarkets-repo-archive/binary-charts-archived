var path = require('path');

module.exports = {
    entry: './src/index.js',

    output: {
        library: 'binary-charts',
        libraryTarget: 'commonjs2',
        filename: 'binary-charts.js',
        path: './lib'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ],
    },
    devtool: 'inline-source-map',
    externals: {
        react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
        },
        "react-dom": {
            root: 'ReactDOM',
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
        }
    },
};
